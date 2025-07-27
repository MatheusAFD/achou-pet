# Achou Pet

Achou Pet is a platform designed to help people find lost pets quickly and efficiently. The project provides tools for reporting, searching, and managing information about lost and found animals, connecting pet owners with the community to increase the chances of reuniting with their pets.

## Problem Solved

**Achou Pet** addresses the challenge of lost pets by offering a centralized, easy-to-use platform where:

- Pet owners can report lost animals.
- Community members can report found pets.
- Users can search and filter reports to help reunite pets with their families.

## Monorepo Structure

This project is organized as a monorepo with the following main applications:

- **admin/**: Admin dashboard for managing platform data and users.
- **backend/**: RESTful API built with NestJS, handling business logic, authentication, and database operations.
- **pet-guardian-app/**: User-facing web application for reporting and searching lost/found pets.

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript, Drizzle ORM
- **Database**: PostgreSQL
- **Testing**: Playwright, Vitest, Jest
- **Containerization**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (v8+ recommended)
- Docker & Docker Compose (for local development)

## Contact

For questions or support, open an issue or contact the maintainer: [MatheusAFD](https://github.com/MatheusAFD)
