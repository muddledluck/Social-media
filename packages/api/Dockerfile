# ui-web Dockerfile for Development
FROM node:20.9.0

WORKDIR /api

# Copy package files and install dependencies
COPY ./package.json ./package.json
COPY ./packages/api/package.json ./packages/api/package.json
COPY ./packages/api-client/package.json ./packages/api-client/package.json
COPY ./packages/shared-constants/package.json ./packages/shared-constants/package.json
COPY ./packages/ui-core/package.json ./packages/ui-core/package.json
COPY ./packages/ui-web/package.json ./packages/ui-web/package.json
RUN yarn

COPY . .

# Expose UI port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=development

CMD ["yarn", "workspace", "@social-media/api", "start:dev"]
