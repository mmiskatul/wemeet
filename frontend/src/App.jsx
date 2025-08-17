import {Routes,Route} from 'react-router'

import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import OnboardingPage from './Pages/OnboardingPage'
import Callpage from './Pages/Callpage'
import ChatPage from './Pages/ChatPage'

import {Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <div className='h-screen ' data-theme ="night">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/onboarding" element={<OnboardingPage/>}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/call" element={<Callpage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
