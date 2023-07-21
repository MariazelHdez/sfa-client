# SFA Backoffice Adminstration Web Application

## Developing in this Repository

Writing code and developing in this application requires running three services:

- A local Microsoft SQL Server (2019 Linux) database running in Docker
- A local Minio Object Store (S3 compatible) to store files uploaded to the application
- A local Mail Slurper SMTP endpoint for sending development emails
- The server-side Node.js application written in TypeScript: `/src/api`
- The Vue.js and Vuetify based front-end: `/src/web`

### Development Setup

1. Duplicate the `sapassword.env.sample` file to `sapassword.env` via

   ```bash
   cp sapassword.env.sample sapassword.env
   ```

2. To run the database locally, you must have Docker installed as well as Docker Compose, then run the following command from the root directory:

   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

   or if your docker compose is old

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

   This command will start SQL Server, Email and S3 and bind it to your local machine's port 1433.

3. When the database starts the first time, the database will be empty. To load it with data, you must obtain a database backup and put it into `/db/backups/sfa.bak` then run the follow commands:

4. The first time you start the application, you must create a bucket named `documents` and an Access Key. Copy the access key id and secret and drop those values into the appropriate spots in the environment file. The Minio Web interface located at http://localhost:9090. Subsequent starts, it is not required to access the Minio interface.

5. To preview sent emails, the MailSlurper web interface is located at http://localhost:8081.

6. Once in, run the following commands to create and restore the database from the backup:

   ```bash
   docker compose \
      -f docker-compose.dev.yml \
      exec -it db \
      /opt/mssql-tools/bin/sqlcmd \
         -U sa \
         -s localhost \
         -P Testing1122 \
         -Q "RESTORE DATABASE SFADB_DEV FROM DISK = N'backups/sfa.bak' WITH FILE = 1"
   ```

   If you need to debug the restore you can connect to the running SQL Server via

   ```bash
   docker compose -f docker-compose.dev.yml exec -it db bash
   ```

7. Install `asdf` using instructions at https://asdf-vm.com/guide/getting-started.html.

8. Install the `nodejs` plugin via and the appropriate nodejs version.

   ```bash
   asdf plugin add nodejs
   asdf install nodejs # installs the version from the .tool-verions file
   ```

   Check that you have the correct version set up by seeing that these two commands match:

   ```bash
   asdf current nodejs
   node -v
   ```

9. You will now have a local database with data ready for the API. To run the API, run the following commands:

   ```bash
   cd src/api
   npm install
   ```

10. You must then duplicated the `.env.sample` to `.env.development` and update the appropriate values for the local database and authentication. You will need to set the `DB_PASS` equal to the value of the `MSSQL_SA_PASSWORD` in the `db/sapassword.env`.

    ```bash
    cp .env.sample .env.development
    ```

11. Start the Node.js API with:

    ```bash
    npm run start
    ```

    The API will bind to your local machines port 3000 and be available at http://localhost:3000

12. Last to start is the the Vue.js web front-end. To run this, open a second terminal window at this directory and run the following commands:

    ```bash
    cd src/web
    npm install
    npm run start
    ```

    You will now have the Vue CLI server hosting the application at http://localhost:8080 and you can begin editing the API or front-end code. **All changes to the files in the `src/api` and `src/web` will automatically reload there respective applications.**

---

To access the Database console directly use:

```bash
docker compose -f docker-compose.dev.yml exec db /opt/mssql-tools/bin/sqlcmd -U sa -s localhost -P Testing1122
```

## Contributing code

To process to contribute code to this repository is via pull requests initiated from a forked copy of this repository.

Steps:

- In your browser, open https://github.com/ytgov/sfa-client/fork
- Fork the repo into your own namespace
- Do your work!
- Ensure the app builds: `docker-compose build`
- Before a pull request is created, sync your branch with upstream using the GitHub sync function
- Create a pull request from your branch to ytgov/sfa-client:test (upstream)
- The pull request will be reviewed and approved or rejected
  - If conflicts exist, the PR will be rejected
  - You then need to rebase from upstream and resolve conflicts then resubmit your PR

---

## Running the application in production

Since the database for this system is managed externally, PRODUCTION version only needs to run the API and Web services.
The `Dockerfile` in this directory builds the Vue.js web front-end, and serves the compiled files via the Node.js API,
so only one container is required to serve the front-end and back-ends; thus saving resources.

On the PRODUCTION server, the application is run via docker-compose, so the code needs to be cloned to the server and
the appropriate environment variables set using the following commands:

```
cp /src/api/.env /src/api/.env.production
vi /src/api/.env.production
```

You now can use vi or nano or other tool to set the environment variables before starting the application with:

```
docker-compose -f docker-compose.production.yml up --build -d
```

When you look at the running Docker containers using `docker ps`, you should see a container named `sfa-client_web_1`.

```

**One thing to keep in mind is that the port in the `docker-compose.prodution.yml` may need to be changed
depending the the reverse proxy setups.**
```
