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
LABEL vcs-ref=$VCS_REF \
      vcs-url=$VCS_URL \
      vcs-branch=$VCS_BRANCH \
      build-date=$BUILD_DATE \
      build-number=$BUILD_NUMBER \
      maintainer="salmon.com"

# deploy stage
FROM nginx:stable-alpine as deploy-stage
COPY ./artifacts/nginx/conf.d/default.conf /etc/nginx/conf.d
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Metadata
ARG VCS_REF
ARG VCS_URL
ARG VCS_BRANCH
ARG BUILD_DATE
ARG BUILD_NUMBER
LABEL vcs-ref=$VCS_REF \
      vcs-url=$VCS_URL \
      vcs-branch=$VCS_BRANCH \
      build-date=$BUILD_DATE \
      build-number=$BUILD_NUMBER \
      maintainer="salmon.com"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]