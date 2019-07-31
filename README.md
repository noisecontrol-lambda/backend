### Noise Controller ###

**/--------------------------------------------/ AUTH ROUTES /-----------------------------------/**

**Register a Teacher**
_method url_: `/api/teachers/register`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name         | type   | required | description            |
| ------------ | ------ | -------- | --------------         |
| `username`   | String | Yes      | Must be unique         |
| `password`   | String | Yes      |                        |
| `email`      | String | Yes      | Must be unique         |
| `firstName`  | String | No       |                        |
| `lastName`   | String | No       |                        |
| `title`      | String | No       | Mr., Mrs., etc         |
| `theme`      | String | No       | Default theme          |
|              |        |          | JSON.stringify() first |

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
    "id": 2,
    "username": "michael",
    "email": "michael@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "zoo",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6Im1pY2hhZWwiLCJpYXQiOjE1NjQ0MDY4OTQsImV4cCI6MTU2NDQ1MDA5NH0.sbuq8MfwUEaqjcdMEFgCLsxlNvnrpX9UndYIMKli14s"
  }
```

##### 428 (Preconditon Failed)

```
  {
    message: "Missing username or password"
  }
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
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Response

##### 200 (ok)

###### Example response

```
  [
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
    },
    {
      "id": 2,
      "username": "michael",
      "email": "michael@example.com",
      "firstName": "Michael",
      "lastName": "Hart",
      "title": "Mr.",
      "theme": "safari",
      "classes": []
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
| --------------  | ------ | -------- | ------------------------------ |
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
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body
Any of the following

| name         | type   | required | description            |
| ------------ | ------ | -------- | --------------         |
| `username`   | String | No       | Must be unique         |
| `password`   | String | No       |                        |
| `email`      | String | No       | Must be unique         |
| `firstName`  | String | No       |                        |
| `lastName`   | String | No       |                        |
| `title`      | String | No       | Mr., Mrs., etc         |
| `theme`      | String | No       | Default theme          |

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
Returns full list of teachers

```
  [
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
    },
    {
      "id": 2,
      "username": "michael",
      "email": "michael@example.com",
      "firstName": "Michael",
      "lastName": "Hart",
      "title": "Mr.",
      "theme": "safari",
      "classes": []
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
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body
None

#### Response

##### 200 (ok)

###### Example response
Returns full list of teachers

```
  [
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
    },
    {
      "id": 2,
      "username": "michael",
      "email": "michael@example.com",
      "firstName": "Michael",
      "lastName": "Hart",
      "title": "Mr.",
      "theme": "safari",
      "classes": []
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
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

| name         | type    | required | description   
| ------------ | ------- | -------- | --------------
| `name`       | String  | Yes      | 
| `teacherId`  | Integer | Yes      | Must be the ID of an existing teacher record
| `theme`      | String  | No       |
| `grade`      | String  | No       |
| `numberOfKids`| Integer | No     
| `streak`     | Integer | No       | Will automatically be copied from most recent streak you've saved, no need to update this manually but you can

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
    "grade": "3",
    "numberOfKids": 25,
    "theme": "zoo",
    "streak": 0
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

`SQLITE_CONSTRAINT` usually indicates that one of the fields that is required to be unique, eg. `username` or `email`, is already registered. Will replace this with more helpful error messages soon.

**/----------------------------------------/**

**Modify a Class **
_method url_: `/api/classes/:id`

_http method_: **[PUT]**

#### Headers

| name            | type   | required | description                    |
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body
Any of the following

| name         | type    | required | description   
| ------------ | ------- | -------- | --------------
| `name`       | String  | Yes      | 
| `teacherId`  | Integer | Yes      | Must be the ID of an existing teacher record
| `theme`      | String  | No       |
| `grade`      | String  | No       |
| `numberOfKids`| Integer | No     
| `streak`     | Integer | No       | Will automatically be copied from most recent streak you've saved, no need to update this manually but you can

#### Example

```
  {
    "name": "Second Grade",
    "grade": "2"
  }
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 1,
    "name": "Second grade",
    "teacherId": 1,
    "grade": "2",
    "numberOfKids": 25,
    "theme": "zoo",
    "streak": 0
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

**/----------------------------------------/**

**Get list of Classes **
_method url_: `/api/classes/`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------  | ------ | -------- | ------------------------------ |
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
    "name": "Third grade",
    "teacherId": 2,
    "theme": "zoo",
    "grade": "3",
    "numberOfKids": 25,
    "streak": 4
  },
  {
    "id": 2,
    "name": "Kindergarten",
    "teacherId": 1,
    "theme": "jungle",
    "grade": "Kindergarten",
    "numberOfKids": 30,
    "streak": 2
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
| --------------  | ------ | -------- | ------------------------------ |
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
    "name": "Third grade",
    "teacherId": 2,
    "theme": "zoo",
    "grade": "3",
    "numberOfKids": 25,
    "streak": 4
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
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body
None

#### Response

##### 200 (OK)

###### Example Response

```
  {
    "message": "Class with id 1 deleted"
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

**Create a Class **
_method url_: `/api/classes/:id/score`

_http method_: **[POST]**

#### Headers

| name            | type   | required | description                    |
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Body

| name         | type    | required | description   
| ------------ | ------- | -------- | --------------
| `classId`       | Integer  | Yes      | Must be the ID of an existing class record
| `score`      | Integer  | No       |
| `streak`     | Integer | Yes       | After POSTing, this value will also be copied automatically to the class record
| `theme`      | String | No | In case a teacher wants to track which theme gets the best results from their kids

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
    "id": 1,
    "classId": 2,
    "createdAt": "2019-07-30 14:59:09",
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

`SQLITE_CONSTRAINT` usually indicates that one of the fields that is required to be unique, eg. `username` or `email`, is already registered. Will replace this with more helpful error messages soon.