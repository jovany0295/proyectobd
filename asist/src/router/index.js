import Home from '../pages/Home'
import Alumnos from '../pages/Alumnos'
import Grupo from '../pages/Grupo'
import Master from '../pages/Master'
import Materias from '../pages/Materias'
import Clase from '../pages/Clases'
import Asistencia from '../pages/Asistencia'
import Login from '../pages/Login'
import Listas from '../pages/Listas'
import Periodos from '../pages/Periodos'
import Reunion from '../pages/Reunion'
import Graficos from '../pages/Graficos'



// import UserEdit from '../pages/Users/edit'

const routes = [
  { name: 'Asistencia', path: '/asistencia', component: Asistencia },
  { name: 'Alumnos', path: '/alumnos', component: Alumnos },
  { name: 'Grupo', path: '/grupo', component: Grupo },
  { name: 'Master', path: '/master', component: Master },
  { name: 'Materias', path: '/materias', component: Materias },
  { name: 'Clase', path: '/Clase', component: Clase},
  { name: 'Login', path: '/Login', component: Login},
  { name: 'Home', path: '/Home', component: Home},
  { name: 'Listas', path: '/Listas', component: Listas},
  { name: 'Periodos', path: 'Periodos', component: Periodos },
  { name: 'Reunion', path: 'Reunion', component: Reunion},
  { name: 'Graficos', path: '/Graficos', component: Graficos},

  // { name: 'UserEdit', path: '/users/:id', component: UserEdit },
]

export default routes