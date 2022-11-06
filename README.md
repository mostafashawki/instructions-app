# Instructions App

## Initial setup with Docker-Compose

1. Install all dependencies in all sub folders with `npm install` or use this script:

```
$ ./npm_install_all.sh
```

2. Start the docker-compose environment:

```
$ docker-compose up -d
```

3. Run the database seeder:

```
$ docker-compose exec backend npm run db:seed
```

The frontend can be opened at the URL `http://rddms.localhost/`.

## Initial setup without Docker-Compose

1. Install all dependencies in all sub folders with `npm install` or use this script:

```
$ ./npm_install_all.sh
```

2. Add a MongoDB connection string in file `backend/.env` (see example in `backend/.env-example`).

3. Start the backend:

```
$ cd backend
$ npm run dev
```

4. Run the database seeder:

```
$ cd backend
$ npm run db:seed
```

5. Install Quasar CLI

```
$ npm install -g @quasar/cli
```

6. Start the frontend:

```
$ cd frontend
$ quasar dev
```

The frontend can be opened at the URL `http://localhost:8080/`.

## Backend Tests

### Without Docker-Compose

```
$ cd backend
$ npm run test
```

### With Docker-Compose

Run all tests:

```
$ docker-compose -f docker-compose.test.yml run backend
```

Run only a single test, e.g. `loads-upload`:

```
$ docker-compose -f docker-compose.test.yml run backend loads-upload
```

Watch tests:

```
$ docker-compose -f docker-compose.test.yml run backend --watchAll
```
