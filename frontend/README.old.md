
# Basic Calorie Calculator - Frontend'

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



## Prerequisites

Ensure that the following tools are installed on your local development machine:

1. **Node.js** (v23.4 or higher)  
   You can download it from [Node.js official site](https://nodejs.org/).

2. **Yarn** (optional but recommended)  
   Yarn is used for package management in this project. You can install it from [Yarn official site](https://classic.yarnpkg.com/lang/en/docs/install/).

3. **React**  
   React is the main library used for the frontend development.

## Getting Started

Follow these steps to install and run the AEHSTweet project locally.

### 1. Clone the repository

Clone the AEHSTweet repository to your local machine:

`git clone https://github.com/javokhirbek1999/basic-calorie-calculator-aeh-40797-41821-41156.git` 

### 2. Install dependencies

Navigate to the project folder and install the required dependencies using Yarn:

`yarn install`

If you don't have Yarn installed, you can use `npm` instead:

`npm install`

### 3. Set up the environment

Before running the app, you may need to configure a few environment variables to connect to the backend API (e.g., `localhost:8000`).

Make sure to clone and run the <a href="https://github.com/javokhirbek1999/basic-calorie-calculator-aeh-40797-41821-41156/tree/main/backend" target="_blank">backend</a>.
Once the backend is running in your `localhost:8000`, you need to set the `API_URL` point to `localhost:8000/api` in `src/api.js`.

### 4. Run the app locally

To run the app locally in development mode, use the following command:

`yarn start`

Or with npm:

`npm start`

The app will open in your default browser at [http://localhost:3000](http://localhost:3000).

### 5. Build for production

To build the app for production (optimized for performance and ready for deployment), run:

`yarn build`

Or with npm:

`npm run build`

This will create a `build` directory with all the compiled files that are ready to be served by a web server.

### 6. Test Offline Capabilities

To test the offline capabilities of the Progressive Web App, follow these steps:

1. Open the app in your browser.
2. Turn off your internet connection.

## Contributing

We welcome contributions! Please fork the repository, create a feature branch, and submit a pull request for any improvements or fixes. Be sure to include tests for any new features or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
