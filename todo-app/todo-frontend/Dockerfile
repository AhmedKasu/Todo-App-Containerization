FROM node:16 AS base

WORKDIR /usr/src/app
COPY package*.json .

FROM base AS test-stage
RUN npm install --package-lock-only
RUN npm ci
COPY . .
RUN CI=true npm test

FROM test-stage AS build-stage
RUN npm install --package-lock-only
RUN npm ci --omit=dev
COPY --from=test-stage /usr/src/app .
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.25-alpine3.18 AS production-stage

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html