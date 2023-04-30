## website
My personal site made using the [t3 stack](https://create.t3.gg) - a fullstack and fully typesafe personal site.

[![Website](https://img.shields.io/website?label=yogeshx.vercel.app&style=for-the-badge&up_message=online&url=https%3A%2F%2Fyogeshx.vercel.app)](https://yogeshx.vercel.app)
[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=yogeshx&style=for-the-badge)](https://github.com/vibrantfix/yogeshx.vercel.app)

# Create T3 App

This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.The tech stack consists of :
- [Next-Auth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [TailwindCSS](https://tailwindcss.com)
- [tRPC](https://trpc.io) (using @next version? [see v10 docs here](https://alpha.trpc.io))

My site uses all of these pieces of tech and [Planetscale's free tier](https://planetscale.com) for the database.

## run locally
clone the repo and cd into it
```bash
git clone https://github.com/vibrantfix/yogeshx.vercel.app.git Mywebsite
cd Mywebsite
```
install dependencies
```bash
pnpm i 
```
add the environment variables required, see [.env.example](/.env.example) for reference
```bash
# Prisma
DATABASE_URL=

# Next Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Next Auth Discord Provider
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Next Auth GitHub Provider
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# LastDotFM API Credentials
LASTFM_API_KEY=

# Wakatime
WAKATIME_API_KEY=
```
fire up prisma
```bash
pnpm dlx prisma db push
pnpm dlx prisma studio # to preview your data
```
run the dev server
```bash
pnpm run dev
```

## How do I deploy this?

### Vercel

We recommend deploying to [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss). It makes it super easy to deploy NextJs apps.

- Push your code to a GitHub repository.
- Go to [Vercel](https://vercel.com/?utm_source=t3-oss&utm_campaign=oss) and sign up with GitHub.
- Create a Project and import the repository you pushed your code to.
- Add your environment variables.
- Click **Deploy**
- Now whenever you push a change to your repository, Vercel will automatically redeploy your website!

### Docker

You can also dockerize this stack and deploy a container.

1. In your [next.config.mjs](./next.config.mjs), add the `output: "standalone"` option to your config.
2. Create a `.dockerignore` file with the following contents:
   <details>
   <summary>.dockerignore</summary>

   ```
   Dockerfile
   .dockerignore
   node_modules
   npm-debug.log
   README.md
   .next
   .git
   ```

  </details>

3. Create a `Dockerfile` with the following contents:
   <details>
   <summary>Dockerfile</summary>

   ```Dockerfile
   # Install dependencies only when needed
   FROM node:16-alpine AS deps
   # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
   RUN apk add --no-cache libc6-compat
   WORKDIR /app

   # Install dependencies based on the preferred package manager
   COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
   RUN \
      if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
      elif [ -f package-lock.json ]; then npm ci; \
      elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
      else echo "Lockfile not found." && exit 1; \
      fi


   # Rebuild the source code only when needed
   FROM node:16-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .

   # Next.js collects completely anonymous telemetry data about general usage.
   # Learn more here: https://nextjs.org/telemetry
   # Uncomment the following line in case you want to disable telemetry during the build.
   # ENV NEXT_TELEMETRY_DISABLED 1

   RUN yarn build

   # If using npm comment out above and use below instead
   # RUN npm run build

   # Production image, copy all the files and run next
   FROM node:16-alpine AS runner
   WORKDIR /app

   ENV NODE_ENV production
   # Uncomment the following line in case you want to disable telemetry during runtime.
   # ENV NEXT_TELEMETRY_DISABLED 1

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   # You only need to copy next.config.js if you are NOT using the default configuration
   # COPY --from=builder /app/next.config.js ./
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/package.json ./package.json

   # Automatically leverage output traces to reduce image size
   # https://nextjs.org/docs/advanced-features/output-file-tracing
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

  </details>

4. You can now build an image to deploy yourself, or use a PaaS such as [Railway's](https://railway.app) automated [Dockerfile deployments](https://docs.railway.app/deploy/dockerfiles) to deploy your app.

## Useful resources

Here are some resources that we commonly refer to:

- [Protecting routes with Next-Auth.js](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)
## ending note
- don't forget to star the repo if you liked the project.
