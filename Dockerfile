FROM node:16-alpine
WORKDIR /app
ADD . /app
RUN corepack enable
RUN yarn install --prod
CMD [ "yarn", "start" ]
