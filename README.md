# Renart Karat - Test Case

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Overview

Karat is a sophisticated jewelry e-commerce platform that provides users with an elegant shopping experience. The application features a UI/UX design, authentication, product filtering & fetching, shopping cart functionality, dynamic Gold Price fetching and caching, and multi-language support via i18n.

## App Preview

<img width="1700" height="907" alt="renart-4" src="https://github.com/user-attachments/assets/3795c854-b179-416a-ad8a-0a4643997156" />
<img width="1710" height="904" alt="renart-1" src="https://github.com/user-attachments/assets/b94fbe65-fcbd-402b-8a58-421e5325efc1" />
<img width="1710" height="902" alt="renart-2" src="https://github.com/user-attachments/assets/33043686-5955-44f7-8f9f-0e915bac1425" />
<img width="1710" height="906" alt="renart-3" src="https://github.com/user-attachments/assets/68bd981a-f34f-464d-80dd-09ccf10e8257" />

## Database PostgreSQL with Supabase

### I have inserted the provided JSON object of products with SQL query directly into the database and then fetching those from the client.

![SQL](https://github.com/user-attachments/assets/ccfddd8c-5632-49df-bda0-94a59d23dbc7)

## Features

### **E-Commerce Functionality**
- **Product Catalog**: Browse jewelry catalog
- **Filtering**: Filter by price range, popularity, and search functionality
- **Shopping Cart**: Add/remove items with persistent storage

### **Authentication & User Management**
- **Supabase Authentication**: Secure login/logout with email verification via **Supabase**
- **User Profiles**: Personal information management and account details
- **Protected Routes**: Secure access to user-specific features
- **Session Management**: Persistent login state across browser sessions

### **Internationalization**
- **Multi-Language Support**: English and Turkish translations
- **Dynamic Language Switching**: Seamless language transitions
- **Localized Content**: Complete UI translation coverage

### **Deployment Configuration**
- **Frontend**: Automatically deployed via Vercel GitHub integration
- **Backend**: Containerized deployment on Railway
- **Database**: Supabase PostgreSQL 

## Simple Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React + TS)  │◄──►│   (NestJS)      │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                      │
         │              ┌─────────────────┐             │
         └─────────────►│   Supabase      │◄────────────┘
                        │   (Auth + DB)   │
                        └─────────────────┘
```
