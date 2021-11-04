# EverydayHealth NodeJS Coding Test

Given the data in /data/user_nl_tracking_data.csv, create an API to get the aggregated data.

## Data

csv file containing record for user activity for newsletters.

#### Schema:

- **user_id** : id of a user (1 to 10)
- **newsletter_id** : id of a newsletter (100 to 110)
- **action**: user action on newsletter emails (open or click)
- **activity_date**: date when user open/click on the newsletter email (from 2021-06-01 to 2021-06-06)

## API Requirement:

#### GetNLSummary

- **Argument**: newsletter_id
- **Response**: return count per day for the given newsletter_id
- Notes: all actions against newsletter, by day

#### GetUserSummary

- **Argument**: user_id
- **Response**: return count per day for the given user_id
- Notes: all actions by a user, by day

#### GetNLActionSummary

- **Argument**: newsletter_id
- **Response**: daily open and click action counts for given newsletter_id
- Notes: Breakdown of opens and clicks, by day, of a newsletter

Notes:

- REST API in the form of microservice.
  - docker compose up -> run data loading pipeline -> accept GET reqs from cross origin
  - Express server
  - Dockerized
  - Deployed (if enough time)
- DB is optional
  - Could load data first, then perform queries (easier to justify for larger data sets). No need to deal with chunks / stream.
  - Skip DB and deal only with Node stream and chunks of data in-memory.
- Implement cache/memoization for already-encountered inputs? (useful if the CSV source changes?)
- Dockerize API and connected DB

## Questions:
