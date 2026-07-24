# 💬 Design and Performance Analysis of a Microservices-Based Real-Time Chat Application Using the MERN Stack, Socket.IO, and Redis


<p align="center">
  <img src="screenshots/banner.png" alt="Real Time Chat Application Banner" width="900"/>
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
