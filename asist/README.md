# Integrantes
Jovany Yair Patiño Rayo




<p style='text-align: center;'> Documentación Técnica PoC Risk Calculator para Nubentos.


Tabla de Contenidos
1. Tecnologías utilizadas	
2. Instalación y ejecución del proyecto
    2.1 Configuración	
3. Estructura de carpetas
4. Plantilla general del portal
5. Uso
    5.1 Datos de configuración	
6. Resultados	
<br /> <br />

1. Tecnologías Utilizadas
<div style='text-align: justify;'> Para la construcción del Front-End del portal Web, se utilizaron las siguientes librerías: </div>

react v17.0.2 (Librería utilizada para la construcción de sitios web dinámicos)
chart.js v3.7.1 (Librería de Javascript utilizará para generar gráficos)
formik v2.2.9 (Librería utilizada para controlar el estado de los formularios en React)
yup 0.32.11 (Librería utilizada para realizar validaciones de los formularios)
axios v0.26.1 (Librería utilizada para hacer las peticiones hacia las APIs que serán utilizadas) <br /> <div style='text-align: justify;'> Existen más librerías dentro del proyecto, que pueden ser visualizadas en el archivo package.json, pero en general, las mencionadas previamente, son las más importantes. </div>


# Instalación
Suponiendo que ya se tiene instalado NodeJs, solo se clona el proyecto y se realiza lo siguiente

npm install //Instalar los paquetes y dependencias de NodeJs

# Framework de Estilos 
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @mui/icons-material

Por dificultades optamos por utilizar a la par los estilos de boostrap 

npm install reactstrap react react-dom

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
