
# Basic Calorie Calculator - Backend

## Overview

<b>Basic Calorie Calculator</b> is a <i>Web App</i> built using <b>React.js</b> and <b>Django REST Framework</b> that allows users to set calorie consumption goals or in general keep track of their calorie consumption and at the same time share it with their friends.

This is the documentation for Backend.

## App Features
- User registration and login
- Send friend requests to different users
- Set calorie consumption goals and keep track of them
- Share their progress with their friends by posting their goal achievements
- Leave coments on other people's posts
- Clean and responsive design


## API Endpoints

### User Registration and Authentication

- `POST /auth/register/`
  - Registers a new user.
  - **Request Body**: 
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
  
- `POST /auth/login/`
  - Login and obtain a JWT token pair.
  - **Request Body**: 
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- `POST /auth/login/refresh/`
  - Refresh the JWT token pair.


## Authentication

The authentication system uses JWT tokens. To get started, make sure to register a user and log in to obtain a token.

**Example login request**:

```bash
curl -X POST http://localhost:8000/auth/login/ -d '{"username": "testuser", "password": "testpassword"}' -H "Content-Type: application/json"
```

**Example tweet creation request**:

```bash
curl -X POST http://localhost:8000/tweets/ -d '{"content": "Hello, world!", "image": upload image file}' -H "Authorization: Bearer <JWT_TOKEN>" -H "Content-Type: application/json"
```

## Running the Backend

To run the Basic Calorie Calculator backend locally:

1. Clone the repository.
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Apply migrations:
    ```bash
    python manage.py migrate
    ```

4. Run the development server:
    ```bash
    python manage.py runserver
    ```

The backend should now be running at `http://localhost:8000`.

## Development

To contribute to the backend:

1. Fork the repository.
2. Create a new branch for your feature:
    ```bash
    git checkout -b feature-name
    ```

3. Make your changes, then commit and push:
    ```bash
    git add .
    git commit -m "Your commit message"
    git push origin feature-name
    ```

4. Create a pull request.

## Students:

1. Javokhirbek Khydaraliev - <b>40797</b>
2. Yuldoshov Shakhzod - <b>41821</b>
3. Asadov Shukrulla  - <b>41156</b>