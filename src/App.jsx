import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThemeButton from './components/ThemeButton'
import WelcomePage from './components/WelcomePage'
import AuthLayout from './components/auth/AuthLayout'
import AuthForm from './components/auth/AuthForm'
import AuthRegister from './components/auth/AuthRegister'
import AuthResend from './components/auth/AuthResend'
import Dashboard from './components/dashboard/Dashboard'
import AuthChangePassword from './components/auth/AuthChangePassword'


function App() {
  return (
    <BrowserRouter>
      <ThemeButton />
      <Routes>
        <Route path="" element={<WelcomePage />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<AuthForm />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="resendpassword" element={<AuthResend />} />
          <Route path="changePassword" element={<AuthChangePassword />} />
        </Route>
        <Route path='dashboard' element={<Dashboard />}>

        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App