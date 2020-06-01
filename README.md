# AMP-TODO

## Requirements

This application has been tested to run on :
- Node version: v10.19.0
- NPM version: 6.14.4
- MongoDB version: 4.2.7
- React version: 16.13.1

## How to Run

If you are using a distribution that supports the apt-get command, simply running the setup.sh script would install all dependencies and run the application.

However, if you are on Mac or Windows. Running under the assumption that you have Node, NPM and MongoDB installed please run the command below in the root folder to install all dependencies and run the application
```
npm run complete-install-run 
```
alternatively run the next command in the root folder to run the application if all dependencies have been installed
```
npm run dev
```

The application automatically creates a default account for usage with the following details:

- email: randomemail@gmail.com
- password: test

## Available Scripts

In the project directory, you can run:

### `setup.sh`
```diff
- This script only works on linux distros that use the APT (Advanced Package Tool e.g Ubuntu)
```
This script will make sure that npm && node are installed and ensure that all dependenices are downloaded and installed as well as run the react frontend and express backend

### `npm run dev`

Runs the react app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Runs the express app.<br />
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run complete-install-run`

Download and install all npm dependencies as well as run the application
