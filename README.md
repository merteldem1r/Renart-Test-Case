# Renart - Karat | Test Case

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Overview

Karat is a sophisticated jewelry e-commerce platform that provides users with an elegant shopping experience. The application features a modern UI/UX design, secure authentication, advanced product filtering, shopping cart functionality, and multi-language support.

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