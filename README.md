# everydayhealth-api-service

A containerized RESTful API service consisting of an Express server connected to a MongoDB database, composed together via the Docker engine.

### Install  

Run `docker compose up` from the root directory to spin up the API service.

Once running, the application will 1) start an Express server and 2) parse the .csv file and load data into MongoDB.

The Express server defaults to listening on port 3000, connects to MongoDB on port 27017. The default path to the .csv file is './data/data.csv'.

To assign a custom server port number (e.g. `PORT=8000`) or a custom name to the .csv file (e.g. `csvFilePath=./data/newData.csv`), simply do so in a `.env` file saved to the root directory.

### API Endpoints  

The service exposes the following endpoints:

- **GET /nlsummary/:nlId** : Provided a valid newsletter ID, returns an object with daily counts of all user activities (click + open) against the newsletter.
- **GET /usersummary/:userId** : Provided a valid user ID, returns an object with daily counts of all activities (click + open) by the user.
- **GET /nlactionsummary/:nlId** : Provided a valid newsletter ID, returns an object with daily activities by users against the newsletter, broken down into open counts versus click counts.

### Initial Data  

The initial .csv file contains records for user activites against newsletters with the follow schema, which matches the Mongoose schema used by the service:

- **user_id**: id of a user (1 to 10)
- **newsletter_id**: id of a newsletter (100 to 110)
- **action**: user action on newsletter emails (open or click)
- **activity_date**: date when user open/click on the newsletter email (from 2021-06-01 to 2021-06-07)
