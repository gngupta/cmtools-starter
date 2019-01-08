#!/usr/bin/groovy

podTemplate(label: 'jenkins-pipeline', containers: [
		containerTemplate(name: 'jnlp', image: 'jenkins/jnlp-slave:3.27-1-alpine', args: '${computer.jnlpmac} ${computer.name}', workingDir: '/home/jenkins'),
		containerTemplate(name: 'docker', image: 'docker:18.06.1-ce', command: 'cat', ttyEnabled: true),
		containerTemplate(name: 'helm', image: 'lachlanevenson/k8s-helm:v2.12.1', command: 'cat', ttyEnabled: true),
		containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:v1.11.6', command: 'cat', ttyEnabled: true)
	],
	volumes: [
		hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
	]) {

	node('jenkins-pipeline') {

			stage('Checkout code') {
				checkout scm
				def rootDir = pwd()
    			def pipelineUtil = load "${rootDir}/artifacts/jenkins/PipelineUtil.groovy"
				pipelineUtil.pipelineUtilTest();
			}

			stage('Build image') {
				container('docker') {
					sh "docker build . -t gorakh/cmtools-app:latest"
				}
			}

			stage('Deploy and run test scripts'){
				println "TODO - extend pipline code to run test scripts"
			}

			stage('Publish image') {
				println "TODO - extend pipline code to publish image"	
			}

			stage('Deploy to cluster') {
				container('kubectl') {
					println "TODO - extend pipline code to deploy image to cluster"
        			pipelineUtil.kubectlTest()

				}
				container('helm') {
					pipeline.helmConfig()
				}
			}

	}
}
