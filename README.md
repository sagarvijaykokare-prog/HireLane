# HireLane -- Job Portal (Microservices Architecture)

HireLane is a full-stack job portal application that connects job
seekers with job opportunities. It is built with a **Next.js frontend**
and a **Spring Boot microservices backend**. The backend uses service
discovery, an API Gateway, JWT-based authentication, and separate
databases for individual services.

> **Project status:** Core services and frontend integration have been
> implemented. Complete the remaining integration tests and review the
> security notes before treating the application as production-ready.

## Features

### Job seeker

-   Register and log in.
-   Browse available jobs.
-   Submit a job application.
-   View application information.
-   Create, view, update, and delete a profile.
-   Add phone, location, bio, skills, experience, and a resume URL to a
    profile.

### Administrator

-   Create job postings.
-   View, update, and delete job postings.
-   Access application-management functionality according to configured
    permissions.

### Platform

-   Microservices-based backend.
-   Central API Gateway.
-   Eureka service discovery.
-   JWT-based authentication.
-   Role-based authorization using `ROLE_USER` and `ROLE_ADMIN`.
-   Separate MySQL database per business service.
-   Flyway database migrations.

## Architecture

``` text
                         Next.js Frontend
                         http://localhost:3000
                                  |
                                  | HTTP + Bearer JWT
                                  v
                         API Gateway :8080
                                  |
             +--------------------+--------------------+
             |                    |                    |
             v                    v                    v
        Auth Service         Job Service        Application Service
           :8088                :8082                 :8083
             |                    |                    |
          auth_db               job_db           application_db

                      Profile Service :8084
                              |
                          profile_db

                 Eureka Discovery Server :8761
```

Each service registers with Eureka. The API Gateway routes requests to
services using service names such as `lb://auth-service`.

## Technology Stack

### Frontend

-   Next.js
-   React
-   JavaScript
-   Axios
-   Tailwind CSS
-   Lucide React

### Backend

-   Java 21
-   Spring Boot
-   Spring Security
-   Spring Cloud Gateway (Server WebMVC)
-   Spring Cloud Netflix Eureka
-   Spring Data JPA / Hibernate
-   MySQL
-   Flyway
-   JWT with RSA signing and validation
-   Maven

## Services and Ports

  Component               Default port Database
  --------------------- -------------- ------------------
  Eureka Server                 `8761` ---
  API Gateway                   `8080` ---
  Auth Service                  `8088` `auth_db`
  Job Service                   `8082` `job_db`
  Application Service           `8083` `application_db`
  Profile Service               `8084` `profile_db`
  Next.js Frontend              `3000` ---

Confirm the actual ports and database names in each service's
`application.properties`.

## API Endpoints

The frontend calls the backend through the API Gateway at
`http://localhost:8080`.

### Auth Service

  Method   Endpoint               Purpose
  -------- ---------------------- -----------------
  POST     `/api/auth/register`   Register a user
  POST     `/api/auth/login`      Log in

### Job Service

  Method   Endpoint                 Purpose
  -------- ------------------------ ---------------
  POST     `/api/job/create`        Create a job
  GET      `/api/job/read`          Read all jobs
  PUT      `/api/job/update/{id}`   Update a job
  DELETE   `/api/job/delete/{id}`   Delete a job

### Application Service

  ------------------------------------------------------------------------------------------------
  Method                  Endpoint                                         Purpose
  ----------------------- ------------------------------------------------ -----------------------
  POST                    `/api/application/apply`                         Apply for a job

  GET                     `/api/application/data`                          Retrieve applications

  PUT                     `/api/application/{id}/status?status={status}`   Update application
                                                                           status

  DELETE                  `/api/application/delete/{id}`                   Delete an application
  ------------------------------------------------------------------------------------------------

**Note:** The current `GET /api/application/data` controller returns the
application list. User-specific filtering and authorization must be
enforced by the backend before exposing private application data.

### Profile Service

  Method   Endpoint                     Purpose
  -------- ---------------------------- --------------------
  POST     `/api/profile?userId={id}`   Create a profile
  GET      `/api/profile?userId={id}`   Retrieve a profile
  PUT      `/api/profile?userId={id}`   Update a profile
  DELETE   `/api/profile?userId={id}`   Delete a profile

The current Profile Controller requires the `userId` query parameter for
all four operations.

## Prerequisites

Install: - Java Development Kit (JDK) 21 - Maven, or use the Maven
Wrapper included with each backend service - Node.js and npm - MySQL
Server - Git

## Getting Started

