FROM node:22.6.0
WORKDIR /home/admin/deployments/images/graphql-api

# Copy Files for build
COPY . .

# Install Dependencies
RUN npm ci
#Build Application
RUN npm run build

#Expose Port for Deployment
EXPOSE 3000
# Run start command
CMD [ "npm", "run", "start" ]