# Crumb Haven Website

A modern, responsive website for Crumb Haven, a brand of healthy and delicious cookies.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contact Information](#contact-information)

## Overview

Crumb Haven's website is built with a modern tech stack:

- **Frontend**: React.js with TypeScript
- **Build System**: Vite
- **UI Components**: Custom components with Tailwind CSS and Shadcn UI
- **Backend**: Express.js API for data handling
- **State Management**: TanStack Query for API data
- **Domain**: crumbhaven.in

## Features

- **Responsive Design**: Mobile-first approach ensuring perfect display on all devices
- **Custom Components**: Styled components specific to the Crumb Haven brand
- **Product Showcase**: Detailed product pages with imagery and descriptions
- **Contact Form**: Integrated contact system for customer inquiries
- **Newsletter Subscription**: Email collection for marketing initiatives
- **Testimonials**: Customer reviews displayed throughout the site
- **Brand Story**: About section highlighting the company's unique story

## Local Development

### Prerequisites

- Node.js 20.x or later
- npm 9.x or later

### Setup

1. Clone the repository:
```bash
git clone https://github.com/crumb-haven/Website.Crumb.Haven.git
cd Website.Crumb.Haven
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5000
```

### Project Structure

- `/client`: Frontend React application
- `/server`: Backend Express API
- `/shared`: Shared types and schemas between frontend and backend
- `/public`: Static assets and files

## Deployment

The website is configured for deployment on Netlify with a custom domain (crumbhaven.in).

### Automated Deployment

1. Push changes to the main branch
2. GitHub Actions will automatically build and deploy to Netlify

### Manual Deployment

1. Build the project:
```bash
./deploy.sh
```

2. The script will:
   - Build the application
   - Copy necessary configuration files
   - Prepare everything for Netlify deployment

For detailed deployment instructions, see:
- [Netlify Deployment Guide](NETLIFY_DEPLOYMENT.md)
- [GitHub Actions Setup](GITHUB_ACTIONS_SETUP.md)
- [DNS Configuration](DNS_SETUP.md)

## Documentation

Detailed documentation is available for various aspects of the project:

- [Netlify Deployment](NETLIFY_DEPLOYMENT.md): Complete guide for deploying to Netlify
- [GitHub Actions](GITHUB_ACTIONS_SETUP.md): Workflow setup for CI/CD
- [DNS Configuration](DNS_SETUP.md): Domain setup instructions

## Contact Information

- **Instagram**: [@crumb__haven](https://www.instagram.com/crumb__haven/)
- **WhatsApp**: +91 7021330300
- **Email**: crumb.haven.official@gmail.com

## License

© 2024 Crumb Haven. All rights reserved.