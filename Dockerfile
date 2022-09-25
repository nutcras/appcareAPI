FROM node:16-alpine
WORKDIR /app
ADD . /app
ENV NODE_ENV production
RUN npm ci 
CMD [ "npm", "start" ]
