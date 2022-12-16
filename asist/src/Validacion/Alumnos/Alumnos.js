import React, { useState } from 'react';
import '../../Validacion/Alumnos/Alumnos.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Alumnos from '../../pages/Alumnos';
import axios from "axios";
import * as Yup from "yup";
import {toast} from 'react-toastify';

const url = "http://127.0.0.1:8000/bd/v1/Alumno/";
const urlCarrera = "http://127.0.0.1:8000/bd/v1/Carrera/";



const alumnosSchema = Yup.object().shape({
  
  
  apellidoP: Yup.string()
    
    .required("Campo Requerido")
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),

    
  apellidoM: Yup.string()
    
    .required("Campo Requerido")
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),
    
  nombre: Yup.string()
    
    .required("Campo Requerido")
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),
    
  CURP: Yup.string()
    .required("Campo Requerido")
    .max(18, "Máximo 18 caracteres"),

  semestre: Yup.number()
    .required("Campo Requerido")
    .integer("Ingresa números enteros")
    .positive("Ingresa un número mayor que 0"),
  
  email: Yup.string()
    .email("Formato de correo invalido")
    .required("Campo Requerido"),
  
  id_carrera: Yup.number()
    .required("Campo Requerido")
   
});


const ValidacionAlumnos = (props) => {
  const notify = ( msg ) => toast( msg )

  return (

    <>

      <Formik

        initialValues={{
          apellidoP: '',
          apellidoM: '',
          nombre: '',
          CURP: '',
          semestre: '',
          correo: '',
          id_carrera: '',
          
        }}

        validationSchema={alumnosSchema}
        onSubmit={async(valores )=> {
          // same shape as initial values
          console.log(valores);
          await axios.post(url,valores).then(response => {
             
          }).catch(error => {
            //console.log(error.message);
            if( error.response === undefined ){
              notify( 'Comprueba todas las configuraciones!!' )
              alert("Favor de probar las configuraciones y Datos Error!")     
            }
            if( error.response.status === 401 && error.response.headers['content-type'] === 'application/xml; charset=UTF-8' ){
              notify( 'usa la configuración correcta en el header' )
              alert ("Posible fallo en le configuracion de header")
            }
            if( error.response.status === 401 && error.response.headers['content-type'] === 'application/json' ){
             notify( error.response.data.message )
             alert("Error en servidor 401")
             }
             if( error.response.status === 401 && error.response.headers['content-type'] === 'application/xml; charset=UTF-8' ){
              notify( 'Please, use a correct authentication header' )
              alert("Error 401 posible problema de autenticación")
            }
            if( error.response.status === 500 && error.response.headers['content-type'] === 'text/html; charset=utf-8' ){
              notify("Error en los datos, posible datos repetido error 500" )
              alert("Posible Registro repetido error 500")
             }
            
          })
          props.mod({ modalInsertar:false});
        }}
        
      >

        {({touched, errors}) => (

          <Form className="formulario">
            <div >
              <label htmlFor="nombre">Apellido Paterno</label>
              <Field
                
                type="text"
                name="apellidoP"
                placeholder="Apellido Paterno"
                id="apellidoP"
              />
              {touched.apellidoP && errors.apellidoP && <div className='error'>{errors.apellidoP}</div>}
              
            </div>

            <div >
              <label htmlFor="nombre">Apellido Materno</label>
              <Field
                
                type="text"
                name="apellidoM"
                placeholder="Apellido Materno"
                id="apellidoM"
              />
              {touched.apellidoM && errors.apellidoM && <div className='error'>{errors.apellidoM}</div>}
              
              
            </div>

            <div>
              <label htmlFor="nombre">Nombre</label>
              <Field
                
                type="text"
                name="nombre"
                placeholder="Nombre"
                id="nombre"
              />
              {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
             
            </div>

            <div >
              <label htmlFor="nombre">CURP</label>
              <Field
               
                type="text"
                name="CURP"
                placeholder="Agrega tu CURP"
                id="CURP"
              />
              {touched.CURP && errors.CURP && <div className='error'>{errors.CURP}</div>}
             
            </div>

            <div >
              <label htmlFor="semestre">Semestre</label>
              <Field
               
                type="text"
                name="semestre"
                placeholder="Agrega el semestre"
                id="semestre"
              />
              {touched.semestre && errors.semestre && <div className='error'>{errors.semestre}</div>}
              
            </div>
            <label htmlFor="nombre">carrera</label>
                        <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example"
                          name="id_carrera" id="id_carrera" onChange={this.handleChange}>
                          {props.dataCarrera.map(carrera => (
                            <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>))
                          }
                        </select>

            <div >
              <label htmlFor="correo">Correo Electrónico</label>
              <Field
                
                type="text"
                name="correo"
                placeholder="Correo: tunombre@algo.com"
                id="correo"
              />
              {touched.correo && errors.correo && <div className='error'>{errors.correo}</div>}
              
            </div>

            <button type="submit"  >Guardar</button>
          </Form>

        )}

      </Formik>


    </>

  );


}

export default ValidacionAlumnos;