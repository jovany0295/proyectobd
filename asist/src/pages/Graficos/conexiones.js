import axios from "axios";

const url = "http://127.0.0.1:8000/bd/v1/Asistencia/";
const urlreunion = "http://127.0.0.1:8000/bd/v1/Reunion/";
const urlalumnos = "http://127.0.0.1:8000/bd/v1/Alumno/";
const urlclase = "http://127.0.0.1:8000/bd/v1/Clase/";

export function Conexion(props) {
    if (!props.listaAsistencias && !props.listaAlumnos && !props.listaClases && !props.listaReunion) {

        axios.get(url).then(response => {
            props.setListaAsistencias(response.data)
        }).catch(error => {
            console.log(error.message);
        })

        axios.get(urlreunion).then(response => {
            props.setListaReunion(response.data)
        }).catch(error => {
            console.log(error.message);
        })

        axios.get(urlalumnos).then(response => {
            props.setListaAlumno(response.data)
            props.setNombreAlumno(response.data[0].apellidoP+" "+response.data[0].apellidoM+" "+response.data[0].nombre)
        }).catch(error => {
            console.log(error.message);
        })

        axios.get(urlclase).then(response => {
            props.setListaClases(response.data)
            props.setNombreClase(response.data[0].nombre)
        }).catch(error => {
            console.log(error.message);
        })

    }

    
}