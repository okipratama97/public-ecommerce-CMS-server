# ecommerce-CMS-server

### GET /products

> Get all Products

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
    "id": 2,
    "name": "Product 2",
    "image_url": "https://dummyimage.com/150x150/000/fff&text=Item",
    "price": 10000,
    "stock": 10,
    "updatedAt": "2021-02-21T10:26:50.005Z",
    "createdAt": "2021-02-21T10:26:50.005Z"
  }
]
```

_Error (500)_

```
{
    "errorCode": "Internal server error",
    "message": "Unexpected error."
}
```

---

### GET /products/:id

> Get single product as defined by the id provided

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
{
    "id": 2,
    "name": "Product 2",
    "image_url": "https://dummyimage.com/150x150/000/fff&text=Item",
    "price": 10000,
    "stock": 10,
    "updatedAt": "2021-02-21T10:26:50.005Z",
    "createdAt": "2021-02-21T10:26:50.005Z"
}
```

_Error (404)_

```
{
"errorCode": "Not Found",
"message": "Requested product was not found"
}
```

---

### POST /products

> Create new product

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "name": "<user input>",
    "image_url: "<user input>"
    "price": <user input>,
    "stock": <user input>,
}
```

_Response (201 - Created)_

```
{
    "id": <given id by system>,
    "name": "<posted input>",
    "image_url: "<posted input>"
    "price": <posted input>,
    "stock": <posted input>,
    "updatedAt": "2021-02-13T11:18:19.372Z",
    "createdAt": "2021-02-13T11:18:19.372Z"
}
```

---

### PUT /products/:id

> Update product defined by the id provided

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
{
    "name": "<user input>",
    "image_url: "<user input>"
    "price": <user input>,
    "stock": <user input>,
}
```

_Response (200 - OK)_

```
{
    "id": <given id by system>,
    "name": "<posted input>",
    "image_url: "<posted input>"
    "price": <posted input>,
    "stock": <posted input>,
    "updatedAt": "2021-02-13T11:18:19.372Z",
    "createdAt": "2021-02-13T11:18:19.372Z"
}
```

_Error (404)_

```
{
"errorCode": "Not Found",
"message": "Requested product was not found"
}
```

---

### DELETE /products/:id

> Delete product defined by the id provided

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

_Response (200 - OK)_

```
{
    "id": <given id by system>,
    "name": "<posted input>",
    "image_url: "<posted input>"
    "price": <posted input>,
    "stock": <posted input>,
    "updatedAt": "2021-02-13T11:18:19.372Z",
    "createdAt": "2021-02-13T11:18:19.372Z"
}
```

_Error (404)_

```
{
"errorCode": "Not Found",
"message": "Requested product was not found"
}
```

---

### POST /login

> Login User

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email": "<user input>",
    "password": "<user input>",
}
```

_Response (200 - OK)_

```
{
    "access_token": <given access token by system>,
    "id" : 1
    "email": "admin@mail.com",
}
```

---

### POST /signin

> Login User

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email": "<user input>",
    "password": "<user input>",
}
```

_Response (200 - OK)_

```
{
    "access_token": <given access token by system>,
    "id" : 2
    "email": "customer@mail.com",
}
```

---

### POST /register

> Register User

_Request Header_

```
not needed
```

_Request Body method 1 : for admin_

```
{
    "email": "<user input>",
    "password": "<user input>",
    "role": "Admin"
}
```
_Request Body method 2 : for customer_

```
{
    "email": "<user input>",
    "password": "<user input>"
}
```

_Response (201 - Created)_

```
{
    "access_token": <given access token by system>,
    "id": <given id by system>,
    "email": "<posted input>",
}
```