### Noise Controller

_BASE URL: https://noise-controller-backend.herokuapp.com/_

**/-------------------------------------------/ AUTH ROUTES /-----------------------------------/**

**Register a Teacher**
_method url_: `/api/teachers/register`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name        | type   | required | description            |
| ----------- | ------ | -------- | ---------------------- |
| `username`  | String | Yes      | Must be unique         |
| `password`  | String | Yes      |                        |
| `email`     | String | Yes      | Must be unique         |
| `firstName` | String | No       |                        |
| `lastName`  | String | No       |                        |
| `title`     | String | No       | Mr., Mrs., etc         |
| `theme`     | String | No       | Default theme          |
|             |        |          | JSON.stringify() first |

#### Example

```
  {
    "username": "michael",
    "password": "1234",
    "email": "michael@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "zoo"
  }
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 1,
    "username": "michael",
    "email": "michael@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "zoo",
    "classes": []
  }
```

##### 428 (Preconditon Failed)

```
  {
    "message": "Missing required field(s): username, password"
  }
```

##### 500 (Server error)

```
  {
    "message": "Teacher could not be added",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
  }
```

`SQLITE_CONSTRAINT` usually indicates that one of the fields that is required to be unique, eg. `username` or `email`, is already registered. Will replace this with more helpful error messages soon.

**/----------------------------------------/**

### **Login a teacher**

_method url_: `/api/teachers/login`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description             |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | must be registered user |
| `password` | String | Yes      |                         |

#### Example

```
  {
    "username": "michael",
    "password": "1234"
  }
```

#### Response

##### 200 (ok)

> no issues logging in

###### Example response

```
  {
    "id": 1,
    "username": "michael",
    "password": "$2a$10$XNhVj5HP7tf92Jq9jOhVHu1nMZqPBHL2lRPVX8jxWmVyPa6HrhsO2",
    "email": "michael@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "safari",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJlbWFpbCI6Im1pY2hhZWxAZXhhbXBsZS5jb20iLCJpYXQiOjE1NzExNDEyMjYsImV4cCI6MTU3MTE4NDQyNn0.Csp6Aknp9xmLsiEluOHNa8zWsmw2KqBK2SUIADqryU8"
  }
```

##### 428 (Preconditon Failed)

```
  {
    message: "Missing username or password"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Error logging in",
    error: {
      "errno": 1,
      "code": "SOME_ERROR"
    }
  }
```

**/--------------------------------------------/ USER ROUTES /-----------------------------------/**

### **Get all Teachers**

_method url_: `/api/teachers`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Response

##### 200 (ok)

###### Example response

```
  [
    {
      "id": 1,
      "username": "michael",
      "email": "michael@example.com",
      "firstName": "Michael",
      "lastName": "Hart",
      "title": "Mr.",
      "theme": "safari",
      "classes": [
        {
          "id": 1,
          "name": "Morning Kindergarten",
          "teacherId": 1,
          "theme": "safari",
          "grade": "Kindergarten",
          "numberOfKids": 25,
          "streak": 3,
          "scores": [
            {
              "id": 1,
              "classId": 1,
              "createdAt": "2019-07-29 12:55:56",
              "score": 100,
              "streak": 1,
              "theme": "safari"
            },
            {
              "id": 2,
              "classId": 1,
              "createdAt": "2019-07-30 12:55:56",
              "score": 100,
              "streak": 2,
              "theme": "safari"
            },
            {
              "id": 3,
              "classId": 1,
              "createdAt": "2019-07-31 12:55:56",
              "score": 100,
              "streak": 3,
              "theme": "safari"
            }
          ]
        },
        {
          "id": 2,
          "name": "Afternoon Kindergarten",
          "teacherId": 1,
          "theme": "safari",
          "grade": "Kindergarten",
          "numberOfKids": 30,
          "streak": 0,
          "scores": [
            {
              "id": 4,
              "classId": 2,
              "createdAt": "2019-07-29 12:55:56",
              "score": 100,
              "streak": 1,
              "theme": "safari"
            },
            {
              "id": 5,
              "classId": 2,
              "createdAt": "2019-07-30 12:55:56",
              "score": 100,
              "streak": 2,
              "theme": "safari"
            },
            {
              "id": 6,
              "classId": 2,
              "createdAt": "2019-07-31 12:55:56",
              "score": 75,
              "streak": 0,
              "theme": "safari"
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "username": "anastasia",
      "email": "anastasia@example.com",
      "firstName": "Anastasia",
      "lastName": "Garciaparra",
      "title": "Mrs.",
      "theme": "safari",
      "classes": [
        {
          "id": 3,
          "name": "First Grade",
          "teacherId": 2,
          "theme": "safari",
          "grade": "1",
          "numberOfKids": 23,
          "streak": 1,
          "scores": [
            {
              "id": 7,
              "classId": 3,
              "createdAt": "2019-07-31 12:55:56",
              "score": 100,
              "streak": 1,
              "theme": "safari"
            }
          ]
        }
      ]
    }
  ]
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

```
{
  message: "Could not find teacher with id ${id}"
}
```

##### 500 (Bad Request)

```
  {
    message: "Error logging in",
    error: {
      "errno": 1,
      "code": "SOME_ERROR"
    }
  }
```

**/----------------------------------------/**

### **Get a single Teacher**

_method url_: `/api/teachers/:id`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Response

##### 200 (ok)

###### Example response

```
  {
    "id": 1,
    "username": "anabel",
    "email": "anabel@example.com",
    "firstName": "Anabel",
    "lastName": "Roberts",
    "title": "Mrs.",
    "theme": "aquarium",
    "classes": [
      {
        "id": 1,
        "name": "Kindergarten",
        "teacherId": 1,
        "theme": null,
        "grade": "Kindergarten",
        "numberOfKids": 30,
        "streak": 5,
        "scores": [
          {
            "id": 1,
            "classId": 1,
            "createdAt": "2019-07-31 12:41:11",
            "score": 0,
            "streak": 5,
            "theme": null
          },
          {
            "id": 2,
            "classId": 1,
            "createdAt": "2019-07-31 12:41:12",
            "score": 0,
            "streak": 5,
            "theme": null
          }
        ]
      },
      {
        "id": 2,
        "name": "First Grade",
        "teacherId": 1,
        "theme": null,
        "grade": "First",
        "numberOfKids": 30,
        "streak": 0,
        "scores": []
      }
    ]
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

Body was empty

```
  {
    message: "Missing teacher data"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Failed to get teacher",
    error: {
      "errno": 1,
      "code": "SOME_ERROR"
    }
  }
```

**/----------------------------------------/**

### **Modify a single Teacher**

_method url_: `/api/teachers/:id`

_http method_: **[PUT]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

Any of the following

| name        | type   | required | description    |
| ----------- | ------ | -------- | -------------- |
| `username`  | String | No       | Must be unique |
| `password`  | String | No       |                |
| `email`     | String | No       | Must be unique |
| `firstName` | String | No       |                |
| `lastName`  | String | No       |                |
| `title`     | String | No       | Mr., Mrs., etc |
| `theme`     | String | No       | Default theme  |

#### Example

```
  {
    "username": "michaelhart",
    "email": "michaelhart@example.com",
    "theme": "aquarium"
  }
```

#### Response

##### 200 (ok)

###### Example response

Returns updated teacher

```
  {
    "id": 1,
    "username": "michaelhart",
    "email": "michaelhart@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "aquarium",
    "classes": []
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

Body was empty

```
  {
    message: "Missing teacher data"
  }
```

##### 404 (Bad Request)

```
  {
    message: "Could not find teacher with id ${id}"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Failed to update teacher",
    error: {
      "errno": 1,
      "code": "SOME_ERROR"
    }
  }
```

**/----------------------------------------/**

### **Delete a single Teacher**

_method url_: `/api/teachers/:id`

_http method_: **[DELETE]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

None

#### Response

##### 200 (ok)

###### Example response

Returns true if successful

```
  true
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

```
  {
    message: "Could not find teacher with id ${id}"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Failed to delete teacher",
    error: {
      "errno": 1,
      "code": "SOME_ERROR"
    }
  }
```

**/--------------------------------------------/ CLASS ROUTES /-----------------------------------/**

**Create a Class **
_method url_: `/api/classes/`

_http method_: **[POST]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

| name           | type    | required | description                                                                                                    |
| -------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `name`         | String  | Yes      |
| `teacherId`    | Integer | Yes      | Must be the ID of an existing teacher record                                                                   |
| `theme`        | String  | No       |
| `grade`        | String  | No       |
| `numberOfKids` | Integer | No       |
| `streak`       | Integer | No       | Will automatically be copied from most recent streak you've saved, no need to update this manually but you can |

#### Example

```
{
	"name": "Third grade",
	"teacherId": 1,
	"grade": "3",
	"numberOfKids": 25,
  "theme": "zoo"
}
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 1,
    "name": "Third grade",
    "teacherId": 1,
    "theme": "zoo",
    "grade": "3",
    "numberOfKids": 25,
    "streak": 0,
    "scores": []
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

Body was empty

```
  {
    message: "Missing class data"
  }
```

##### 404 (Bad Request)

```
  {
    message: "Could not find class with id ${id}"
  }
```

##### 428 (Preconditon Failed)

```
  {
    "message": "Missing required field(s): name, teacherId"
  }
```

##### 500 (Server error)

```
  {
    "message": "Class could not be added",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
  }
```

In this case `SQLITE_CONSTRAINT` likely indicates that an invalid teacherId was provided

**/----------------------------------------/**

**Modify a Class **
_method url_: `/api/classes/:id`

_http method_: **[PUT]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

Any of the following

| name           | type    | required | description                                                                                                    |
| -------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `name`         | String  | Yes      |
| `teacherId`    | Integer | Yes      | Must be the ID of an existing teacher record                                                                   |
| `theme`        | String  | No       |
| `grade`        | String  | No       |
| `numberOfKids` | Integer | No       |
| `streak`       | Integer | No       | Will automatically be copied from most recent streak you've saved, no need to update this manually but you can |

#### Example

```
  {
    "name": "Second Grade",
    "grade": "2"
  }
```

#### Response

##### 200 (ok)

###### Example Response

Returns updated class

```
  {
    "id": 1,
    "name": "Second Grade",
    "teacherId": 1,
    "theme": "safari",
    "grade": "2",
    "numberOfKids": 25,
    "streak": 3,
    "scores": []
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

Body was empty

```
  {
    message: "Missing class data"
  }
```

##### 404 (Bad Request)

```
  {
    message: "Could not find class with id ${id}"
  }
```

##### 428 (Preconditon Failed)

```
  {
    "message": "Missing required field(s): name, teacherId"
  }
```

##### 500 (Server error)

```
  {
    "message": "Failed to update class",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
  }
```

In this case `SQLITE_CONSTRAINT` likely indicates that an invalid teacherId was provided

**/----------------------------------------/**

**Get list of Classes **
_method url_: `/api/classes/`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

None

#### Response

##### 200 (OK)

###### Example Response

```
  [
    {
      "id": 1,
      "name": "Second Grade",
      "teacherId": 1,
      "theme": "safari",
      "grade": "2",
      "numberOfKids": 25,
      "streak": 3
    },
    {
      "id": 2,
      "name": "Afternoon Kindergarten",
      "teacherId": 1,
      "theme": "safari",
      "grade": "Kindergarten",
      "numberOfKids": 30,
      "streak": 0
    },
    {
      "id": 3,
      "name": "First Grade",
      "teacherId": 2,
      "theme": "safari",
      "grade": "1",
      "numberOfKids": 23,
      "streak": 1
    },
    {
      "id": 4,
      "name": "Third grade",
      "teacherId": 1,
      "theme": "zoo",
      "grade": "3",
      "numberOfKids": 25,
      "streak": 0
    },
    {
      "id": 5,
      "name": "Third grade",
      "teacherId": 1,
      "theme": "zoo",
      "grade": "3",
      "numberOfKids": 25,
      "streak": 0
    },
    {
      "id": 6,
      "name": "Third grade",
      "teacherId": 1,
      "theme": "zoo",
      "grade": "3",
      "numberOfKids": 25,
      "streak": 0
    }
  ]
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 500 (Bad Request)

```
  {
    "message": "Failed to get classes",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
  }
```

**/----------------------------------------/**

**Get Class by ID **
_method url_: `/api/classes/:id`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

None

#### Response

##### 200 (OK)

###### Example Response

Returns a single class

```
  {
    "id": 1,
    "name": "Second Grade",
    "teacherId": 1,
    "theme": "safari",
    "grade": "2",
    "numberOfKids": 25,
    "streak": 3,
    "scores": [
      {
        "id": 1,
        "classId": 1,
        "createdAt": "2019-07-29 12:55:56",
        "score": 100,
        "streak": 1,
        "theme": "safari"
      },
      {
        "id": 2,
        "classId": 1,
        "createdAt": "2019-07-30 12:55:56",
        "score": 100,
        "streak": 2,
        "theme": "safari"
      },
      {
        "id": 3,
        "classId": 1,
        "createdAt": "2019-07-31 12:55:56",
        "score": 100,
        "streak": 3,
        "theme": "safari"
      }
    ]
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

```
  {
    message: "Could not find class with id ${id}"
  }
```

##### 500 (Bad Request)

```
  {
    "message": "Failed to get class",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
  }
```

**/----------------------------------------/**

**Delete a Class by ID **
_method url_: `/api/classes/:id`

_http method_: **[DELETE]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

None

#### Response

##### 200 (OK)

###### Example Response

Returns true if successful

```
  true
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

```
  {
    message: "Could not find class with id ${id}"
  }
```

##### 500 (Server error)

```
  {
    "message": "Failed to delete class",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
  }
```

**/--------------------------------------------/ SCORE ROUTES /-----------------------------------/**

**Create a Score **
_method url_: `/api/classes/:id/score`

_http method_: **[POST]**

#### Headers

| name            | type   | required | description                    |
| --------------- | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

| name      | type    | required | description                                                                        |
| --------- | ------- | -------- | ---------------------------------------------------------------------------------- |
| `classId` | Integer | Yes      | Must be the ID of an existing class record                                         |
| `score`   | Integer | No       |
| `streak`  | Integer | Yes      | After POSTing, this value will also be copied automatically to the class record    |
| `theme`   | String  | No       | In case a teacher wants to track which theme gets the best results from their kids |

#### Example

```
  {
    "classId": 2,
    "streak": 6,
    "score": 100,
    "theme": "aquarium"
  }
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 9,
    "classId": 2,
    "createdAt": "2019-10-15 12:38:44",
    "score": 100,
    "streak": 6,
    "theme": "aquarium"
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request)

Body was empty

```
  {
    message: "Missing score data"
  }
```

##### 428 (Preconditon Failed)

```
  {
    message: "Missing required field(s): streak"
  }
```

##### 500 (Server error)

```
  {
    "message": "Score could not be added",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
  }
```
