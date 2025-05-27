# 🚀 Next.js Portfolio

A modern, full-stack portfolio built with Next.js 15, featuring OAuth authentication, dynamic content management, and a powerful dashboard. This application combines a professional portfolio showcase with robust project management capabilities, all powered by MongoDB and Next.js API routes.

## 🌐 Live Demo & Source Code

- **Live Demo:** [View Live Site](https://b4-a5-portfolio.vercel.app)
- **Source Code:** [GitHub Repository](https://github.com/ayan-akd/b4-assignment-5-portfolio)

## ✨ Core Features

### 🏠 Public Pages
- **Home Page (/)**
  - Dynamic portfolio introduction
  - Skills showcase with icons
  - Featured projects section
  - Downloadable resume
  - Animated section transitions
  
- **Projects Page (/projects)**
  - Grid/list view of projects
  - Detailed project pages (/projects/[id])
  - Technology stack display
  - Live demo & GitHub links
  
  
- **Contact Page (/contact)**
  - Interactive contact form
  - Real-time form validation
  - Message storage in MongoDB
  - Success notifications

### 🔐 Dashboard Features
- **Authentication**
  - Social login (Google & GitHub) via NextAuth
  - Protected routes
  - Session management
  - Persistent login state

- **Content Management**
  - Project management interface
  - Message inbox
  - Media upload & management

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15.1.6
- **Language**: TypeScript
- **UI Components**: 
  - Radix UI primitives
  - Shadcn UI components
  - Custom Tailwind components
- **Styling**: 
  - Tailwind CSS
  - CSS Animations
  - Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation

### Backend
- **API Routes**: Next.js API endpoints
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Image Processing**: Sharp
- **Security**: 
  - API route protection
  - Input validation
  - MongoDB sanitization

### Additional Libraries
- **Content**: React Markdown
- **UI Enhancement**:
  - Embla Carousel
  - Lottie Animations
  - Sonner notifications
  - Lucide React icons
  - Tabler icons
- **Theming**: Next-themes for dark mode
- **Development**: ESLint, TypeScript

## 📁 Project Structure
```
app/
├── (commonLayout)/           # Public pages layout group
│   ├── contact/             # Contact page
│   ├── login/              # Login page
│   ├── projects/           # Projects pages
│   ├── layout.tsx
│   └── page.tsx
├── (dashboardLayout)/       # Dashboard layout group
│   ├── dashboard/
│   │   ├── messages/       # Message management
│   │   ├── projects/       # Project management
│   │   ├── page.tsx
│   │   └── layout.tsx
├── api/                     # API routes
│   ├── auth/               # Auth endpoints
│   ├── messages/           # Message endpoints
│   ├── projects/           # Project endpoints
│   ├── error.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── assets/                  # Static assets
├── components/             # Reusable components
├── hooks/                  # Custom hooks
├── lib/                    # Utility functions
├── providers/              # Context providers
├── schemas/                # Validation schemas
├── types/                  # TypeScript types
│   └── types.ts
├── utils/                  # Helper functions
└── middleware.ts           # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB database
- GitHub and Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ayan-akd/b4-assignment-5-portfolio.git
cd b4-assignment-5-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```env
# App URLs
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your-secret-key
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
MONGODB_URI=your-mongodb-connection-string
```

4. Run the development server:
```bash
npm run dev
```

## 💾 Data Models



### Project
```typescript
interface Project {
  title: string;
  description: string;
  images: string[];
  liveLink: string;
  clientRepo: string;
  serverRepo: string;
  technologies: string[];
}
```

### Message
```typescript
interface Message {
  name: string;
  email: string;
  message: string;
}
```

## 🔒 API Routes

### Authentication
- `GET/POST /api/auth/[...nextauth]` - NextAuth authentication routes


### Project Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/[id]` - Get single project
- `POST /api/projects` - Create project (protected)
- `PUT /api/projects/[id]` - Update project (protected)
- `DELETE /api/projects/[id]` - Delete project (protected)

### Message Endpoints
- `POST /api/messages` - Create message
- `GET /api/messages` - Get all messages (protected)
- `DELETE /api/messages/[id]` - Delete message (protected)

## 🎨 Features Implemented
- [x] Server-side rendering (SSR) for SEO
- [x] Static Site Generation for stable content
- [x] Dark mode support
- [x] Social authentication
- [x] Responsive design
- [x] API routes
- [x] Form validation
- [x] Image optimization
- [x] Animation effects
- [x] Protected dashboard routes
- [x] MongoDB integration
- [x] Contact form functionality
- [x] Project showcase

## 📦 Package Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## 🚀 Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

## 🔍 Future Enhancements
- [ ] Newsletter integration
- [ ] Advanced image gallery for projects
- [ ] Analytics dashboard
- [ ] Rich text editor alternative to Markdown
- [ ] Social media sharing
- [ ] RSS feed
- [ ] Search functionality
- [ ] Performance optimization
- [ ] Automated testing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- MongoDB for database
- All open-source contributors

For more information about the technologies used, please refer to their respective documentation:
- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
