#!/bin/sh

echo "===== STOP RUNNING CONTAINER ====="
if docker ps | grep cmtools-app-dev-build
  then
    docker stop cmtools-app-dev-build
  else
    echo "cmtools-app container is not running."
fi
echo "===== RUNNING CONTAINER STOPPED ====="