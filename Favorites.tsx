import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Modules from './pages/Modules'
import Favorites from './pages/Favorites'
import Progress from './pages/Progress'
import Quiz from './pages/Quiz'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/quiz" element={<Quiz />} />
      </Route>
    </Routes>
  )
}
