# Hello SaaS Indonesia 🚀

A clean, modern SaaS starter built with Next.js 14, TypeScript, Tailwind CSS, and Supabase authentication.

## Features

- ⚡ **Next.js 14** with App Router
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 📱 **Responsive design** for all devices
- 🧭 **Navigation** with shared Navbar component
- 🔐 **Supabase Authentication** with email/password
- 🛡️ **Protected routes** with session management
- 🔄 **Password reset** functionality

## Project Structure

```
app/
├── (components)/
│   └── Navbar.tsx          # Shared navigation component
├── dashboard/
│   └── page.tsx            # Protected dashboard page
├── login/
│   └── page.tsx            # Login page with Supabase auth
├── reset-password/
│   └── page.tsx            # Password reset page
├── signup/
│   └── page.tsx            # Signup page with Supabase auth
├── globals.css             # Global styles and Tailwind
├── layout.tsx              # Root layout with Navbar
└── page.tsx                # Landing page with hero section
lib/
└── supabase.ts             # Supabase client configuration
```

## Pages

- **/** - Landing page with hero section and call-to-action buttons
- **/signup** - User registration with email/password
- **/login** - User authentication with password reset
- **/reset-password** - Password reset form (accessed via email link)
- **/dashboard** - Protected dashboard with user info and logout

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Go to Authentication > URL Configuration and set:
     - Site URL: `http://localhost:3000` (for development)
     - Redirect URLs: `http://localhost:3000/reset-password`
   - Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing Password Reset Flow

1. **Go to Login Page** - Visit `/login`
2. **Click "Lupa password?"** - Enter your email and click the link
3. **Check Email** - Look for the password reset email in your inbox
4. **Click Reset Link** - This will redirect to `/reset-password`
5. **Enter New Password** - Fill in the new password form
6. **Success** - You'll be redirected to `/login` with updated password

## Authentication Features

- ✅ **User Registration** - Email/password signup with Supabase
- ✅ **User Login** - Email/password authentication
- ✅ **Password Reset** - Complete email-based password recovery flow
- ✅ **Password Update** - Secure password change via email link
- ✅ **Protected Routes** - Dashboard requires authentication
- ✅ **Session Management** - Automatic session checking and redirects
- ✅ **User Info Display** - Shows logged-in user's email
- ✅ **Logout Functionality** - Working logout with session cleanup

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Fonts**: Geist Sans & Geist Mono
- **Icons**: Heroicons (via SVG)

## Next Steps

This starter provides a solid foundation for building a SaaS application. Consider adding:

- Database tables and RLS policies in Supabase
- API routes for backend functionality
- State management (Zustand, Redux Toolkit)
- Form validation (React Hook Form + Zod)
- Real-time features (Supabase Realtime)
- Email templates customization
- User profile management
- Role-based access control
