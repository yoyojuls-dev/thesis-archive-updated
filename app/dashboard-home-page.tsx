import getCurrentUser from "@/actions/getCurrentUser";
import Container from "./components/Container";
import Link from "next/link";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Only show when logged in */}
      {currentUser && (
        <aside className="w-64 bg-white shadow-lg fixed left-0 top-16 bottom-0 overflow-y-auto">
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

            {/* Add Thesis */}
            <Link
              href="/add-thesis"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Thesis
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
                Admin Panel
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
      )}

      {/* Main Content */}
      <main className={`flex-1 ${currentUser ? 'ml-64' : ''} p-8`}>
        <Container>
          {currentUser ? (
            <>
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
                <div className="bg-red-600 text-white px-6 py-3 -rotate-90 origin-top-right fixed right-0 top-1/2 rounded-b-lg">
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
            </>
          ) : (
            // Guest View - CTA
            <div className="text-center py-20">
              <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                  <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <img 
                      src="/images/department-logo.png" 
                      alt="Department Logo"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    THESIS ARCHIVE MANAGEMENT SYSTEM
                  </h1>
                  <p className="text-xl text-gray-600 mb-8">
                    Computer Studies Department
                  </p>
                  <p className="text-gray-600 mb-8">
                    Digital repository for thesis documents from the Computer Studies Department.
                    Browse, search, and access academic research and scholarly works in one comprehensive platform.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/login?type=student"
                    className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors shadow-lg"
                  >
                    Sign In as Student
                  </Link>
                  <Link
                    href="/login?type=admin"
                    className="px-8 py-4 bg-white border-2 border-red-600 text-red-600 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors"
                  >
                    Sign In as Admin
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}