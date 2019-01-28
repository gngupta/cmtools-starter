# comtools starter store
This is commerce tools starter store built on vue using commerce tools API.

## Project setup

### Make sure npm installed in your development machine
```
npm version
```

You can install npm for your operating system from here.

[Install node/npm](https://nodejs.org/en/download/)

### Make sure docker is installed in your development machine
```
docker version
```

You can install docker for your operating system using below guidelines

[windows](https://docs.docker.com/toolbox/toolbox_install_windows/)

[mac](https://docs.docker.com/docker-for-mac/)

[ununtu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

[centos](https://docs.docker.com/install/linux/docker-ce/centos/)

### Checkout or clone this project
```
git clone https://gitlab2.salnl.net/commercetools/starter.git
```

### Go to starter directory of checked out project and run
```
npm install
```
### Update commercetools project keys, shared secret and end points 
Update the correct credentials in the .env.local file to allow vue app make rest calls to commercetools

### Access store 
Run below command to compile the code and do hot-reloads for development
```
npm run serve
```
### Run your unit tests
```
npm run test:unit
```
### Run your end-to-end tests
```
npm run test:e2e
```

### Test your code inside Docker container using npm toolkit
```
npm run docker
```
If you are a windows user, you must run this command in "Docker Quickstart Terminal".

### Development IDE
We recommend development on Linux/Mac operating system with "Visual Studio Code". Make sure you have essential plugins installed for vue and javascript development.
