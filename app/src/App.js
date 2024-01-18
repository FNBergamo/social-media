import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { ProtectedRoutes } from './components/Router/ProtectedRoutes'
import './App.css'
import { AuthProvider } from './context/Token/AuthProvider'
import { UserExtraDataProvider } from './context/UserExtraData/UserExtraDataProvider'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthProvider>
          <UserExtraDataProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route element={<ProtectedRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
              </Route>
            </Routes>
          </UserExtraDataProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App

