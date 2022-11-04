FROM node:16 AS builder
WORKDIR /usr/src/app
COPY app /usr/src/app
RUN npm install
RUN npm run build

FROM node:16-stretch-slim AS runner
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/.next/standalone ./
CMD ["node", "server.js"]
