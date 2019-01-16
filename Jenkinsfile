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
			pipelineUtil.gitEnvVars()

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

			stage('Build') {
				container('docker') {
					sh "docker build . -t gorakh/cmtools-app:${env.BRANCH_NAME}_${env.BUILD_NUMBER}"
				}
			}

			stage('Test'){
				println "TODO - extend pipline code to run test scripts"
			}

			stage('Push') {
				container('docker') {
					withDockerRegistry([ credentialsId: "docker_hub_creds", url: "" ]) {
          				sh "docker push gorakh/cmtools-app:${env.BRANCH_NAME}_${env.BUILD_NUMBER}"
       				}
				}	
			}

			stage('Deploy') {
				container('helm') {
					sh "helm --name=cmtools-app --namespace=cmtools-system install ${chartDir}"
				}
			}
	}
}
