#!/usr/bin/groovy

podTemplate(label: 'jenkins-pipeline', containers: [
		containerTemplate(name: 'jnlp', image: 'jenkins/jnlp-slave:3.27-1-alpine', args: '${computer.jnlpmac} ${computer.name}', workingDir: '/home/jenkins'),
		containerTemplate(name: 'docker', image: 'docker:18.06.1-ce', command: 'cat', ttyEnabled: true),
		containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.11.6', command: 'cat', ttyEnabled: true),
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
			
			// Read required jenkins workflow configuration values
    		def inputFile = readFile('Jenkinsfile.json')
    		def config = new groovy.json.JsonSlurperClassic().parseText(inputFile)
    		println "pipeline config ==> ${config}"


			stage('Build') {
				container('docker') {
					sh "docker build . -t gorakh/cmtools-app:latest"
				}
			}

			stage('Test'){
				println "TODO - extend pipline code to run test scripts"
			}

			stage('Push') {
				container('docker') {
					println "TODO - extend pipline code to push docker image"
					withDockerRegistry([ credentialsId: "docker_hub_creds", url: "" ]) {
          				sh 'docker push gorakh/cmtools-app:latest'
       				}
				}	
			}

			stage('Deploy') {
				container('kubectl') {
					sh "kubectl apply -f ./wunderman-commerce-deploy.yml"
				}
			}
	}
}
