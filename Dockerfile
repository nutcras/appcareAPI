FROM node:16-bullseye-slim AS build
WORKDIR /app
ADD . /app
ENV NODE_ENV production
RUN npm ci

FROM  gcr.io/distroless/nodejs:16
COPY --from=build /app /app
WORKDIR /app
CMD ["index.js"]
