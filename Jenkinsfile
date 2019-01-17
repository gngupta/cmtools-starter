#!/usr/bin/groovy

podTemplate(label: 'jenkins-pipeline', containers: [
		containerTemplate(name: 'jnlp', image: 'jenkins/jnlp-slave:3.27-1-alpine', args: '${computer.jnlpmac} ${computer.name}', workingDir: '/home/jenkins', resourceRequestCpu: '200m', resourceLimitCpu: '300m', resourceRequestMemory: '256Mi', resourceLimitMemory: '512Mi'),
		containerTemplate(name: 'docker', image: 'docker:18.06.1-ce', command: 'cat', ttyEnabled: true),
		containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.11.6', command: 'cat', ttyEnabled: true),
		containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:v2.12.1', command: 'cat', ttyEnabled: true)
	],
	volumes: [
		hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
	]) {

	node('jenkins-pipeline') {

		stage('Checkout') {
			checkout scm
		}

		// Load pipeline utils and set global variables.
		def rootDir = pwd()
		println "rootDir :: ${rootDir}"
		def pipelineUtil = load "${rootDir}/artifacts/cicd/PipelineUtil.groovy"

		def chartDir = "${rootDir}/artifacts/charts/cmtools-app"
		println "chartDir :: ${chartDir}"

		// Read required jenkins workflow configuration values
		def inputFile = readFile('Jenkinsfile.json')
		def config = new groovy.json.JsonSlurperClassic().parseText(inputFile)
		println "pipeline config ==> ${config}"

		// set additional git envvars for image tagging
		pipelineUtil.setGitEnvVars()

		// If pipeline debugging enabled
		if (config.pipeline.debug) {
			println "DEBUG ENABLED"
			sh "env | sort"
			println "Runing kubectl/helm tests"
			container('kubectl') {
				pipelineUtil.kubectlTest()
			}
			container('helm') {
				pipelineUtil.helmConfig()
			}
		}

		// set additional git envvars for image tagging
		pipelineUtil.setGitEnvVars()

		def acct = pipelineUtil.getContainerRepoAcct(config)
		def imageTag = pipelineUtil.getImageTag()

		stage('Test deployment') {
			container('helm') {
				// run helm chart linter
				pipelineUtil.helmLint(chartDir)
				// run dry-run helm chart installation
				pipelineUtil.helmDeploy(
					dry_run: true,
					name: config.app.name,
					namespace: config.app.name,
					chart_dir: chartDir,
					set: [
						"imageTag": imageTag,
						"replicas": config.app.replicas
					])
			}
		}

		stage('Install') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile: "-f ./Dockerfile.install",
					host      : config.container_repo.host,
					acct      : acct,
					repo      : config.container_repo.repo + "-install",
					authId    : config.container_repo.jenkins_creds_id,
					imageTag  : imageTag,
					buildArgs : pipelineUtil.getBuildArgs()
				)
			}
		}

		stage('Build') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile: config.container_repo.dockerfile,
					host      : config.container_repo.host,
					acct      : acct,
					repo      : config.container_repo.repo,
					authId    : config.container_repo.jenkins_creds_id,
					imageTag  : imageTag,
					buildArgs : pipelineUtil.getBuildArgs()
				)
			}
		}
	}
}