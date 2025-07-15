# 🏥 Community Forum

A modern, full-stack community forum platform designed for your next SaaS product. Built with Next.js 15, TypeScript, and MongoDB, one can use this to integrate a community forum in their SaaS product, customize it to their needs, and build a strong community around the product, with ease.

![Community Forum](https://img.shields.io/badge/Next.js-15.1.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.12-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication & User Management

- **Google OAuth Integration** - Seamless sign-in with Google accounts
- **User Profiles** - Customizable profiles with bio and portfolio links
- **Role-based Access** - Admin and user roles with different permissions
- **Session Management** - Secure session handling with NextAuth.js

### 📝 Content Management

- **Rich Text Posts** - Create posts with markdown support
- **Post Approval System** - Admin-controlled content moderation
- **Comment System** - Threaded discussions with upvote/downvote
- **Post Filtering** - Advanced filtering and search capabilities
- **Save Posts** - Bookmark favorite posts for later reading

### 🎨 Modern UI/UX

- **Dark/Light Theme** - Beautiful theme switching with system preference detection
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Smooth Animations** - Framer Motion powered micro-interactions
- **Loading States** - Elegant loading indicators and skeleton screens
- **Toast Notifications** - Real-time feedback for user actions

### 🔧 Admin Dashboard

- **Analytics Overview** - User and post statistics
- **Content Moderation** - Approve/reject pending posts
- **User Management** - Monitor and manage community members
- **Real-time Updates** - Live dashboard with current metrics

### 📱 Mobile Optimized

- **Progressive Web App** - Installable on mobile devices
- **Touch-friendly Interface** - Optimized for mobile interactions
- **Offline Capabilities** - Enhanced user experience

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### Backend

- **NextAuth.js** - Authentication solution
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemailer** - Email functionality

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Turbopack** - Fast bundler for development

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/iaryank/community-forum.git
   cd community-forum
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📄 Project Structure

```
community-forum/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin route group
│   ├── (user)/            # User route group
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   ├── ui/               # UI components
│   └── shared/           # Shared components
├── lib/                  # Utility functions
├── models/               # MongoDB schemas
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🔑 Configuration

### Database Setup

The application uses MongoDB with the following collections:

- **Users** - User profiles and authentication data
- **Posts** - Forum posts with approval status
- **Comments** - Post comments with voting system
- **Notifications** - User notification system

### Authentication

Google OAuth is configured for user authentication. Users are automatically created in the database upon first sign-in.

### Admin Access

Admin users can be designated by setting `isAdmin: true` in the user document in MongoDB.

## 🎯 Key Features Explained

### Post Creation & Moderation

- Users can create posts with rich text content
- Posts require admin approval before public visibility
- Markdown support for enhanced content formatting

### Community Engagement

- Upvote/downvote system for comments
- Post filtering by various criteria
- User profiles with activity tracking

### Real-time Features

- Live post updates
- Instant notifications
- Smooth page transitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)

## 📞 Support

If you have any questions or need support, please open an issue in the GitHub repository.

---

**Made with ❤️ for SaaS developers!**
