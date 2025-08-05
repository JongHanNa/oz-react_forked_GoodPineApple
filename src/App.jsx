import './App.css'

import { Routes, Route, Link, useLocation } from 'react-router'
import Posts from './posts/Posts'
import Post from './posts/Post'
import Counter from './counter/Counter'
import BasicLayout from './components/layouts/BasicLayout'
import PostLayout from './components/layouts/PostLayout'
import NotFound from './components/NotFound'

function App() {
  return (
    <Routes>
      {/* 레이아웃 없는 홈 페이지 */}
      <Route path="/" element={<HomePage />} />
      
      {/* BasicLayout을 사용하는 /info 하위 페이지들 */}
      <Route path="/info" element={<BasicLayout />}>
        <Route path="about" element={<AboutPage />} />
        <Route path="counter" element={<Counter />} />
        <Route path="location" element={<LocationPage />} />
      </Route>
      
      {/* PostLayout을 사용하는 페이지들 */}
      <Route path="/posts" element={<PostLayout />}>
        <Route index element={<Posts />} />
        {/* <Route path="new" element={<NewPost />} />
        <Route path="edit/:postId" element={<EditPost />} /> */}
        <Route path=":postId" element={<Post />} />
        {/* <Route path=":postId/comments/:commentId" element={<Comments />} /> */}
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to My React App
        </h1>
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Hello world! 🚀
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          This is the home page without any layout. Built with React, Vite & Tailwind CSS.
        </p>
        <nav className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/info/about" 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            ℹ️ About
          </Link>
          <Link 
            to="/info/counter" 
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            ✅ Counter
          </Link>
          <Link 
            to="/posts" 
            className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
          >
            📋 Posts
          </Link>
        </nav>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          This page uses BasicLayout with header and footer. The entire application is built with modern web technologies including React, Vite, and Tailwind CSS for a consistent and beautiful user experience.
        </p>
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Features</h2>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Responsive design with Tailwind CSS
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Modern React with hooks and functional components
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Fast development with Vite
            </li>
            <li className="flex items-center">
              <span className="mr-2">✅</span>
              Clean and maintainable code structure
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function LocationPage() {
  const location = useLocation()
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Location Info</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Current Pathname</h3>
              <p className="text-gray-600 font-mono text-sm">{location.pathname}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Search Parameters</h3>
              <p className="text-gray-600 font-mono text-sm">{location.search || 'None'}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Hash</h3>
              <p className="text-gray-600 font-mono text-sm">{location.hash || 'None'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">State</h3>
              <p className="text-gray-600 font-mono text-sm">{JSON.stringify(location.state) || 'None'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
