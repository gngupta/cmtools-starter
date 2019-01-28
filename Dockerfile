# build stage
FROM node:8.14.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
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

# deploy stage
FROM nginx:stable-alpine as deploy-stage
COPY ./artifacts/nginx/conf.d/default.conf /etc/nginx/conf.d
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

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