# ChatMe

[Frontend Repository:](https://github.com/BulletToothTony/chat-app-frontend)

Developed by **Henry Westhoff-Lewis**

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Authentication](#authentication)
- [API Routes](#api-routes)

## About The Project

This is a full-stack MERN messaging application which allows users to send messages to each another in private. User can sign up, sign in, see all users, add users, chat 1-on-1 and update their profile. The application allows users to CREATE, READ, UPDATE and DELETE after authentication.


### Key Features

#### Real-time chat
The app allows users to chat privately, when a user adds a friend a request will be made to the DB creating a chat. When users send a chat message to each other the message will be stored in their private chat and will update the front-end. Only authenticated user's will be able to send chat messages and view their friends.

#### JWT-based Authentication and Authorization
The ChatMe app implements JWT-based authentication and authorisation. This approach allows users to securely authenticate and access protected resources. When a user logs in, the server issues a JSON Web Token (JWT). This token is used to authenticate subsequent requests to protected routes. The token is signed with a passcode on creation and is sent from the front end with the headers.

#### User creation
The users are created based on a model on the backend which is connected to mongoDB using mongoose. Users passwords are encrypted and hashed using bcrypt before being stored on the server. No one with access to the DB can view the passwords in plaintext as they are encrypted before being stored.

#### Profile Management
The API allows user to update their profile when logged in. The user can change their email, username and password which will update the DB. Email and username changes are shown on the user profile and in the chat messages.

#### Integration with Frontend Client
The backend API integrates seamlessly with the frontend client, allowing requests to easily be made to the different routes allowing a fast and interactive experience for the user. The DB used is MongoDB allowing for real time updates whenever a request is made.


## Built With

##### - MongoDB
##### - Express.js
##### - Node.js

## Authentication

Add routes here
