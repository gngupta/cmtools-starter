#!/bin/sh

echo "===== BUILIDING DOCKER IMAGE =====" 
docker build . -t wunderman-commerce/cmtools-app:dev-build
echo "=====  IMAGE BUILD SUCCESSFUL ====="