### 1. Clone the repository

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>
```

If frontend and backend are in separate repositories, clone each
repository separately and follow its setup instructions.

### 2. Create MySQL databases

Create the databases used by the services:

``` sql
CREATE DATABASE auth_db;
CREATE DATABASE job_db;
CREATE DATABASE application_db;
CREATE DATABASE profile_db;
```

Use the exact database names configured in each service's properties
file.

### 3. Configure backend services

For each Spring Boot service:

1.  Open `src/main/resources/application.properties`.
2.  Configure the MySQL URL, username, and password.
3.  Verify the server port and Eureka URL.
4.  Configure JWT key locations where required.
5.  Keep credentials and private keys out of Git.

Example database configuration:

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Set the environment variables in your operating system or IDE run
configuration. Do not commit real passwords.

### 4. Configure JWT keys

The Auth Service signs JWTs using its RSA private key. The API Gateway
validates JWTs using the matching public key.

-   Keep the private key only in secure Auth Service configuration.
-   Provide the matching public key to the Gateway.
-   Never commit the private key or production secrets to GitHub.

### 5. Start backend services

Start services in this order:

1.  Eureka Server
2.  Auth Service
3.  Job Service
4.  Application Service
5.  Profile Service
6.  API Gateway

Wait for each service to start and register with Eureka. Open the Eureka
dashboard:

``` text
http://localhost:8761
```

Confirm that the expected services are registered.

## Frontend Setup

Open a terminal in the frontend project directory:

``` bash
cd job-portal-frontend
npm install
```

Create `.env.local` in the frontend root:

``` env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

Start the development server:

``` bash
npm run dev
```

Open `http://localhost:3000`.

For a production build:

``` bash
npm run build
npm start
```

## Backend Configuration

Each service should have its own configuration for: - Application name -
Server port - MySQL connection - Flyway migrations - Eureka client URL -
JWT settings, where applicable

Example Eureka client configuration:

``` properties
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
```

The API Gateway routes requests using service-discovery routes similar
to:

``` properties
spring.cloud.gateway.server.webmvc.routes[0].id=auth-service
spring.cloud.gateway.server.webmvc.routes[0].uri=lb://auth-service
spring.cloud.gateway.server.webmvc.routes[0].predicates[0]=Path=/api/auth/**
```

Other routes follow the same pattern for `/api/job/**`,
`/api/application/**`, `/api/profile/**`, and `/api/admin/**`.

## Authentication and Authorization

1.  A user registers and logs in through the Auth Service.
2.  The Auth Service issues a signed JWT.
3.  The frontend sends the token in the request header:

``` http
Authorization: Bearer <JWT_TOKEN>
```

4.  The API Gateway validates the token using the configured RSA public
    key.
5.  Authorization rules use authorities included in the JWT, such as
    `ROLE_USER` and `ROLE_ADMIN`.

The exact public endpoints and role permissions are defined in the API
Gateway security configuration.

## Database Design

Each microservice owns its data:

-   `auth_db` -- user and authentication-related data.
-   `job_db` -- job postings.
-   `application_db` -- job applications.
-   `profile_db` -- job seeker profile information.

Flyway manages schema changes through versioned migration scripts. Keep
migrations under each service's `src/main/resources/db/migration`
directory.

## Testing

Recommended manual test flow:

1.  Start MySQL and all backend services.
2.  Confirm service registration in Eureka.
3.  Register a user and log in.
4.  Confirm the frontend sends the JWT in the `Authorization` header.
5.  Browse jobs and test job CRUD operations with the appropriate role.
6.  Submit an application and test application retrieval and status
    updates.
7.  Create, retrieve, update, and delete a profile.
8.  Verify that unauthorized requests are rejected.

Use Postman or another API client to test individual endpoints through
the Gateway.

## Important Security Notes

-   Do not commit passwords, API secrets, JWT private keys, or real
    environment files.
-   Add `.env`, `.env.local`, private key files, and IDE-specific files
    to `.gitignore` as appropriate.
-   The current Profile Controller accepts `userId` from a query
    parameter. For production, derive the user identity from the
    verified JWT instead of trusting a client-supplied ID.
-   The Application Service must enforce user-specific access on the
    backend. Client-side filtering is not an authorization mechanism.
-   Ensure internal microservice ports are not publicly exposed in
    production; route external traffic through the Gateway.
-   Use HTTPS in production.
-   Review CORS allowed origins and replace local development origins
    with the deployed frontend origin.

## Future Improvements

-   Derive the authenticated user ID from JWT claims in protected
    services.
-   Enforce user-specific application access on the backend.
-   Add automated unit and integration tests.
-   Add resume file upload and secure storage.
-   Add pagination, filtering, and job search.
-   Add centralized logging, monitoring, and production deployment
    configuration.
-   Consider refresh-token handling and token revocation.

## Author

**Sagar Vijay Kokare**

-   GitHub:
    [sagarvijaykokare-prog](https://github.com/sagarvijaykokare-prog)
-   LinkedIn: [Sagar
    Kokare](https://www.linkedin.com/in/sagar-kokare-3052a4388/)

------------------------------------------------------------------------

If you find a problem or have a suggestion, feel free to open an issue
or submit a pull request.
