FROM node:8.14.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Metadata
ARG VCS_REF
ARG VCS_URL
ARG VCS_BRANCH
ARG BUILD_DATE
ARG BUILD_NUMBER
LABEL wunderman.commerce.vcs.ref=$VCS_REF \
      wunderman.commerce.vcs.url=$VCS_URL \
      wunderman.commerce.vcs.branch=$VCS_BRANCH \
      wunderman.commerce.build.date=$BUILD_DATE \
      wunderman.commerce.build.number=$BUILD_NUMBER \
      wunderman.commerce.maintainer="wunderman.commerce.com"