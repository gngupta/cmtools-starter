# build stage
FROM node:8.14.0-alpine AS buildstage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN echo "Build Stage Successful..."

# deploy stage
FROM nginx:stable-alpine AS deploystage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN echo "Deploy Stage Successful..."
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]