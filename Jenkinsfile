#!/usr/bin/groovy

// load pipeline functions
// Requires pipeline-github-lib plugin to load library from github

@Library('github.com/gngupta/jenkins-pipeline')

podTemplate(label: 'jenkins-pipeline', containers: [
		containerTemplate(name: 'jnlp', image: 'jenkins/jnlp-slave:3.27-1-alpine', args: '${computer.jnlpmac} ${computer.name}', workingDir: '/home/jenkins'),
		containerTemplate(name: 'docker', image: 'docker:18.06.1-ce', command: 'cat', ttyEnabled: true)
	],
	volumes: [
		hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
	]) {

	node('jenkins-pipeline') {

			stage('Checkout code') {
				checkout scm
				def rootDir = pwd()
    			def piplineUtil = load "${rootDir}/artifacts/jenkins/PiplineUtil.Groovy"
				pipelineUtil.pipelineUtilTest();
			}

			stage('Build image') {
				container('docker') {
					sh "docker build . -t gorakh/cmtools-app:latest"
				}
			}

			stage('Deploy and run test scripts'){
				def pipeline = new com.jenkins.utils.Pipeline()
				println "TODO - extend pipline code to run test scripts"
			}

			stage('Publish image') {
				println "TODO - extend pipline code to publish image"	
			}

			stage('Deploy to cluster') {
				println "TODO - extend pipline code to deploy image to cluster"	
			}

	}
}
