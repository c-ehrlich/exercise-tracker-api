# [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

A basic API for exercise tracking that allows for user creation (without any kind of auth), logging exercises, and being able to retrieve exercises for a user as well as some filters (start and end date, limit).

Part of the FreeCodeCamp Back End Development Certification.

## Installation
* Clone down the repo
* Create a MongoDB Database. One possbility for this is using [MongoDB Atlas](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/).
* In the root directory of the project, create a .env file containing: `MONGO_URI: <your Mongo URI>`
* `npm i`
* `npm start`

## Sample deployment
https://fcc-exercise-tracker-service.herokuapp.com/

## Deployment
Heroku is shown as a sample deployment because it's free and doesn't required a Procfile.

With the [Heroku CLI](https://devcenter.heroku.com/categories/command-line) installed,
```
heroku login -i
heroku create <app name>
heroku git:remote -a <app name>
git push heroku main
```
* Create a MongoDB Database. One possbility for this is using [MongoDB Atlas](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/).
* In the Heroku Project Settings, in Config Vars add key `MONGO_URI`, value is the URI of your MongoDB Database.

## Sample Requests

### Create a user
You can `POST` to `/api/users` with form data `username` to create a new user.
#### Request
`POST /api/users`

Body (`application/x-www-form-urlencoded`):
```json
{
    "username": "cehrlich"
}
```
#### Response
```json
{
    "username": "cehrlich",
    "_id": "61e5689b039759356d4f6a51"
}
```

### View all users
You can make a `GET` request to `/api/users` to get a list of all users.
#### Request
`GET /api/users`
#### Response
```json
[
    {
        "_id": "61def226b4b7a2f495428b6c",
        "username": "test1",
        "__v": 0
    },
    {
        "_id": "61e5689b039759356d4f6a51",
        "username": "cehrlich",
        "__v": 0
    },
    {
        "_id": "61df3f69b30278a37d4190c3",
        "username": "aaaa",
        "__v": 0
    }
]
```

### Log an Exercise
You can `POST` to `/api/users/:_id/exercises` with form data `description`, `duration`, and optionally `date`. If no date is supplied, the current date will be used.
#### Request
`POST /api/users/61e5689b039759356d4f6a51/exercises`

Body (`application/x-www-form-urlencoded`):
```json
{
    "description": "Jogging",
    "duration": 30,
    "date": "2022-01-12"
}
```
#### Response
```json
{
    "_id": "61e5689b039759356d4f6a51",
    "username": "cehrlich",
    "description": "Jogging",
    "duration": 30,
    "date": "Wed Jan 12 2022"
}
```

### Retrieve User and Exercises
A `GET` request to `/api/users/:id/logs` will return the user object with a `log` array of all the exercises added.
#### Request
`GET /api/users/61e5689b039759356d4f6a51/logs`
#### Response
```json
{
    "_id": "61e5689b039759356d4f6a51",
    "username": "cehrlich",
    "count": 6,
    "log": [
        {
            "description": "Tennis",
            "duration": 45,
            "date": "Wed Dec 15 2021"
        },
        {
            "description": "Climbing",
            "duration": 25,
            "date": "Tue Jan 11 2022"
        },
        {
            "description": "Jogging",
            "duration": 30,
            "date": "Wed Jan 12 2022"
        },
        {
            "description": "Swimming",
            "duration": 15,
            "date": "Thu Jan 13 2022"
        },
        {
            "description": "Basketball",
            "duration": 25,
            "date": "Sat Feb 12 2022"
        }
    ]
}
```
### Retrieve User and Exercises with Filters
You can add `from`, `to` and `limit` parameters to a `GET /api/users/:_id/logs` request to retrieve part of the `log` of any user. `from` and `to` are dates in `yyyy-mm-dd format`. `limit` is an integer of how many logs to send back.
#### Request
`GET /api/users/61e5689b039759356d4f6a51/logs?from=2022-01-01&to=2022-01-31&limit=2`
#### Response
```json
{
    "_id": "61e5689b039759356d4f6a51",
    "username": "cehrlich",
    "count": 2,
    "log": [
        {
            "description": "Climbing",
            "duration": 25,
            "date": "Tue Jan 11 2022"
        },
        {
            "description": "Jogging",
            "duration": 30,
            "date": "Wed Jan 12 2022"
        }
    ]
}
```
