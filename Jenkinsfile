#!/usr/bin/groovy

// load pipeline functions
// Requires pipeline-github-lib plugin to load library from github


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
			}

			stage('Build vue node') {
				container('docker') {
					sh "docker build . -t gorakh/cmtools-app:latest"
				}
			}

	}
}
