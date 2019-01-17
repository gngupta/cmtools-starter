def pipelineUtilTest() {
    println "Loaded PipelineUtil.groovy in current pipeline"
}

def kubectlTest() {
    // Test that kubectl can correctly communication with the Kubernetes API
    println "checking kubectl connnectivity to the API"
    sh "kubectl get pods --all-namespaces"
}

def helmLint(String chart_dir) {
    // lint helm chart
    println "running helm lint ${chart_dir}"
    sh "helm lint ${chart_dir}"

}

def helmConfig() {
    //setup helm connectivity to Kubernetes API and Tiller
    println "initiliazing helm client"
    sh "helm init"
    println "checking client/server version"
    sh "helm version"
}


def helmDeploy(Map args) {
    //configure helm client and confirm tiller process is installed
    helmConfig()
    def String release_overrides = ""
    if (args.set) {
        release_overrides = getHelmReleaseOverrides(args.set)
    }

    def String namespace

    // If namespace isn't parsed into the function set the namespace to the name
    if (args.namespace == null) {
        namespace = args.name
    } else {
        namespace = args.namespace
    }

    if (args.dry_run) {
        println "Running dry-run deployment"

        sh "helm upgrade --dry-run --install ${args.name} ${args.chart_dir} " + (release_overrides ? "--set ${release_overrides}" : "") + " --namespace=${namespace}"
    } else {
        println "Running deployment"

        sh "helm dependency update ${args.chart_dir}"
        sh "helm upgrade --install ${args.name} ${args.chart_dir} " + (release_overrides ? "--set ${release_overrides}" : "") + " --namespace=${namespace}" + " --wait"

        echo "Application ${args.name} successfully deployed. Use helm status ${args.name} to check"
    }
}

def helmDelete(Map args) {
    println "Running helm delete ${args.name}"
    sh "helm delete ${args.name}"
}

def helmTest(Map args) {
    println "Running Helm test"
    sh "helm test ${args.name} --cleanup"
}

def setGitEnvVars() {
    // create git envvars
    println "Setting envvars to tag container"
    sh 'git rev-parse HEAD > git_commit_id.txt'
    try {
        env.GIT_COMMIT_ID = readFile('git_commit_id.txt').trim()
        env.GIT_SHA = env.GIT_COMMIT_ID.substring(0, 7)
    } catch (e) {
        error "${e}"
    }
    println "env.GIT_COMMIT_ID ==> ${env.GIT_COMMIT_ID}"

    sh 'git config --get remote.origin.url> git_remote_origin_url.txt'
    try {
        env.GIT_REMOTE_URL = readFile('git_remote_origin_url.txt').trim()
    } catch (e) {
        error "${e}"
    }
    sh "rm git_commit_id.txt,git_remote_origin_url.txt"
    println "env.GIT_REMOTE_URL ==> ${env.GIT_REMOTE_URL}"
}

def getContainerRepoAcct(config) {
    println "setting container registry creds according to Jenkinsfile.json"
    def String acct
    if (env.BRANCH_NAME == 'master') {
        acct = config.container_repo.master_acct
    } else {
        acct = config.container_repo.alt_acct
    }
    return acct
}

def getImageTag() {
    return env.BRANCH_NAME + "_" + env.BUILD_NUMBER
}

def getBuildArgs() {
    def buildArgs = " --build-arg VCS_REF=${env.GIT_SHA}"
    buildArgs += " --build-arg VCS_URL=${env.GIT_REMOTE_URL}"
    buildArgs += " --build-arg VCS_BRANCH=${env.BRANCH_NAME}"
    buildArgs += " --build-arg BUILD_NUMBER=${env.BUILD_NUMBER}"
    buildArgs += " --build-arg BUILD_DATE=`date -u +'%Y-%m-%dT%H:%M:%S%Z'`"
    println "buildArgs :: " + buildArgs
    return buildArgs
}

def buildImage(Map args) {
    docker.withRegistry("https://${args.host}", "${args.authId}") {
        sh "docker build ${args.dockerfile} -t ${args.acct}/${args.repo}:${args.imageTag} ${args.buildArgs}"
    }
}

@NonCPS
def getHelmReleaseOverrides(Map map = [ : ]) {
    // jenkins and workflow restriction force this function instead of map.each(): https://issues.jenkins-ci.org/browse/JENKINS-27421
    def options = ""
    map.each { key, value ->
        options += "$key=$value,"
    }
    return options
}

def String getDomainName(String url) throws URISyntaxException {
    URI uri = new URI(url);
    String domain = uri.getHost();
    return domain.startsWith("www.") ? domain.substring(4) : domain;
}

def String getSubDomainName(String domain) {
    return domain.substring(domain.indexOf('.') + 1);
}

// Used to get the subdomain Jenkins is hosted on for new ingress resources.
def String getSubDomainNameFromURL(String url) {
    return getSubDomainName(getDomainName(url));
}

return this