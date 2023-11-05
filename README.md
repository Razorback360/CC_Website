# Quick Start Guide to Setup this Project

## Step 1: Clone the Project

First, you need to clone the project repository from GitHub. You can do this by running the following command in your terminal:

```bash
git clone <repository_url>
```

Replace `<repository_url>` with the URL of our GitHub repository.

## Step 2: Install Extensions

Next, install any extensions that you'd like to use for this project, I've added some extensions as recommended for the tools we're using here, it is optional to install any but they could be helpful depending on what you're working on.

## Step 3: Enable Prettier Formatting

**For formatting however, you would need to install the Prettier extension.** To enable Prettier formatting in VS Code, open the settings (File > Preferences > Settings), search for "Prettier", and make sure "Editor: Format On Save" is checked. This will automatically format your code whenever you save a file.

We force this to have a consistent code style across the project, to avoid any merge conflicts due to formatting and avoid any unnecessary changes to the codebase when simply saving a file later on down the line.

If you don't like it you can always suggest something else, or disable it and work on your own style, however, before any branch can be merged into main, it should be formatted properly to match the rest of the codebase.

If you're disabling it, you can run the following command to format the codebase before pushing your changes to GitHub, this will format all files in the project that are not ignored by `.prettierignore`:

```bash
npm run format
```

## Step 4: Set Up Environment Variables

Create an exact copy of the `.env.example` file in the project root directory and rename it to `.env`. This file will contain all the environment variables needed for your local setup.

### NextAuth Variables

For NextAuth, you need to set up two environment variables: `NEXTAUTH_SECRET` and `NEXTAUTH_URL`.

#### NEXTAUTH_SECRET

This is a secret used to encrypt session data. You can generate a new secret on the command line with the following command:

```bash
openssl rand -base64 32
```

Copy the output and set it as the value of `NEXTAUTH_SECRET` in the `.env` file:

```bash
NEXTAUTH_SECRET="<your-secret>"
```

Replace `<your-secret>` with the secret you generated.

#### NEXTAUTH_URL

This is the base URL of your site. For local development, this will be `http://localhost:3000`. Set it as the value of `NEXTAUTH_URL` in the `.env` file:

```bash
NEXTAUTH_URL="http://localhost:3000"
```

## Step 5: Set Up Local PostgreSQL Database

First, you need to install PostgreSQL (or psql) on your machine. If you don't have it installed, you can follow the detailed steps in this [guide].

Once you've installed PostgreSQL, you can create a new database for the project. Open your terminal and run the following commands:

```bash
# Sign in using username "postgres" or whatever you named it
psql -U postgres

# Create a local database "mydatabase" (name whatever)
CREATE DATABASE mydatabase;
```

Replace `mydatabase` with the name you want to give to your database.

To find your user, host, or port, you can run the following command:

```bash
\conninfo
```

The result should look something like this:

```
You are connected to database "postgres" as user "postgres" on host "localhost" (address "::1") at port "5432".
```

## Step 6: Link Database to Project

Next, you need to link your local PostgreSQL database to the project. Open the `.env` file you created earlier and find the line that starts with `DATABASE_URL`. Replace the value with your database connection string in the following format:

```bash
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database-name>"
```

Replace `<username>`, `<password>`, and `<database-name>` with your PostgreSQL username, password, and database name, respectively.

Now, you're all set with the database setup!

## Step 7: Start the Local Server

Finally, you can start the local server by running the following command in the terminal:

```bash
npm run dev
```

This will start the local development server. You can now open your browser and navigate to `http://localhost:3000` to see the project running.

## Looking for more docs?

Since this project is a boilerplate provided by the [T3 Stack](https://create.t3.gg/), there's already a lot of quick and to the point documetation on their website

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
