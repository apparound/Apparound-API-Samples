# Usare l'immagine di base di Nginx
FROM node:20

ENV workdir "/usr/src/app"
WORKDIR $workdir 

# Copiare i servizi Node.js nelle cartelle apposite
COPY ./package.json ${workdir}/package.json 
COPY ./package-lock.json ${workdir}/package-lock.json

RUN npm ci
COPY . ${workdir}
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run start:prod"]
