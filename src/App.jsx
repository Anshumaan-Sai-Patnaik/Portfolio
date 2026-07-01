import { Routes, Route } from 'react-router-dom'
import './App.css'

import Background from './background/!main'
import Cursor from './cursor/!main'
import Home from './Home'
import WorkDetail from './works/!main'

function App() {
  return (
    <>
      <Background />
      <Cursor />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works/:slug" element={<WorkDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
