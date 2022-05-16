FROM node:16-alpine
WORKDIR /app
ADD . /app
ENV TZ Asia/Bangkok
RUN npm install --production
CMD [ "npm", "start"]