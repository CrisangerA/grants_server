FROM node:12

LABEL version=1.0
LABEL descripcion="this is an nodejs image"

WORKDIR /app

ENV DB_HOST 34.66.163.105
ENV DB_DATABASE barbershop_pruebas
ENV DB_USER postgres
ENV DB_PASSWORD 59OxDJ14wpcp9kP7
ENV DB_PORT 5432
# ENV USER_DB development
# ENV PASSWORD_DB Al3jandro1*

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm","start" ]