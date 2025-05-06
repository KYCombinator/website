FROM public.ecr.aws/lambda/nodejs:18

# Set working directory in Lambda container
WORKDIR /var/task

# Copy Lambda package.json and install Lambda-specific deps
COPY lambda/package*.json ./
RUN npm install

# Copy Lambda server code
COPY lambda/server.js ./

COPY .next .next
# COPY --from=builder /app/next.config.js .
COPY public ./

# Set Lambda handler
CMD [ "server.handler" ]