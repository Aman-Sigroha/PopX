import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomeCard from "./components/WelcomeCard/WelcomeCard"
import SigninCard from './components/SigninCard/SigninCard'
import RegisterCard from './components/RegisterCard/RegisterCard'
import AccountSettings from './components/AccountSettings/AccountSettings'

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomeCard />} />
          <Route path="/signin" element={<SigninCard />} />
          <Route path="/register" element={<RegisterCard />} />
          <Route path="/account-settings" element={<AccountSettings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
