ARG CMTOOLS_INSTALL_IMAGE
FROM $CMTOOLS_INSTALL_IMAGE
ARG CMTOOLS_APP_URL
RUN echo $CMTOOLS_APP_URL
WORKDIR /app
RUN node ./node_modules/.bin/vue-cli-service test:e2e --url=$CMTOOLS_APP_URL

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