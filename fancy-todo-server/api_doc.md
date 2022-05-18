# fancy-todo App endpoint

Fancy Todo is an application to manage your todo list.<br/><br/>

- ## **GET /todos** <br/>
> Get all todos

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  {
    "id": <integer>,
    "title": "<string>",
    "description": "<string>",
    "status": "<string>",
    "due_date": "<date>",
    "createdAt": "<date>",
    "updatedAt": "<date>"
  },
  {
    "id": <integer>,
    "title": "<string>",
    "description": "<string>",
    "status": "<string>",
    "due_date": "<date>",
    "createdAt": "<date>",
    "updatedAt": "<date>"
  }
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "<500's message>"
}
```
<br/><br/>

- ## **POST /todos**

> Create new asset

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
  "title": "<string>",
  "description": "<string>",
  "status": "<string>",
  "due_date": <date>
}
```

_Response (201 - Created)_

```
{
  "id": <integer>,
  "title": "<string>",
  "description": "<string>",
  "status": "<string>",
  "due_date":  <date>,
  "createdAt": <date>,
  "updatedAt": <date>
}
```

_Response (400 - SequelizeValidationError)_

```
{
  "message": <string>
}
```

_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```
<br/><br/>

- ## **GET /todos/:id**
> Get todos by id

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```
_Request Params_

```
{
  "id": <integer>"
}
```
_Response (200)_

```
  {
    "id": <integer>,
    "title": "<string>",
    "description": "<string>",
    "status": "<string>",
    "due_date": "<date>",
    "createdAt": "<date>",
    "updatedAt": "<date>"
  }
```
_Response (401 - Unauthorize)_

```
{
  "message": "Unauthorize"
}
```

_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```
<br/><br/>

- ## **PUT /todos/:id**
> Update todos (all attributes) by id

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Body_

```
{
  "title": "<string>",
  "description": "<string>",
  "status": "<string>",
  "due_date": <date>
}
```
_Request Params_

```
{
  "id": <integer>"
}
```
_Response (200)_

```
  {
    "id": <integer>,
    "title": "<string>",
    "description": "<string>",
    "status": "<string>",
    "due_date": "<date>",
    "createdAt": "<date>",
    "updatedAt": "<date>"
  }
```
_Response (400 - Bad Request)_

```
{
  "message": <string>
}
```

_Response (401 - Unauthorize)_

```
{
  "message": "Unauthorize"
}
```
_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```
<br/><br/>


- ## **PATCH /todos/:id**
> Update one attributes todos by id

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Body_

```
{
  "status": "<string>"
}
```
_Request Params_

```
{
  "id": <integer>"
}
```
_Response (200)_

```
  {
    "id": <integer>,
    "title": "<string>",
    "description": "<string>",
    "status": "<string>",
    "due_date": "<date>",
    "createdAt": "<date>",
    "updatedAt": "<date>"
  }
```
_Response (400 - Bad Request)_

```
{
  "message": <string>
}
```

_Response (401 - Unauthorize)_

```
{
  "message": "Unauthorize"
}
```
_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```
<br/><br/>

- ## **DELETE /todos/:id**
> Delete todos by Id

_Request Header_

```
{
  "access_token": "<your access token>"
}
```
_Request Body_

```
not needed
```
_Request Params_

```
{
  "id": <integer>"
}
```
_Response (200)_

```
  {
   message: 'todo success to delete' 
  }
```
_Response (401 - Unauthorize_

```
{
  "message": "Unauthorize"
}
```
_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```
<br/><br/>

- ## **POST /signUp**
> signUp User

_Request Body_

```
{
  "email": "<string>",
  "password": "<string>"
}
```
_Response (201)_

```
{
    "id": <integer>,
    "email": "<string>"
}
```
_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```

- ## **POST /signIn**
> signIn User

_Request Body_

```
{
  "email": "<string>",
  "password": "<string>"
}
```
_Response (200)_

```
{
    "token": <string>
}
```
_Response (401)_

```
{
    "message": 'Invalid Email or Password'
}
```
_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```

- ## **GET /holidays**
> signIn User

_Request Body_

```
{
  "year": "<integer>",
  "month": "<integer>"
}
```
_Response (200)_

```
{
    "holiday": "<array of object>"
}

example result : 
{
    "holiday": [
        {
            "name": "Ascension of the Prophet Muhammad",
            "date": "2021-03-11"
        },
        {
            "name": "Bali's Day of Silence and Hindu New Year",
            "date": "2021-03-14"
        }
    ]
}
```
_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```

- ## **POST /googleLogin**
> signIn User

_Request Body_

```
{
  "id_token": "<token from google signIn>",
}
```
_Response (200)_

```
{
    "token": "<your access token>"
}
```
_Response (500 - internal server error)_

```
{
  "message": "<500's message>"
}
```
