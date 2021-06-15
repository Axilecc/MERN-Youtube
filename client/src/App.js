import React from 'react'
import { AuthContext } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { useRoutes } from './routes'
import { Navbar } from '../src/components/navbar'
import { Preloader } from './common/Preloader'
import 'materialize-css'

function App() {
  const {login, logout, token, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready) {
    return <Preloader/>
  }

  return (
    <AuthContext.Provider value = {{login, logout, token, userId, ready}}>
      <BrowserRouter>
      { isAuthenticated && <Navbar/>}
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;