"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SafeUser } from "@/types";

interface AdminNavigationProps {
  currentUser: SafeUser;
}

const AdminNavigation: React.FC<AdminNavigationProps> = ({ currentUser }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    return `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
      isActive(path)
        ? "bg-red-50 text-red-600"
        : "text-gray-700 hover:bg-gray-100"
    }`;
  };

  return (
    <aside className="w-64 bg-white shadow-lg fixed left-0 top-0 bottom-0 overflow-y-auto z-20">
      {/* Logo at top of sidebar */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <img 
              src="/images/department-logo.png" 
              alt="Department Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-xs text-gray-600">Thesis Archive System</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {/* Dashboard */}
        <Link href="/admin" className={linkClass("/admin")}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>

        {/* Thesis Management Section */}
        <div className="pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
            Thesis Management
          </p>
          
          {/* Add Thesis - ADMIN ONLY */}
          <Link href="/admin/add-thesis" className={linkClass("/admin/add-thesis")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Thesis
          </Link>

          {/* Manage Thesis */}
          <Link href="/admin/manage-thesis" className={linkClass("/admin/manage-thesis")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Manage Thesis
          </Link>

          {/* Pending Approvals */}
          <Link href="/admin/pending-thesis" className={linkClass("/admin/pending-thesis")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending Approvals
            <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
              New
            </span>
          </Link>
        </div>

        {/* Categories Section */}
        <div className="pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
            Content Management
          </p>
          
          {/* Manage Categories */}
          <Link href="/admin/categories" className={linkClass("/admin/categories")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Categories
          </Link>

          {/* File Manager */}
          <Link href="/admin/files" className={linkClass("/admin/files")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            File Manager
          </Link>
        </div>

        {/* Users & Analytics Section */}
        <div className="pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
            Administration
          </p>
          
          {/* User Management */}
          <Link href="/admin/users" className={linkClass("/admin/users")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Users
          </Link>

          {/* Analytics */}
          <Link href="/admin/analytics" className={linkClass("/admin/analytics")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
            </svg>
            Analytics
          </Link>

          {/* Reports */}
          <Link href="/admin/reports" className={linkClass("/admin/reports")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Reports
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Quick Actions */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-4">
            Quick Actions
          </p>

          {/* Back to Main Site */}
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Main Site
          </Link>

          {/* Settings */}
          <Link href="/admin/settings" className={linkClass("/admin/settings")}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        </div>

        {/* User Info at Bottom */}
        <div className="pt-4 border-t border-gray-200">
          <div className="px-4 py-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {currentUser.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-600 truncate">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default AdminNavigation;