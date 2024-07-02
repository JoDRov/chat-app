# Chat Application

This is a simple chat application built with Node.js, Express, Socket.io and Docker with MongoDB. Users can register, login, send messages, and see messages from all users in real-time.

## Features

-   User registration and login
-   Real-time messaging
-   Persistent message storage
-   Display of current user's username before the message

## Prerequisites

-   Node.js
-   Docker

## Setup

### Clone the Repository

HTTPS:

```bash
git clone https://github.com/JoDRov/chat-app.git
cd chat-app
```

SSH:

```bash
git clone git@github.com:JoDRov/chat-app.git
cd chat-app
```

## Install Dependencies

npm install

## Compiling Typescript

Use the command "tsc" to compile all typescript files found on the src folder, it will create a new folder called dist, and inside that folder we will have all our Javascript files

## Docker and Mongodb config

1. Install docker

2. On the console use the following command: "docker-compose up -d" this command creates a new docker container with MongoDb for our database and starts it in detached mode

3. Make sure the docker container it's running with the following command: "docker ps" this command will show all running containers, if not running you can use this command: "docker start <container_id_or_name>" and it will start the container, to check all your containers use: "docker ps -a"

4. docker exec -it <container_id_or_name> bin/bash

5. apt-get update // update all apt-get packages on the linux machine running on docker

6. apt-get install mongosh // install mongo shell on the linux machine running on docker

7. mongosh -u root -p example // "-u" it's used for username and "-p" it's used for password, this way you can log into mongo's datgabase using mongosh

## Run the application

-   Use the command: "npm run chatapp" to start the program

-   Visit http://localhost:3000/, there you will see a register/login page where you can register a new user and if you log in it will redirect you to the chat page

-   Once loged in you can chat with whoever is connected
