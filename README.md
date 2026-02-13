# Smart Bookmark App

A simple bookmark manager that allows users to securely save, view, and manage bookmarks with real-time updates.

## 🔗 Live Demo
https://smart-bookmark-app32.vercel.app

## 🛠 Tech Stack
- **Next.js** (App Router)
- **Supabase** (Google Auth, Database, Realtime)
- **Tailwind CSS** (basic styling)
- **Vercel** (deployment)

## ✨ Features
- Google OAuth authentication (no email/password)
- Add bookmarks with URL and title
- Delete your own bookmarks
- Bookmarks are private to each user
- Realtime updates without page refresh (works across multiple tabs)
- Fully deployed with a live production URL

## 🔐 Authentication & Security
- Users authenticate using Google OAuth via Supabase
- Each bookmark is associated with a `user_id`
- Supabase Row Level Security (RLS) ensures users can only access their own bookmarks

## ⚡ Realtime Functionality
- Supabase Realtime subscriptions are used
- When a bookmark is added or deleted in one tab, updates appear instantly in other open tabs without refreshing

## 🧪 How It Was Tested
- Logged in with multiple Google accounts to verify bookmark privacy
- Opened the app in two tabs to confirm realtime updates
- Verified add and delete functionality for bookmarks

## 🚧 Problems Faced & Solutions
1. **Google OAuth redirect issues**
   - Fixed by correctly setting redirect URLs in Supabase and environment variables in Vercel.

2. **Realtime updates not reflecting immediately**
   - Solved by using Supabase realtime subscriptions instead of manual data refetching.

3. **Ensuring bookmark privacy**
   - Implemented Supabase Row Level Security (RLS) policies to restrict data access per user.

## ▶️ Run Locally
```bash
npm install
npm run dev
