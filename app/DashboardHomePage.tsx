"use client";

import Link from "next/link";
import { SafeUser } from "@/types";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DashboardHomePageProps {
  currentUser: SafeUser;
}

const DashboardHomePage: React.FC<DashboardHomePageProps> = ({ currentUser }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/");
      router.refresh();
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-lg fixed left-0 top-0 bottom-0 overflow-y-auto z-20">
        {/* Logo at top of sidebar */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <img 
                src="/images/department-logo.png" 
                alt="Department Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {/* Home */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 bg-red-50 text-red-600 rounded-lg font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>

          {/* Browse */}
          <Link
            href="/browse"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse
          </Link>

          {/* Categories */}
          <Link
            href="/categories"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Categories
          </Link>

          {/* Favorites */}
          <Link
            href="/favorites"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Favorites
          </Link>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Admin Panel - Only for admins */}
          {currentUser.role === 'ADMIN' && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin Dashboard
            </Link>
          )}

          {/* Settings */}
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>

          {/* Bottom Links */}
          <div className="pt-4 space-y-1">
            <Link href="/about" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/support" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Support
            </Link>
            <Link href="/terms" className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Terms & Condition
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64">
        {/* Top Bar - Integrated with content */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <button className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm flex items-center gap-1">
                  Advanced
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-28 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Section: Time, Date, Notifications, User */}
            <div className="flex items-center gap-6 ml-8">
              {/* Time */}
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">09:00 AM</span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium">12-JULY-2025</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-3 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {currentUser.email}
                      </p>
                      {currentUser.role && (
                        <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                          {currentUser.role}
                        </span>
                      )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>

                      {currentUser.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Admin Dashboard
                        </Link>
                      )}

                      <Link
                        href="/favorites"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Favorites
                      </Link>

                      <Link
                        href="/history"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        History
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Quote Section */}
          <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-2xl p-8 mb-8 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Today's Quote</h3>
            <blockquote className="text-xl italic mb-4">
              "There is more treasure in books than in all the pirate's loot on Treasure Island."
            </blockquote>
            <p className="text-right text-red-100">-Walt Disney</p>
            
            {/* Pagination dots */}
            <div className="flex gap-2 mt-6">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>

          {/* Recently Added Carousel */}
          <div className="mb-8">
            <div className="bg-red-600 text-white px-6 py-3 -rotate-90 origin-top-right fixed right-0 top-1/2 rounded-b-lg z-10">
              <p className="text-sm font-semibold whitespace-nowrap">Recently Added</p>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-shrink-0 w-40 h-56 bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg p-4 text-white text-xs">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <p className="font-semibold mb-2">Thesis Title {i}</p>
                      <p className="text-red-100 text-xs">Author Name</p>
                      <p className="text-red-100 text-xs">Year 2024</p>
                    </div>
                    <div className="text-xs">
                      <p className="text-red-100">Computer Science</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {/* Total Thesis */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Thesis</p>
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">516</p>
            </div>

            {/* Total Downloads */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Downloads</p>
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">2361</p>
            </div>

            {/* Total Views */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Views</p>
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">7797</p>
            </div>

            {/* Total Authors */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Authors</p>
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">1269</p>
            </div>

            {/* Avg Rating */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Avg Rating</p>
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p className="text-3xl font-bold text-gray-900">4.7</p>
            </div>
          </div>

          {/* Top Searches */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Top Searches</h2>
              <Link href="/browse" className="text-red-600 hover:text-red-700 text-sm font-medium">
                Show All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                "Don't Make Me Think",
                "The Design of Every...",
                "Sprint : How to Solv...",
                "Learn UX : Design Gr...",
                "The Road to React",
                "Rich Dad Poor Dad",
                "Harry Potter and The...",
                "You Don't Know JS"
              ].map((title, i) => (
                <Link
                  key={i}
                  href={`/thesis/${i + 1}`}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-md p-4 h-48 flex flex-col justify-between text-white text-xs hover:shadow-xl transition-shadow">
                    <div>
                      <p className="font-semibold mb-2 line-clamp-3">{title}</p>
                      <p className="text-red-100 text-xs">Author Name</p>
                      <p className="text-red-100 text-xs">2024</p>
                    </div>
                    <div>
                      <p className="text-red-100 text-xs">Computer Science</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 font-medium truncate group-hover:text-red-600">
                    {title}
                  </p>
                  <p className="text-xs text-gray-500">Author, Year</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Recommended</h2>
              <Link href="/browse" className="text-red-600 hover:text-red-700 text-sm font-medium">
                Show All
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Link
                  key={i}
                  href={`/thesis/${i}`}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-md p-4 h-48 flex flex-col justify-between text-white text-xs hover:shadow-xl transition-shadow">
                    <div>
                      <p className="font-semibold mb-2">Recommended Thesis {i}</p>
                      <p className="text-red-100 text-xs">Author Name</p>
                      <p className="text-red-100 text-xs">2024</p>
                    </div>
                    <div>
                      <p className="text-red-100 text-xs">Category</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 font-medium truncate group-hover:text-red-600">
                    Recommended Thesis {i}
                  </p>
                  <p className="text-xs text-gray-500">Author, 2024</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHomePage;