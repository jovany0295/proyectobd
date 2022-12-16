import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Header from '../components/Header'
import routes from '../router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GlobalProvider } from '../Context/Reunionctx1'

const App = () => {

  
  return(
    <>
      
      <BrowserRouter>
       {
       window.location.href !== "http://localhost:3000/login" ? <Header /> : null }


        <Routes>
          {
            routes.map( (route, index) => (
              <Route 
                key={index}
                path={route.path}
                element={<route.component/>}
              />
            ) )
          }
        </Routes>
        
      </BrowserRouter>
     
    </>
  )
}

export default App