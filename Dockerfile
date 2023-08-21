# Use the official Cypress Docker image as the base image
FROM cypress/browsers:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Install project dependencies
RUN npm install

# Install Cypress binary
RUN npx cypress install

# Run Cypress tests
CMD ["npx", "cypress", "run"]
