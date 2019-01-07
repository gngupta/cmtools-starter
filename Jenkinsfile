#!/usr/bin/groovy

// load pipeline functions
// Requires pipeline-github-lib plugin to load library from github


podTemplate(label: 'jenkins-pipeline', containers: [
		containerTemplate(name: 'docker', image: 'docker:18.06', command: 'cat', ttyEnabled: true)
	],
	volumes: [
		hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
	]) {

	node('jenkins-pipeline') {

		def pwd = pwd()
			checkout scm

			stage('test deployment') {
			container('docker') {
				sh "pwd"
				sh "docker version"
			}
		}

	}
}
