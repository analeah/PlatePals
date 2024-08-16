# PlatePals

## Project Overview:
PlatePals is a full-stack food review web application that allows users to sign up, upload, and view videos of food reviews. The app leverages Google Cloud services to ensure scalable video hosting and efficient backend operations.

## Key Features:
User Authentication: Integrated Firebase for secure user sign-up and login.

Video Upload and Processing: Utilized Google Cloud Storage for hosting, with Cloud Run dynamically handling video processing tasks using FFmpeg.

Event Management: Implemented Pub/Sub to manage 2,000+ video upload events.

Metadata Storage: Employed Firestore for efficient storage and retrieval of video metadata.

## Technologies Used:
Frontend: TypeScript, Next.js

Backend: Express.js, Docker, FFmpeg

Cloud Services: Google Cloud Storage, Cloud Run, Firebase (Auth, Firestore), Pub/Sub
