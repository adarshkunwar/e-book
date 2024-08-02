[]: # Title: Project Specification Document
[]: # Date: 2021-09-26
[]: # Description: This document outlines the requirements and features of the Reader's haven application.

# Project Specification Document

## Table of Contents

1. [Functional Requirements](#functional-requirements)

## Functional Requirements 

### User Authentication

- Users must be able to register, log in, and manage their profiles.
- Secure password storage and user sessions should be implemented.

### Story Management

- Users can create, edit, and delete their stories.
- Each story should have a title, content, author, and timestamp.

### Browsing and Reading Stories

- Display a list of stories with titles, authors, and summaries.
- Provide detailed story views with full content and author details.

### Comments and Interaction

- Allow users to leave comments on stories.
- Optional: Implement a like or rating system for stories.

### Responsive Design

- Ensure the application works well on both desktop and mobile devices.

### Deployment

- The application should be hosted on Vercel, with a live URL for access.

## Non-Functional Requirements

### Performance

- The application should load quickly and handle multiple users efficiently.

### Security

- Implement secure authentication and data protection practices.

### Usability

- The interface should be intuitive and easy to navigate.

### Scalability

- The architecture should support future enhancements and scaling.

## Technical Constraints

- Use Next.js for the frontend.
- Use PostgreSQL as the database.
- Deploy on Vercel.

## Key Features

- User Accounts: Registration, login, and secure authentication.
- Story Management: Create, edit, and delete stories.
- Browsing and Reading: Display stories with titles, authors, and summaries.
- Comments and Interaction: Allow users to leave comments on stories.
- Responsive Design: Works on both desktop and mobile devices.
- Deployment: Hosted on Vercel with a live URL.

## Technology Stack

- Frontend: Next.js, React, Tailwind CSS.
- Backend: Next.js API Routes, Prisma ORM.
- Database: PostgreSQL.
- Authentication: NextAuth.js
- Deployment: Vercel.

## Data Model

1. User
    - id: UUID
    - email: String
    - password: String (hashed)
    - username: String
    - role: Enum (reader, writer, admin)
    - createdAt: Timestamp
    - updatedAt: Timestamp

2. Story
    - id: UUID
    - title: String
    - content: Text
    - authorId: UUID (foreign key referencing User)
    - createdAt: Timestamp
    - updatedAt: Timestamp

3. Chapter
    - id: UUID
    - storyId: UUID (foreign key referencing Story)
    - title: String
    - content: Text
    - createdAt: Timestamp
    - updatedAt: Timestamp

4. Comment
    - id: UUID
    - content: Text
    - userId: UUID (foreign key referencing User)
    - storyId: UUID (foreign key referencing Story)
    - createdAt: Timestamp
    - updatedAt: Timestamp

5. Genre/Tag
    - id: UUID
    - name: String
    - storyId: UUID (foreign key referencing Story)
    - createdAt: Timestamp
    - updatedAt: Timestamp

## API Endpoints

1. `/api/auth`
    - POST `/api/auth/signup`
    - POST `/api/auth/login`
    - POST `/api/auth/logout`

2. `/api/stories`
    - GET `/api/stories`
    - POST `/api/stories`
    - GET `/api/stories/:id`
    - PUT `/api/stories/:id`
    - DELETE `/api/stories/:id`

3. `/api/stories/:storyId/chapters`
    - GET `/api/stories/:storyId/chapters`
    - POST `/api/stories/:storyId/chapters`
    - GET `/api/stories/:storyId/chapters/:id`
    - PUT `/api/stories/:storyId/chapters/:id`
    - DELETE `/api/stories/:storyId/chapters/:id`

4. `/api/stories/:storyId/comments`
    - GET `/api/stories/:storyId/comments`
    - POST `/api/stories/:storyId/comments`
    - GET `/api/stories/:storyId/comments/:id`
    - PUT `/api/stories/:storyId/comments/:id`
    - DELETE `/api/stories/:storyId/comments/:id`

5. `/api/genres`
    - GET `/api/genres`
    - POST `/api/genres`
    - GET `/api/genres/:id`
    - PUT `/api/genres/:id`
    - DELETE `/api/genres/:id`


## Conclusion

The Reader's Haven application aims to provide a platform for users to create, read, and interact with stories. By implementing the functional and non-functional requirements outlined in this document, we can create a user-friendly and engaging experience for readers and writers alike.

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vercel Documentation](https://vercel.com/docs)

## Revision History

| Date       | Version | Description           | Author        |
|------------|---------|-----------------------|---------------|
| 2021-09-26 | 1.0     | Initial draft         | John Doe      |
| 2021-09-27 | 1.1     | Updated requirements   | Jane Smith    |


