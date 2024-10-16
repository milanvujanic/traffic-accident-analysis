import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/Authentication/PrivateRoute'
import AuthenticationProvider from './components/Authentication/AuthenticationProvider'
import SigninComponent from './components/SigninComponent/SigninComponent'
import SignupComponent from './components/SignupComponent/SignupComponent'
import HomeComponent from './components/HomeComponent/HomeComponent'
import SignoutComponent from './components/SignoutComponent/SignoutComponent'
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <AuthenticationProvider>
        <Routes>
          <Route path="/" element={<SigninComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/home" element={<PrivateRoute Component={HomeComponent}/>} />
          <Route path="/signout" element={<PrivateRoute Component={SignoutComponent}/>} />
        </Routes>
      </AuthenticationProvider>
    </Router>
  )
}

export default App
