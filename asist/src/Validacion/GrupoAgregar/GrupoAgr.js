import React, { useState } from 'react';
import '../../Validacion/GrupoAgregar/GrupoAgr.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Grupo from '../../pages/Grupo';
import axios from "axios";
import * as Yup from "yup";
import { modalClasses, useThemeProps } from '@mui/material';
import {toast} from 'react-toastify';

const url = "http://127.0.0.1:8000/bd/v1/Reunion/";

const grupoagrSchema = Yup.object().shape({
    
  
  nombre: Yup.string()
  .required("Campo Requerido")
  .min(5, "Mínimo 5 caracteres"),
  //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
  //.matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Periodo completo'),

  cantidad_alumnos:  Yup.number()
    .required("Campo Requerido")
    .integer("Ingresa números enteros")
    .positive("Ingresa un número mayor que 0"),  
});

const ValidacionGrupoagr = (props) => {
  
  const notify = ( msg ) => toast( msg )
  return (

    <>

      <Formik

        initialValues={{
          nombre: '',
          cantidad_alumnos: ''
          
        }}
        validationSchema={grupoagrSchema}
        onSubmit={async(valores )=> {
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

            <div>
              <label htmlFor="cantidad de alumnos">Nombre</label>
              <Field
                type="text"
                name="Nombre"
                placeholder="Agrega el nombre del grupo: 603"
                id="nombre"
              />
              {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
             
            </div>
            <div>
              <label htmlFor="cantidad de alumnos">Cantidad de Alumnos</label>
              <Field
                type="text"
                name="cantidad_alumnos"
                placeholder="Agrega la cantidad de alumnos"
                id="cantidad_alumnos"
              />
              {touched.cantidad_alumnos && errors.cantidad_alumnos && <div className='error'>{errors.cantidad_alumnos}</div>}
             
            </div>
            <button type="submit" >Guardar</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ValidacionGrupoagr;