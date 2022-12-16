import React, { useState } from 'react';
import '../../Validacion/Maestros/Maestros.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Master from '../../pages/Master/index';
import axios from "axios";
import * as Yup from "yup";

const url = "http://127.0.0.1:8000/bd/v1/Maestro/";



const maestrosSchema = Yup.object().shape({
    
  apellidoP: Yup.string()
    
    .required("Campo Requeridoo")
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),
    
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    //.matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Nombre Completo'),
    
  
  apellidoM: Yup.string()
    .required("Campo Requerido")
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    //.matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Descripción Completa'),

  nombre: Yup.string()
    .required("Campo Requerido")
    .min(3, "Mínimo 3 caracteres")
    .max(25, "Máximo 25 caracteres"),
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    //.matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Descripción Completa'),
  
  RFC: Yup.string()
    .required("Campo Requerido")
    .max(13, "Máximo 13 caracteres"),
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
   // .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Descripción Completa'),
});

const ValidacionMaestros = () => {
  

  return (

    <>

      <Formik

        initialValues={{
          apellidoP: '',
          apellidoM: '',
          nombre: '',
          RFC: ''
        }}

        validationSchema={maestrosSchema}
        onSubmit={async(valores )=> {
          // same shape as initial values
          console.log(valores);
          await axios.post(url,valores).then(response => {
           
          }).catch(error => {
            console.log(error.message);
          })
        }}
      >

        {({touched, errors}) => (

          <Form className="formulario">
            <div>
              <label htmlFor="apellidoP">Apellido Paterno</label>
              <Field
                type="text"
                name="apellidoP"
                placeholder="Apellido Paterno"
                id="apellidoP"
              />
              {touched.apellidoP && errors.apellidoP && <div className='error'>{errors.apellidoP}</div>}
              <ErrorMessage name="apellidoP" component="div" />
            </div>

            <div>
              <label htmlFor="apellidoM">Apellido Materno</label>
              <Field
                type="text"
                name="apellidoM"
                placeholder="Apellido Materno"
                id="apellidoM"
              />
              {touched.apellidoM && errors.apellidoM && <div className='error'>{errors.apellidoM}</div>}
              <ErrorMessage name="apellidoM" component="div" />
            </div>
            <div>
              <label htmlFor="nombre">Nombre del Docente</label>
              <Field
                type="text"
                name="nombre"
                placeholder="Nombre"
                id="nombre"
              />
              {touched.nombre && errors.nombre && <div className='error'>{errors.nombre}</div>}
              <ErrorMessage name="nombre" component="div" />
            </div>

            <div>
              <label htmlFor="RFC">RFC</label>
              <Field
                type="text"
                name="RFC"
                placeholder="Agrega el RFC"
                id="RFC"
              />
              {touched.RFC && errors.RFC && <div className='error'>{errors.RFC}</div>}
              <ErrorMessage name="RFC" component="div" />
            </div>

            <button type="submit"  >Guardar</button>
          </Form>

        )}

      </Formik>


    </>

  );


}

export default ValidacionMaestros;