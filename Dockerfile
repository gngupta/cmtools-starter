# build stage
FROM node:8.14.0-alpine as build-stage
ARG VCS_REF
ARG BUILD_DATE

# Metadata
LABEL vcs-ref=$VCS_REF \
      vcs-url="https://gitlab2.salnl.net/commercetools/starter" \
      build-date=$BUILD_DATE \
      maintainer="salmon.com"

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN echo "Build Stage Successful..."

# deploy stage
FROM nginx:stable-alpine as deploy-stage
ARG VCS_REF
ARG BUILD_DATE

# Metadata
LABEL vcs-ref=$VCS_REF \
      vcs-url="https://gitlab2.salnl.net/commercetools/starter" \
      build-date=$BUILD_DATE \
      maintainer="salmon.com"

COPY ./artifacts/nginx/conf.d/default.conf /etc/nginx/conf.d
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN echo "Deploy Stage Successful..."
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]