FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /V-4/
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent 
# && mv node_modules ../

COPY . .
EXPOSE 3000
USER node

CMD ["npm", "start"]
