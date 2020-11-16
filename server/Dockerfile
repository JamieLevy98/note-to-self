FROM node:14
WORKDIR /app
COPY . /app
EXPOSE 5000
RUN ["npm", "install"]
ENTRYPOINT [ "npm", "run", "start:dev" ]
