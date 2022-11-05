FROM gcr.io/distroless/nodejs:16
WORKDIR /app
ADD . /app
ENV NODE_ENV production
RUN npm ci 
CMD [ "npm", "start" ]
