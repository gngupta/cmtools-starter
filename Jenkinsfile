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

		def acct = pipelineUtil.getContainerRepoAcct(config)
		def imageTag = pipelineUtil.getImageTag()

		stage('Install') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile: "./Dockerfile.install",
					host      : config.container_repo.host,
					acct      : acct,
					repo      : config.container_repo.repo + "-install",
					authId    : config.container_repo.jenkins_creds_id,
					imageTag  : imageTag,
					buildArgs : pipelineUtil.getBuildArgs()
				)
			}
		}

		stage('Test') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile: "./Dockerfile.test",
					host      : config.container_repo.host,
					acct      : acct,
					repo      : config.container_repo.repo + "-test",
					authId    : config.container_repo.jenkins_creds_id,
					imageTag  : imageTag,
					buildArgs : pipelineUtil.getBuildArgs()
				)
			}
		}

		stage('Build') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile: "./Dockerfile.build",
					host      : config.container_repo.host,
					acct      : acct,
					repo      : config.container_repo.repo + "-build",
					authId    : config.container_repo.jenkins_creds_id,
					imageTag  : imageTag,
					buildArgs : pipelineUtil.getBuildArgs() + " --build-arg CMTOOLS_INSTALL_IMAGE=" + acct + "/" + config.container_repo.repo + "-install:" + imageTag
				)
			}
		}

		stage('Ship') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile: "./Dockerfile.ship",
					host      : config.container_repo.host,
					acct      : acct,
					repo      : config.container_repo.repo,
					authId    : config.container_repo.jenkins_creds_id,
					imageTag  : imageTag,
					buildArgs : pipelineUtil.getBuildArgs() + " --build-arg CMTOOLS_BUILD_IMAGE=" + acct + "/" + config.container_repo.repo + "-build:" + imageTag
				)
			}
		}
	}
}