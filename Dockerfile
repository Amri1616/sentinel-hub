# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output from the previous stage to Nginx's serve directory
# Vite defaults the output folder to 'dist'
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config if you have one (optional, see below)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]