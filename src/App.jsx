import './App.css'

import { Routes, Route } from 'react-router'
import Posts from './posts/Posts'
import Post from './posts/Post'
import Counter from './info/counter/Counter'
import BasicLayout from './components/layouts/BasicLayout'
import PostLayout from './components/layouts/PostLayout'
import NotFound from './components/NotFound'
import Home from './home/Home'
import About from './info/about/About'
import Location from './info/location/Location'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<BasicLayout />}>
        <Route path="about" element={<About />} />
        <Route path="counter" element={<Counter />} />
        <Route path="location" element={<Location />} />
      </Route>
      <Route path="/posts" element={<PostLayout />}>
        <Route index element={<Posts />} />
        <Route path=":postId" element={<Post />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
