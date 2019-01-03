#!/bin/sh

echo "===== REMOVING STOPPED CONTAINERS =====" 
if docker ps -a | grep ago
    then
        docker rm $(docker ps -a -q)
    else
        echo "No stopped conainers to remove."
fi
echo "===== STOPPED CONTAINERS REMOVED ====="
echo
echo "===== REMOVING DANGLING IMAGES ====="
if docker images -f "dangling=true" | grep ago
    then
        docker rmi -f $(docker images -f "dangling=true" -q) --no-prune
    else
        echo "No dangling images to remove."
fi
echo "===== DANGLING IMAGES REMOVED ====="