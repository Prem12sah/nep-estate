import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom'
import About from './pages/About'
import Profile from './pages/Profile'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        
      </Routes>
    </BrowserRouter>
  )
}
