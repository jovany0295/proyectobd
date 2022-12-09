# Integrantes
Jovany Yair Patiño Rayo
<p style='text-align: center;'> Documentación Técnica sistema de asistencia.
<p style='text-align: right;'> Construcción del Front-End Noviembre 2022.
<br /> <br /> <br />
Xiadani Gutierrez Rendon (emoxa)

Tabla de Contenidos
1. Tecnologías utilizadas	
2. Instalación y ejecución del proyecto
    2.1 Configuración	
3. Estructura de carpetas
4. Uso
5 Datos de configuración	

<br /> <br />

1. Tecnologías Utilizadas
<div style='text-align: justify;'> Para la construcción del Front-End del portal Web, se utilizaron las siguientes librerías: </div>

react v11.10.4 (Librería utilizada para la construcción de sitios web dinámicos)
Material-Ui(Framework de estilos)
Reactstrap(Framework de estilos)

2. Instalación y ejecución del proyecto
Para llevar a cabo la instalación del proyecto, solo es necesario ejecutar los siguientes comandos:

git clone  https://github.com/jovany0295/proyectobd.git
cd asist 
git fetch
git checkout integracion
npm install
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @mui/icons-material
npm install reactstrap react react-dom
npm install --save chart.js react-chartjs-2
npm install react-datepicker --save
npm start


2.1 Configuración
Como tal no hay una configuracion especifica a excepcion de la API

3. Estructura de carpetas
El proyecto cuenta con la siguiente estructura de carpetas

<div style = 'text-align:center;'> <img src="./img-readme/estructura-carpetas.png" alt="CloudAppi" width="300px"> </div>

App Esta carpeta contiene la estructura global del proyecto, en otras palabras, la plantilla.
assets Contiene estilos globales como las tipografías, y las clases para mostrar los errores con CSS.
components En esta carpeta se almacenan todos los componentes de la aplicación.
pages Se almacenan los contenedores de cada página del proyecto.
router Encargado de manejar las URL que son escritas por el cliente y redireccionar hacia la pagina correcta.



4. Uso
<div style = 'text-align: justify;'> Al ingresar, se muestra el dashboard, el cual aun esta en desarollo:</div>

Las vistas funcionales son Alumno, Maestros, Grupo, Materia, Periodo
En las cuales se realiza un CRUD

<br />

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
