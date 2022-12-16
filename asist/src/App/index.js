import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
  Link
} from 'react-router-dom'
import Header from '../components/Header'
import routes from '../router'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from '../pages/Login'
import PageNotFound from '../components/PageNotFound/PageNotFound'

const isLogged = sessionStorage.getItem('token');
// const NotFoundPage = () => {
//   return (
//     <div>
//       <h1 style={{ color: "red", fontSize: 100 }}>404</h1>
//       <h3>Page Not Found</h3>
//       <p>
//         <Link to="/Home">Go Home</Link>
//       </p>
//     </div>
//   );
// };




const App = () => {
  if(window.location.href == "http://localhost:3000/login" && isLogged) {
    window.location.href = './Home';
    return;
  }
    return(
      <>
      
        <BrowserRouter>
          { window.location.href !== "http://localhost:3000/login" ? <Header /> : null }
          
          <Routes>
              <Route path="/login"  element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              {
                routes.map( (route, index) => (
                  <Route 
                    key={index}
                    path={route.path}
                    element={ isLogged ? <route.component /> : <Navigate to={'/login'} replace />}
                    />    
                ))
              }
            
          </Routes>

        </BrowserRouter>
     
      </>
    )
  }

export default App