# CMS
Course Management System

This project is a full-stack application developed with Nest.js for the backend and Next.js for the frontend, designed to manage courses and user data. The project is containerized using Docker for easy deployment.

## Backend (Nest.js)

### Project Setup
- Create a `.env` file in the `back` folder and add the following environment variables:

  ```plaintext
  DATABASE_USER=MangoAdmin
  DATABASE_PASS=MangoAdminPass
  
  MONGO_INITDB_ROOT_USERNAME=${DATABASE_USER}
  MONGO_INITDB_ROOT_PASSWORD=${DATABASE_PASS}
  
  JWT_SECRET=Secret_Key
  ```

- Use MongoDB as the database.

### Course Object
- Properties: `id`, `title`, `description`, `instructor`, `schedule`.

## Frontend (Next.js)

### Project Setup
- Create a Next.js project.

### Course Management
- Develop a service to communicate with the API.
- Create pages for listing, viewing, adding.

### Features
- User authentication using JWT.
- Dashboard and filter functionalities for User.
- Responsive design to ensure usability on different screen sizes.

## Simple Usage

## Deployment with Docker

The project is containerized using Docker. To run the project, follow these steps:
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `docker-compose up` to start the application.
4. Visit [http://localhost:3000/](http://localhost:3000/) in your browser.

## Usage


## View && Pagination
![Screen Shot 2024-10-04 at 7 28 55 AM](https://github.com/user-attachments/assets/fc699d68-f9fe-421d-af33-6a9f09c31aa5)
## Create
![Screen Shot 2024-10-04 at 7 27 25 AM](https://github.com/user-attachments/assets/0f0f09ad-d98c-4b85-93ae-729586969af7)
## Auth
![Screen Shot 2024-10-04 at 7 29 21 AM](https://github.com/user-attachments/assets/75836f55-a399-4133-ae3a-7578d3882637)
## Dashboard
![Screen Shot 2024-10-04 at 7 28 48 AM](https://github.com/user-attachments/assets/db1f3adc-1164-427b-ac29-ec9fa33fde04)

---

Feel free to modify any sections or add more details as needed!
