FROM node:16-alpine AS build
WORKDIR /app
ADD . /app
ENV NODE_ENV production
RUN npm ci 

FROM  gcr.io/distroless/nodejs:16
COPY --from=build /app /app
WORKDIR /app
CMD ["npm" , "start"]