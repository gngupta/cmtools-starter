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

		// Set additional git envvars for image tag and label
		pipelineUtil.setGitEnvVars()
	
		def imageName = config.registry.user + "/" + config.registry.repo
		def imageTag = pipelineUtil.getImageTag()
		def commonBuildArgs = pipelineUtil.getCommonBuildArgs()

		stage('Install') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile : "./Dockerfile.install",
					imageName  : imageName + "-install",
					imageTag   : imageTag,
					buildArgs  : commonBuildArgs
				)
			}
		}

		stage('Build') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile : "./Dockerfile.build",
					imageName  : imageName + "-build",
					imageTag   : imageTag,
					buildArgs  : commonBuildArgs + " --build-arg CMTOOLS_INSTALL_IMAGE=" + imageName + "-install:" + imageTag
				)
			}
		}

		stage('Package') {
			container('docker') {
				pipelineUtil.buildImage(
					dockerfile : "./Dockerfile.package",
					imageName  : imageName + "-app",
					imageTag   : imageTag,
					buildArgs  : commonBuildArgs + " --build-arg CMTOOLS_BUILD_IMAGE=" + imageName + "-build:" + imageTag
				)
			}
		}

		stage('Push') {
			container('docker') {
				pipelineUtil.pushImage(
					host          : config.registry.host,
					credentialsId : config.registry.credentialsId,
					imageName     : imageName + "-app",
					imageTag      : imageTag
				)
			}
		}

		stage('Deploy') {
			container('helm') {
				pipeline.helmDeploy(
					dryRun        : false,
					name          : env.BRANCH_NAME.toLowerCase(),
					namespace     : env.BRANCH_NAME.toLowerCase(),
					chartDir      : chartDir,
					set           : [
						"imageTag": imageTag,
						"replicas": config.app.replicas
					]
				)
			}
		}

	}
}