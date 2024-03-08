import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import SignupForm from './_auth/forms/SignupForm'
import SigninForm from './_auth/forms/SigninForm'
import { Home } from './_root/pages'
import './globals.scss'
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <main className='d-flex vh-100'>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />}/>
          <Route path='/sign-up' element={<SignupForm />}/>
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />}/>
        </Route>
      </Routes>
      <ToastContainer />
    </main>
  )
}
