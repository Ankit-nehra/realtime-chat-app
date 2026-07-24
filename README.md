# 💬 Design and Performance Analysis of a Microservices-Based Real-Time Chat Application Using MERN Stack, Socket.IO, and Redis

<p align="center">

<img src="screenshots/banner.png" alt="Real Time Chat Application Banner" width="900"/>

</p>

<p align="center">

A scalable, real-time communication platform developed using **MERN Stack**, **Socket.IO**, and **Microservices Architecture** with a focus on performance, scalability, and efficient message delivery.

</p>


<p align="center">

<img src="https://img.shields.io/badge/Frontend-React.js-blue"/>
<img src="https://img.shields.io/badge/Backend-Node.js-green"/>
<img src="https://img.shields.io/badge/Database-MongoDB-brightgreen"/>
<img src="https://img.shields.io/badge/RealTime-Socket.IO-black"/>
<img src="https://img.shields.io/badge/Architecture-Microservices-orange"/>
<img src="https://img.shields.io/badge/Research-Performance%20Analysis-purple"/>

</p>


---

# 📌 Table of Contents

- [Abstract](#-abstract)
- [Project Overview](#-project-overview)
- [Objectives](#-objectives)
- [System Architecture](#-system-architecture)
- [Microservices Description](#-microservices-description)
- [Application Workflow](#-application-workflow)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Real-Time Communication Flow](#-real-time-communication-flow)
- [Database Design](#-database-design)
- [Performance Considerations](#-performance-considerations)
- [Screenshots](#-screenshots)
- [Installation and Setup](#-installation-and-setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Future Enhancements](#-future-enhancements)
- [Conclusion](#-conclusion)
- [Author](#-author)


---

# 📖 Abstract

Real-time communication systems require low latency, high availability, and scalable architectures to support a large number of concurrent users.

This dissertation project presents the **design and performance analysis of a microservices-based real-time chat application** developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** with **Socket.IO** for bidirectional real-time communication.

The system follows a **microservice architecture**, where authentication, user management, messaging, and real-time communication are separated into independent services.

The architecture improves:
- Scalability
- Maintainability
- Service isolation
- Fault tolerance
- Real-time message delivery performance


---

# 🚀 Project Overview

The application provides a complete real-time chat environment where users can:

- Register an account
- Login securely
- View registered users
- Check online/offline availability
- Start one-to-one conversations
- Exchange real-time messages
- Receive instant notifications


The project implements:

- MERN Stack development
- Microservices architecture
- REST API communication
- Socket.IO based real-time communication
- JWT authentication
- MongoDB persistence
- Notification management


---

# 🎯 Objectives

The main objectives of this research implementation are:

- Design a scalable microservice-based chat architecture
- Implement low-latency real-time communication
- Separate application responsibilities into independent services
- Analyze performance factors affecting real-time systems
- Improve reliability and maintainability
- Provide a foundation for Redis-based scaling


---

# 🏗 System Architecture


<p align="center">

<img src="screenshots/system-architecture.png" width="900"/>

</p>


The system follows an API Gateway based microservices architecture.

