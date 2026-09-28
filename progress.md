# Daily Progress — Go Backend & Database

## Date

28 September 2026

## 1. What I Worked on Today

Today, I started developing the **backend of the project using Go (Golang)**.

My main focus was on:

* Setting up the Go backend structure.
* Creating the initial backend files.
* Connecting the Go application with the database.
* Creating the required database structure.
* Storing data from the Go backend into the database.
* Testing whether the data was successfully inserted and retrieved.

---

## 2. What I Learned

Today I learned:

* How to structure a Go backend project.
* How a backend communicates with a database.
* How to establish a database connection from Go.
* How to create database operations such as insert and retrieve.
* How data flows from the API → Go backend → database.
* How to handle database errors in Go.
* How to test backend functionality using API requests.
* The importance of separating database logic from the main application logic.

### Basic Backend Flow

```text
Client / Frontend
       ↓
    API Request
       ↓
   Go Backend
       ↓
 Database Connection
       ↓
    Database
```

---

## 3. What I Implemented

I started creating the Go backend with files similar to:

```text
backend/
├── main.go
├── go.mod
├── database/
│   └── database.go
├── models/
│   └── user.go
└── handlers/
    └── user.go
```

### `main.go`

Created the main entry point for the Go backend.

```go
package main

import "fmt"

func main() {
    fmt.Println("Go backend server started")
}
```

### Sample Output

```text
Go backend server started
```

---

### Database Connection

Created a separate database file to handle the database connection.

```text
database/database.go
```

The database connection logic was kept separately so that it can be reused by different backend components.

---

### Data Model

Created a model to represent the data that needs to be stored.

```text
models/user.go
```

For example:

```go
type User struct {
    ID    int
    Name  string
    Email string
}
```

---

### Data Storage

Implemented the basic database operation to store user/data information.

The basic flow was:

```text
Input Data
    ↓
Go API
    ↓
Handler
    ↓
Database Function
    ↓
INSERT Query
    ↓
Database
```

After sending the data, I verified that the record was successfully stored in the database.

---

## 4. How I Implemented It

I first created the Go backend project and initialized the Go module.

```bash
go mod init backend
```

Then I created separate folders for the database, models, and handlers.

I configured the database connection in the database package and used the connection inside the backend logic.

I then created the required data model and implemented the database insertion logic.

Finally, I tested the backend and checked the database to confirm that the submitted data was stored correctly.

---

## 5. Problems / Errors Faced

I faced some issues while connecting the Go backend with the database:

* Understanding the database connection configuration.
* Understanding how Go communicates with the database.
* Handling database connection errors.
* Understanding where database queries should be placed in the project structure.
* Fixing syntax and import-related errors while creating the backend files.

---

## 6. How I Solved Them

I solved the issues by:

* Checking the database configuration carefully.
* Separating database connection logic into its own package.
* Reading the Go compiler error messages.
* Testing the database connection before implementing the complete functionality.
* Testing the insert operation with sample data.
* Checking the database directly after inserting the data.
* Keeping the backend code modular instead of putting everything inside `main.go`.

---

## 7. What I Plan to Work on Next

Next, I plan to continue developing the Go backend by working on:

* Creating proper REST API endpoints.
* Implementing `GET`, `POST`, `PUT`, and `DELETE` operations.
* Connecting the API with the database.
* Adding request and response handling.
* JSON encoding and decoding.
* Input validation.
* Better error handling.
* Testing the APIs using Postman.
* Connecting the frontend with the Go backend.

### Next Goal

```text
Frontend
   ↓
REST API
   ↓
Go Backend
   ↓
Database
```

The main goal is to complete a working **Go REST API with database integration**.
