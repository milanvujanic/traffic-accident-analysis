import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SignupComponent from './components/SignupComponent/SignupComponent.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import SigninComponent from './components/SigninComponent/SigninComponent.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SigninComponent />
  }, 
  {
    path: "/signup",
    element: <SignupComponent />
  }, 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
