#!/usr/bin/groovy

// load pipeline functions
// Requires pipeline-github-lib plugin to load library from github


	podTemplate(label: 'jenkins-pipeline', containers: [
			containerTemplate(name: 'jnlp', image: 'jenkins/jnlp-slave:3.27-1-alpine', args: '${computer.jnlpmac} ${computer.name}', workingDir: '/home/jenkins'),
		],
		volumes: [
			hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
		]) {

	node('jenkins-pipeline') {

		def pwd = pwd()
			checkout scm
    
	stage('test deployment') {
    container('jnlp') {
        sh "pwd" 
      }
  }



  }
}