# NoxTools Frontend

A modern web application built with React, TypeScript, Vite, and Supabase, featuring a comprehensive dashboard with tools, subscription management, and authentication.

## Overview

NoxTools is a tool nexus hub that provides various developer tools and utilities in a unified platform. The frontend is built using React with TypeScript for type safety, Vite for fast development, and integrates with Supabase for authentication and database operations.

## Features

- **Authentication System**: Complete user authentication flow with sign-up, login, password reset, and email verification
- **Dashboard Interface**: User-friendly dashboard with multiple sections
- **Tools Library**: Access to various development tools
- **Subscription Management**: Integrated payment system with Razorpay
- **User Account Management**: Profile updating and management
- **Responsive UI**: Modern interface built with Tailwind CSS and Shadcn UI components

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Shadcn UI components
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query for server state
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payment Processing**: Razorpay integration

## Recent UI Improvements

The application has undergone significant UI modernization to enhance user experience:

### Core UI Redesign (Latest)

1. **Account Page**:
   - Added user profile card with avatar at the top
   - Implemented tabbed interface for Personal Info, Account Settings, and Security sections
   - Created visually organized forms with proper spacing and grouping
   - Added toggle switches for notification preferences and security options
   - Improved session management with visual indicators for active sessions

2. **Support Page**:
   - Added hero section with quick contact options
   - Implemented categorized FAQ sections in a card-based layout
   - Added live chat functionality with a modal interface
   - Created a support ticket submission form with priority options
   - Added statistics section showing support performance metrics

3. **FixTool Page**:
   - Added a hero section explaining the tool fixing process
   - Implemented a step-by-step form with progress tracking and visual indicators
   - Added statistics cards for resolved issues and response times
   - Created tabs for issue reporting and status tracking
   - Implemented a modern UI for displaying past reports and recent fixes
   - Added detailed issue submission flow with validation

4. **Extension Page**:
   - Created a modern browser extension download page
   - Added browser-specific download cards with branded colors
   - Implemented tabbed installation guides for different browsers
   - Added feature showcase section highlighting extension capabilities

### Previous Improvements

- Replaced old Navbar with new Header component
- Fixed 404 errors by creating/updating missing components
- Redesigned dashboard layout with improved header, search, and profile UI
- Enhanced mobile navigation and responsiveness
- Modernized Tools Library with improved category filtering and search
- Redesigned Subscription page with tabbed interfaces and visual indicators

## Project Structure

```
├── public/              # Static assets
├── src/
│   ├── api/             # API integration layers
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication-related components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── subscription/# Subscription-related components
│   │   ├── ui/          # UI component library (shadcn)
│   │   └── user/        # User profile components
│   ├── contexts/        # React context providers
│   ├── data/            # Static data and constants
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── pages/           # Page components
│   ├── services/        # Service layer for API interactions
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── supabase/            # Supabase configuration and edge functions
├── tailwind.config.ts   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or bun

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/noxtools_clone
   cd noxtools_clone/frontend
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server
   ```
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run build:dev` - Build with development configuration
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for linting errors

### Key Features Implementation

#### Authentication

The application uses Supabase for authentication with multiple methods:
- Email/password authentication
- OAuth providers
- Password reset functionality
- Email verification

#### Subscription Management

The application integrates with Razorpay for payment processing:
- Subscription plans with different tiers
- Payment processing
- Subscription status tracking

#### Dashboard

The dashboard provides access to:
- Tools library
- Account settings
- Subscription management
- Support access
- Browser extension information

## Deployment

To deploy the application:

1. Build the project
   ```
   npm run build
   ```

2. Deploy the contents of the `dist` directory to your web hosting service

## Database Schema

The application uses the following Supabase tables:

### Profiles Table
- `id`: User ID (from Supabase Auth)
- `username`: User's username
- `email`: User's email
- `first_name`: User's first name
- `last_name`: User's last name
- `plan_sku`: SKU of the user's subscription plan
- `plan_name`: Name of the user's subscription plan
- `plan_price`: Price of the subscription
- `plan_status`: Status of the subscription (active, inactive, etc.)
- `plan_start_date`: Start date of the subscription
- `plan_end_date`: End date of the subscription
- `created_at`: Timestamp of profile creation
- `updated_at`: Timestamp of profile update

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 