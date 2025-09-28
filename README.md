# 🚀 Hello SaaS - Next.js 15 + Supabase

A modern SaaS application built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

- 🔐 **Authentication** - Email/password with Supabase Auth
- 🗄️ **Database** - PostgreSQL with Row Level Security
- 📱 **Responsive** - Mobile-first design
- 🎨 **Modern UI** - Clean, professional interface
- 🔒 **Secure** - RLS policies for data isolation
- ⚡ **Fast** - Optimized with Next.js 15

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd hello-saas
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Database Setup
**IMPORTANT**: You must set up the database first!

```bash
# Run the setup script
node scripts/setup-database.js
```

Then follow the instructions to:
1. Copy the SQL schema
2. Execute in Supabase Dashboard
3. Verify the setup

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
app/
├── (components)/          # Shared components
│   ├── Navbar.tsx        # Dashboard navigation
│   ├── Sidebar.tsx       # Sidebar navigation
│   ├── ItemsList.tsx     # Items management
│   └── PublicNavbar.tsx  # Public pages navbar
├── dashboard/            # Protected dashboard
├── items/               # Items management page
├── login/               # Authentication
├── signup/              # User registration
└── reset-password/      # Password reset

lib/
├── supabase.ts          # Supabase client
├── supabaseAdmin.ts     # Admin client
└── items.ts            # Items service

types/
└── database.ts         # TypeScript types
```

## 🗄️ Database Schema

The app uses a single `items` table with:

- **id**: UUID (Primary Key)
- **user_id**: UUID (Foreign Key to auth.users)
- **title**: TEXT (Required)
- **notes**: TEXT (Optional)
- **created_at**: TIMESTAMPTZ (Auto-generated)
- **updated_at**: TIMESTAMPTZ (Auto-updated)

### Security Features
- ✅ Row Level Security (RLS) enabled
- ✅ User data isolation
- ✅ Foreign key constraints
- ✅ Data validation
- ✅ Performance indexes

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy!

### Manual Setup
1. Run `npm run build`
2. Deploy the `.next` folder
3. Set up environment variables

## 🛠️ Troubleshooting

### "Could not find table 'public.items'"
This means the database hasn't been set up yet. Follow the database setup steps above.

### Authentication Issues
- Check your Supabase URL and keys
- Verify email confirmation is set up
- Check Supabase Auth settings

### Build Errors
- Run `npm run lint` to check for issues
- Ensure all environment variables are set
- Check TypeScript errors

## 📚 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Need help?** Check the troubleshooting section or open an issue!