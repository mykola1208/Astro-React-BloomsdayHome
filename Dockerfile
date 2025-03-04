# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=21.7.3
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Astro"

# Astro app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ARG YARN_VERSION=1.22.10
RUN npm install -g yarn@$YARN_VERSION --force


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY --link package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# Copy application code
COPY --link . .

# Build application
RUN --mount=type=secret,id=CLERK_SECRET_KEY \
    --mount=type=secret,id=PUBLIC_ASTRO_APP_CLERK_PUBLISHABLE_KEY \
    --mount=type=secret,id=PUBLIC_GETSTREAM_APP_ID \
    --mount=type=secret,id=PUBLIC_GETSTREAM_FEED_KEY \
    --mount=type=secret,id=GETSTREAM_FEED_SECRET \
    --mount=type=secret,id=ALGOLIA_ADMIN_KEY \
    --mount=type=secret,id=ALGOLIA_SEARCH_KEY \
    --mount=type=secret,id=PUBLIC_ALGOLIA_APP_ID \
    --mount=type=secret,id=PUBLIC_HASURA_BASE_URL \
    CLERK_SECRET_KEY="$(cat /run/secrets/CLERK_SECRET_KEY)" \
    PUBLIC_ASTRO_APP_CLERK_PUBLISHABLE_KEY="$(cat /run/secrets/PUBLIC_ASTRO_APP_CLERK_PUBLISHABLE_KEY)" \
    PUBLIC_GETSTREAM_APP_ID="$(cat /run/secrets/PUBLIC_GETSTREAM_APP_ID)" \
    PUBLIC_GETSTREAM_FEED_KEY="$(cat /run/secrets/PUBLIC_GETSTREAM_FEED_KEY)" \
    GETSTREAM_FEED_SECRET="$(cat /run/secrets/GETSTREAM_FEED_SECRET)" \
    ALGOLIA_ADMIN_KEY="$(cat /run/secrets/ALGOLIA_ADMIN_KEY)" \
    ALGOLIA_SEARCH_KEY="$(cat /run/secrets/ALGOLIA_SEARCH_KEY)" \
    PUBLIC_ALGOLIA_APP_ID="$(cat /run/secrets/PUBLIC_ALGOLIA_APP_ID)" \
    PUBLIC_HASURA_BASE_URL="$(cat /run/secrets/PUBLIC_HASURA_BASE_URL)" \
    yarn run build

# Remove development dependencies
RUN yarn install --production=true


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

ENV PORT=4321
ENV HOST=0.0.0.0

# Start the server by default, this can be overwritten at runtime
EXPOSE 4321
CMD [ "node", "./dist/server/entry.mjs" ]
