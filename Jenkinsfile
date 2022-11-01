pipeline {

  environment {
    registry = "hades1122/reactjs"
    registryCredential = 'dockerhublogin'
    dockerImage = ""
  }

  agent any

  stages {
    
    stage('Checkout Source') {
      steps {
        git 'https://github.com/Hades11223/project-react-js-wallet-ivirse.git'
      }
    }

    stage('Build'){
      steps{
        sh 'cd /var/lib/jenkins/workspace/project-react-js-wallet-ivirse'
        sh 'npm install'
        sh 'yarn install --ignore-engines'
        sh 'yarn build'
        sh 'sudo scp -r build/* /mnt/NFS_Share/project-react-js-wallet-ivirse/app'
      }
    }
    
    stage('Deploy K8s App') {
      steps {
        script {
          kubernetesDeploy(configs: "wallet-ivirse.yaml", kubeconfigId: "mykubeconfig")
        }
      }
    }
  
}
}
