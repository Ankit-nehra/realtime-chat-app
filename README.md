# 💬 Design and Performance Analysis of a Microservices-Based Real-Time Chat Application Using the MERN Stack, Socket.IO, and Redis


<p align="center">
  <img src="./screenshorts\banner.jpg" alt="Real Time Chat Application Banner" width="900"/>
</p>


<p align="center">
A scalable real-time communication platform designed and implemented using the MERN Stack, Socket.IO, and Microservices Architecture with a focus on performance, scalability, and efficient message delivery.
</p>


<p align="center">

![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express.js-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black)
![Architecture](https://img.shields.io/badge/Architecture-Microservices-orange)
![Redis](https://img.shields.io/badge/Scaling-Redis-red)

</p>


---

# 📑 Table of Contents

- [Abstract](#-abstract)
- [Introduction](#-introduction)
- [Project Objectives](#-project-objectives)
- [System Architecture](#-system-architecture)
- [Microservices Overview](#-microservices-overview)
- [Application Workflow](#-application-workflow)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Real-Time Communication Architecture](#-real-time-communication-architecture)
- [Database Design](#-database-design)
- [Performance Analysis](#-performance-analysis)
- [Screenshots](#-screenshots)
- [Installation and Setup](#-installation-and-setup)
- [Environment Configuration](#-environment-configuration)
- [API Documentation](#-api-documentation)
- [Future Enhancements](#-future-enhancements)
- [Conclusion](#-conclusion)
- [Author](#-author)


---

# 📖 Abstract


Modern real-time communication applications require low latency, high availability, and scalable architectures to support increasing numbers of concurrent users.

This dissertation project presents the design and implementation of a:

> **"Design and Performance Analysis of a Microservices-Based Real-Time Chat Application Using the MERN Stack, Socket.IO, and Redis"**


The developed system is a real-time chat platform that enables users to communicate instantly through a distributed microservices architecture.

Unlike traditional monolithic applications, this system separates major functionalities into independent services:

- Authentication Service
- User Management Service
- Chat Service
- Real-Time Communication Service


The application uses:

- **MongoDB** for persistent data storage
- **Express.js and Node.js** for backend services
- **React.js** for frontend development
- **Socket.IO** for real-time bidirectional communication
- **Microservices Architecture** for scalability and maintainability
- **Redis concepts** for future distributed real-time scaling


The proposed architecture improves:

- Service independence
- Fault isolation
- Scalability
- Maintainability
- Real-time performance


---

# 🚀 Introduction


Real-time messaging applications have become an essential part of modern digital communication systems.

Traditional monolithic architectures often face challenges when the number of users increases, including:

- Difficult maintenance
- Limited scalability
- Tight coupling between modules
- Performance bottlenecks


To overcome these limitations, this project implements a **microservices-based real-time chat application** where each major functionality is developed as an independent service.


The system follows an **API Gateway architecture**, where the frontend communicates with a centralized gateway that manages communication with individual backend services.


The application allows users to:

- Register and authenticate securely
- View available users
- Check online/offline status
- Exchange instant messages
- Receive real-time notifications


The project focuses on analyzing how microservices combined with WebSocket-based communication can improve the performance and scalability of real-time applications.


---

# 🎯 Project Objectives


The primary objectives of this dissertation implementation are:


## 1. Design Microservices Architecture

To develop a distributed architecture by dividing application responsibilities into independent services.


Benefits:

- Better scalability
- Easier maintenance
- Independent service deployment
- Improved fault tolerance


---

## 2. Implement Real-Time Communication


To provide instant communication between users using Socket.IO.


The system supports:

- Persistent socket connections
- Instant message delivery
- Online user tracking
- Real-time notifications


---

## 3. Analyze System Performance


To study performance factors affecting real-time applications:

- Message delivery latency
- Service response time
- Concurrent user handling
- Resource utilization


---

## 4. Improve Scalability


The architecture is designed to support future scaling using:

- Redis Pub/Sub
- Multiple Socket.IO instances
- Load balancing


---

## 5. Implement Secure Authentication


The authentication system provides:

- User registration
- Login functionality
- JWT-based authentication
- Password encryption using bcrypt


---

# 🏗 System Architecture


<p align="center">

<img src="screenshots/system-architecture.png" width="900"/>

</p>


The complete system follows a microservice-based architecture:


```
                         USER

                          |

                          |

                  React Frontend

                          |

                          |

                   API Gateway

                          |

     ------------------------------------------------

     |                 |                 |          |

     ▼                 ▼                 ▼          ▼


 Auth Service     User Service     Chat Service   Real-Time

                                                   Service


     |                 |                 |

     ------------------------------------------------

                          |

                          ▼


                    MongoDB Database



                          +

                          |

                    Socket.IO Layer


                          |

                          ▼


                 Real-Time Communication

```

---

# 🔹 Microservices Overview


The application consists of five independent backend components:


```
1. API Gateway Service

2. Authentication Service

3. User Service

4. Chat Service

5. Real-Time Service
```


---

## 1. API Gateway Service


The API Gateway acts as the entry point between the frontend application and backend microservices.


### Responsibilities:

- Receive client requests
- Forward requests to required services
- Hide internal service communication
- Centralize API access


Technologies:

```
Node.js
Express.js
Axios
```


---

## 2. Authentication Service


The Authentication Service manages user identity and security.


### Responsibilities:

- User registration
- User login
- Password encryption
- JWT token generation
- User validation


Security technologies:

```
JWT
bcrypt
MongoDB
```


---

## 3. User Service


The User Service manages user-related operations.


Responsibilities:

- Fetch registered users
- Provide user information
- Support user discovery


---

## 4. Chat Service


The Chat Service manages message persistence.


Responsibilities:

- Send messages
- Store messages
- Retrieve previous conversations


Message storage example:


```json
{
    "senderId": "user_id",
    "receiverId": "user_id",
    "message": "Hello",
    "createdAt": "timestamp"
}
```


---

## 5. Real-Time Service


The Real-Time Service handles all Socket.IO operations.


Responsibilities:

- Maintain active connections
- Track online users
- Deliver messages instantly
- Generate notifications


Implemented Socket.IO events:


```
join

activeChat

sendMessage

receiveMessage

newNotification

disconnect
```
---

# 🔄 Application Workflow


<p align="center">

<img src="screenshots/application-workflow.png" width="850"/>

</p>


The complete user journey of the application:


```
                User Opens Application

                         |

                         ▼

                  Welcome Page

                         |

             ----------------------

             |                    |

             ▼                    ▼

          Login              Register

             |                    |

             ----------------------

                         |

                         ▼

                    Home Page

                         |

                         ▼

              Fetch Registered Users

                         |

                         ▼

              Display Online Status

                         |

                         ▼

              Select User To Chat

                         |

                         ▼

                    Chat Page

                         |

                         ▼

          Real-Time Message Exchange

                         |

                         ▼

              Notification Handling

```


---

# ✨ Features


## 🔐 Authentication System


The application provides a secure authentication mechanism.


Implemented features:


✅ User Registration

- New users can create accounts
- User information is stored securely


✅ User Login

- Existing users can authenticate
- JWT token is generated after successful login


✅ Password Security

- Passwords are encrypted using bcrypt before storing in database


✅ Protected Routes

- Unauthorized users cannot access private pages


---

# 👥 User Management


The home page provides complete user visibility.


Features:


✅ View Registered Users

Users can see all available registered students/users.


✅ Search Users

Users can search other users using the search functionality.


✅ Online/Offline Status

Real-time availability status is displayed using Socket.IO.


Example:


```
🟢 Online

⚫ Offline
```


---

# 💬 Real-Time Chat System


The core functionality of the application is real-time communication.


Features:


✅ One-to-One Messaging

Users can communicate privately with another user.


✅ Instant Message Delivery

Messages are delivered immediately using Socket.IO.


✅ Message Persistence

All messages are stored in MongoDB through the Chat Service.


✅ Chat History

Previous conversations can be retrieved when users open a chat.


---

# 🔔 Notification System


The application implements a real-time notification mechanism.


Scenario:


```
User A sends message to User B

            |

            ▼

User B is online but not inside chat page

            |

            ▼

Realtime Service detects inactive chat

            |

            ▼

Notification generated

            |

            ▼

User B receives message alert

```


Benefits:


- Users do not miss incoming messages
- Improves user experience
- Provides real-time awareness


---

# 🟢 Online User Tracking


The Real-Time Service maintains active user information.


Process:


```
User Login

    |

    ▼

Socket Connection Created

    |

    ▼

Join Event Triggered

    |

    ▼

User Added To Online Map

    |

    ▼

Online User List Broadcasted

```


The system maintains:


```
User ID

Socket ID

Username

Connection Time
```


---

# 🛠 Technology Stack


## Frontend Technologies


| Technology | Purpose |
|------------|---------|
| React.js | User interface development |
| Vite | Frontend build tool |
| Tailwind CSS | UI styling |
| React Router | Page navigation |
| Axios | API communication |
| React Hot Toast | Notifications |
| Socket.IO Client | Real-time communication |


---

## Backend Technologies


| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | REST API development |
| Socket.IO | WebSocket communication |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcrypt | Password encryption |
| Axios | Service communication |


---

## Architecture Technologies


| Technology | Purpose |
|------------|---------|
| Microservices | Independent service design |
| API Gateway | Centralized request routing |
| Redis | Future distributed socket scaling |
| REST API | Service communication |
| WebSocket | Real-time messaging |


---

# 📂 Project Structure


The project follows a distributed microservice structure:


```
Real-Time-Chat-Application
│
│
├── frontend
│   │
│   ├── src
│   │   ├── api
│   │   ├── pages
│   │   ├── socket
│   │   ├── App.jsx
│   │   └── main.jsx
│
│
├── api-gateway
│   │
│   ├── routes
│   ├── proxy
│   └── server.js
│
│
├── auth-service
│   │
│   ├── controllers
│   ├── services
│   ├── models
│   ├── routes
│   └── server.js
│
│
├── user-service
│   │
│   ├── controllers
│   ├── services
│   ├── models
│   └── server.js
│
│
├── chat-service
│   │
│   ├── controllers
│   ├── services
│   ├── models
│   └── server.js
│
│
└── realtime-service
    │
    ├── sockets
    ├── utils
    └── server.js

```


---

# ⚡ Real-Time Communication Architecture


<p align="center">

<img src="screenshots/socket-flow.png" width="850"/>

</p>


The application uses Socket.IO for low-latency bidirectional communication.


Communication flow:


```
Sender User

     |

     |

sendMessage Event

     |

     |

Realtime Service

     |

     |

Receiver Socket Connection

     |

     |

receiveMessage Event

     |

     |

Message Displayed

```


---

# 🔌 Socket.IO Events


## join


Used when a user connects.


```javascript
socket.emit(
    "join",
    userId,
    username
);
```


Purpose:

- Register online user
- Maintain active connection


---

## activeChat


Tracks current conversation.


```javascript
socket.emit(
    "activeChat",
    {
       userId,
       chatUserId
    }
);
```


Purpose:

- Detect whether receiver is inside chat page


---

## sendMessage


Triggered when a user sends a message.


```javascript
socket.emit(
    "sendMessage",
    messageData
);
```


---

## receiveMessage


Triggered when receiver receives a message.


```javascript
socket.on(
    "receiveMessage",
    message
);
```


---

## newNotification


Triggered when user receives a message outside active chat.


```javascript
socket.on(
    "newNotification",
    notification
);
```


---

# 🗄 Database Design


The system uses MongoDB for data persistence.


---

# User Collection


Database:

```
users
```


Schema:


```json
{
    "_id": "ObjectId",
    "name": "John",
    "email": "john@gmail.com",
    "password": "encrypted_password",
    "createdAt": "timestamp"
}

```


---

# Message Collection


Database:

```
messages
```


Schema:


```json
{
    "_id": "ObjectId",
    "senderId": "user_id",
    "receiverId": "user_id",
    "message": "Hello",
    "createdAt": "timestamp"
}

```


---

# 📊 Performance Analysis


The dissertation focuses on analyzing important performance factors of real-time systems.


## 1. Communication Latency


Socket.IO reduces communication delay by maintaining persistent connections.


Traditional HTTP:


```
Request

   |

Server Processing

   |

Response

```


Socket Communication:


```
Persistent Connection

        |

Instant Event Transfer

```


Benefits:

- Lower latency
- Faster message delivery
- Better user experience


---

## 2. Microservice Scalability


Microservices allow individual services to scale independently.


Example:


```
High Chat Traffic

        |

        ▼

Scale Chat Service Only


```


Advantages:

- Efficient resource usage
- Independent deployment
- Better fault isolation


---

## 3. Redis-Based Future Scaling


For large-scale deployment, Redis can be integrated with Socket.IO.


Architecture:


```
        Client Connections


              |

              ▼


      Multiple Socket Servers


              |

              ▼


          Redis Pub/Sub


              |

              ▼


   Synchronized Real-Time State

```


Redis helps with:


- Distributed socket communication
- Shared online user state
- Multi-server message broadcasting
- Faster caching


---
---

# 📸 Screenshots


Add your application screenshots inside the `screenshots` folder.


Recommended structure:


```
screenshots

│
├── banner.png
├── system-architecture.png
├── application-workflow.png
├── socket-flow.png
│
├── welcome.png
├── login.png
├── register.png
├── home.png
├── chat.png
└── notification.png

```


---

## 🏠 Welcome Page


<p align="center">

<img src="screenshots/welcome.png" width="850"/>

</p>


The welcome page is the entry point of the application.

Users can navigate to:

- Login
- Register


---

## 🔐 Login Page


<p align="center">

<img src="screenshots/login.png" width="850"/>

</p>


The login page authenticates existing users and provides secure access to the application.


---

## 📝 Register Page


<p align="center">

<img src="screenshots/register.png" width="850"/>

</p>


New users can create an account using the registration system.


---

## 🏡 Home Page


<p align="center">

<img src="screenshots/home.png" width="850"/>

</p>


The home page displays:

- Registered users
- Online/offline status
- Search functionality
- Unread message count


---

## 💬 Chat Page


<p align="center">

<img src="screenshots/chat.png" width="850"/>

</p>


The chat interface provides:

- Real-time messaging
- Message history
- Instant communication


---

## 🔔 Notification System


<p align="center">

<img src="screenshots/notification.png" width="850"/>

</p>


Notifications are generated when:

- A user receives a message
- The user is online
- The user is not currently inside the conversation


---

# ⚙️ Installation and Setup


## 1. Clone Repository


```bash
git clone <repository-url>

cd Real-Time-Chat-Application
```


---

# Frontend Setup


Navigate to frontend:


```bash
cd frontend
```


Install dependencies:


```bash
npm install
```


Start development server:


```bash
npm run dev
```


Frontend runs on:


```
http://localhost:5173
```


---

# API Gateway Setup


Navigate:


```bash
cd api-gateway
```


Install packages:


```bash
npm install
```


Run service:


```bash
npm start
```


Default port:


```
5000
```


---

# Authentication Service Setup


```bash
cd auth-service

npm install

npm start
```


Port:


```
5001
```


---

# User Service Setup


```bash
cd user-service

npm install

npm start
```


Port:


```
5002
```


---

# Chat Service Setup


```bash
cd chat-service

npm install

npm start
```


Port:


```
5003
```


---

# Real-Time Service Setup


```bash
cd realtime-service

npm install

npm start
```


Port:


```
5004
```


---

# 🌐 Service Communication


```
Frontend

    |

    |

API Gateway : 5000

    |

    |----------------------------

    |             |             |

    ▼             ▼             ▼


Auth         User          Chat

5001         5002          5003



                 +

                 |

                 ▼


          Realtime Service

                 5004

```


---

# 🔑 Environment Configuration


Each backend service requires environment variables.


Create `.env` file:


## Authentication Service


```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```


---

## User Service


```env
PORT=5002

MONGO_URI=your_mongodb_connection_string
```


---

## Chat Service


```env
PORT=5003

MONGO_URI=your_mongodb_connection_string
```


---

## Frontend


Create:


```
.env
```


Example:


```env
VITE_API_URL=http://localhost:5000
```


---

# 📚 API Documentation


## Authentication APIs


### Register User


```
POST /api/auth/register
```


Request:


```json
{
    "name":"John",
    "email":"john@gmail.com",
    "password":"123456"
}
```


Response:


```json
{
    "user":{},
    "token":"jwt_token"
}

```


---

## Login User


```
POST /api/auth/login
```


Request:


```json
{
    "email":"john@gmail.com",
    "password":"123456"
}

```


---

# User APIs


## Get All Users


```
GET /api/users
```


Response:


```json
[
 {
    "_id":"123",
    "name":"John",
    "email":"john@gmail.com"
 }
]

```


---

# Chat APIs


## Send Message


```
POST /api/chat/send
```


Request:


```json
{
 "senderId":"user1",
 "receiverId":"user2",
 "message":"Hello"
}

```


---

## Get Conversation


```
GET /api/chat/messages
```


Query:


```
user1=userId

user2=userId
```


---

# Real-Time API


Health Check:


```
GET /api/realtime/health
```


Response:


```json
{
 "status":"Realtime service running"
}

```


---

# 🚀 Deployment Architecture


The deployed architecture follows:


```
                 Users


                  |

                  |


            React Frontend


                  |

                  |


            API Gateway


                  |

 ------------------------------------------------

 |              |              |                |


Auth         User           Chat          Realtime

Service     Service       Service         Service



                  |

                  |

              MongoDB


                  |

                  |

              Redis Layer

          (Future Scaling)

```


---

# 🔮 Future Enhancements


The current system provides a strong foundation for further improvements.


Future improvements:


## Redis Integration

- Socket.IO adapter
- Distributed message broadcasting
- Shared online user state


---

## Advanced Messaging Features

- Group conversations
- Message reactions
- Message editing
- Message deletion
- Read receipts


---

## Media Communication

- Image sharing
- File transfer
- Voice messages
- Video calling


---

## Security Improvements

- Refresh tokens
- Two-factor authentication
- End-to-end encryption


---

## Infrastructure Improvements

- Docker containerization
- Kubernetes deployment
- CI/CD pipeline
- Load balancing


---

# ✅ Conclusion


This dissertation project demonstrates the design and implementation of a scalable:

> **Microservices-Based Real-Time Chat Application Using MERN Stack, Socket.IO, and Redis Concepts**


The developed system successfully integrates:

- MERN Stack development
- Microservice architecture
- API Gateway pattern
- Socket.IO real-time communication
- JWT authentication
- MongoDB persistence


The architecture improves:

- Scalability
- Maintainability
- Performance
- Reliability


The project provides a foundation for building enterprise-level real-time communication systems capable of supporting future distributed scaling using technologies such as Redis and cloud-native infrastructure.


---

# 👨‍💻 Author


## Ankit Nehra


Research Dissertation:


**Design and Performance Analysis of a Microservices-Based Real-Time Chat Application Using the MERN Stack, Socket.IO, and Redis**


---

## Connect With Me


GitHub:

```
Your GitHub Profile URL
```


LinkedIn:

```
Your LinkedIn Profile URL
```


---

# ⭐ Support


If you find this project useful, consider giving this repository a ⭐.


Thank you for visiting this project!
