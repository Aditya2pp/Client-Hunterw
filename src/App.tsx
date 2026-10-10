/**
 * src/App.tsx
 * Client-side App Router supporting:
 * - / (Landing Page)
 * - /login (Log In)
 * - /signup (Sign Up)
 * - /dashboard/find (Find YouTubers)
 * - /dashboard/saved (Saved YouTubers)
 * - /dashboard/plans (Subscription & Plans)
 * - /dashboard/settings (Settings)
 */
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import AuthForm from '../lib/AuthForm.js';
import DashboardLayout from './components/DashboardLayout.jsx';
import FindPage from './components/FindPage.jsx';
import SavedPage from './components/SavedPage.jsx';
import PlansPage from './components/PlansPage.jsx';
import SettingsPage from './components/SettingsPage.jsx';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  // Route matching
  if (currentPath === '/login') {
    return <AuthForm mode="login" onNavigate={navigate} />;
  }

  if (currentPath === '/signup') {
    return <AuthForm mode="signup" onNavigate={navigate} />;
  }

  if (currentPath === '/dashboard/saved') {
    return (
      <DashboardLayout activeMenu="saved" onNavigate={navigate}>
        <SavedPage onNavigate={navigate} />
      </DashboardLayout>
    );
  }

  if (currentPath === '/dashboard/plans') {
    return (
      <DashboardLayout activeMenu="plans" onNavigate={navigate}>
        <PlansPage />
      </DashboardLayout>
    );
  }

  if (currentPath === '/dashboard/settings') {
    return (
      <DashboardLayout activeMenu="settings" onNavigate={navigate}>
        <SettingsPage onNavigate={navigate} />
      </DashboardLayout>
    );
  }

  if (currentPath === '/dashboard/find' || currentPath.startsWith('/dashboard')) {
    return (
      <DashboardLayout activeMenu="find" onNavigate={navigate}>
        <FindPage onNavigate={navigate} />
      </DashboardLayout>
    );
  }

  // Default: Landing Page (/)
  return <LandingPage onNavigate={navigate} />;
}
