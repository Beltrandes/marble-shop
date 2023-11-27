FROM node:20.9.0

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @angular/cli@16.2.10 && npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "1"]
