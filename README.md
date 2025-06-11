# Network Earnings - Referral Management Platform

A comprehensive referral management platform built with React, Node.js, and PostgreSQL. This application provides businesses and referrers with tools to manage leads, track earnings, resolve disputes, and monitor campaign performance.

## Features

### For Referrers
- **Enhanced Dashboard**: Real-time analytics with performance charts and recent referrals
- **Lead Management**: Track referral status and earnings
- **Earnings Tracking**: View pending and paid earnings with withdrawal functionality
- **Share Referrals**: Generate QR codes and AI-powered message templates
- **Dispute Resolution**: Submit and track dispute cases

### For Businesses
- **Campaign Creation**: Create and manage referral campaigns
- **Lead Tracking**: Monitor incoming referrals and conversions
- **Payment Management**: Process referrer payouts
- **Performance Analytics**: Track campaign ROI and conversion rates

### For Administrators
- **Admin Overview**: Comprehensive dashboard with system analytics
- **User Management**: Monitor referrer and business accounts
- **Dispute Management**: Review and resolve disputes
- **Financial Oversight**: Track all payouts and earnings

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** component library
- **TanStack Query** for data fetching
- **Recharts** for analytics visualization
- **Wouter** for routing

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **PostgreSQL** for data persistence
- **Passport.js** for authentication

### Database
- **PostgreSQL** with comprehensive schema
- Real-time data synchronization
- Proper relationships and constraints
- Sample data initialization

## Database Schema

The application uses a well-structured PostgreSQL database with the following entities:

- **Users**: Referrers, businesses, and administrators
- **Leads**: Customer referrals with tracking
- **Campaigns**: Business marketing campaigns
- **Earnings**: Referrer compensation tracking
- **Disputes**: Conflict resolution system
- **Activities**: System audit trail

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Environment variables configured

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jxspam/Networking-Earnings-App.git
cd Networking-Earnings-App
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Database configuration
DATABASE_URL=your_postgresql_connection_string
PGHOST=your_db_host
PGPORT=your_db_port
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=your_db_name
```

4. Initialize the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── db.ts              # Database connection
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle database schema
└── attached_assets/        # UI design references
```

## API Endpoints

### Authentication
- `POST /api/login` - User authentication
- `POST /api/register` - User registration
- `POST /api/logout` - User logout

### Users
- `GET /api/users` - Get all users
- `GET /api/user` - Get current user

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `PUT /api/leads/:id` - Update lead

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create campaign

### Earnings
- `GET /api/earnings` - Get all earnings
- `PUT /api/earnings/:id` - Update earning status

### Disputes
- `GET /api/disputes` - Get all disputes
- `POST /api/disputes` - Create dispute

### Analytics
- `GET /api/analytics/overview` - System analytics

## Features Implemented

### User Interface
- Professional blue gradient header design
- Responsive layout for all screen sizes
- Status badges with color-coded indicators
- Interactive charts and data visualizations
- Modern card-based layout

### Authentication System
- Login/registration with role selection
- Session management
- Protected routes
- User role-based access control

### Data Management
- Real-time data fetching from PostgreSQL
- Comprehensive CRUD operations
- Data validation and error handling
- Automatic sample data initialization

### Business Logic
- Lead conversion tracking
- Earnings calculation
- Campaign performance metrics
- Dispute resolution workflow

## Development

### Database Operations
```bash
# Push schema changes
npm run db:push

# Generate migrations (if needed)
npx drizzle-kit generate

# View database studio
npx drizzle-kit studio
```

### Code Quality
- TypeScript for type safety
- ESLint configuration
- Consistent code formatting
- Component-based architecture

## Deployment

The application is designed to work with:
- **Replit Deployments** (recommended)
- **Vercel** for frontend hosting
- **Railway** or **Supabase** for PostgreSQL
- **Docker** containerization support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary software developed for referral management use cases.

## Support

For technical support or feature requests, please open an issue in the GitHub repository.

---

**Built with ❤️ using modern web technologies**