import React, { useState } from 'react';
import '../../Validacion/Periodos/Periodos.css';
import { Formik, Form, Field, ErrorMessage, setIn } from 'formik';
import Reunion from '../../pages/Reunion';
import axios from "axios";
import * as Yup from "yup";

const url = "http://127.0.0.1:8000/bd/v1/Reunion/";

const reunionSchema = Yup.object().shape({
    
  
  
  cantidad_alumnos:  Yup.number()
    .integer("Ingresa números enteros")
    .positive("Ingresa un número mayor que 0"),

  fecha: Yup.date()
    .required("campo Requerido"),
  
  detalle: Yup.string()
    .required("Campo Requerido")
    .min(5, "Mínimo 5 caracteres")
    //.matches(/^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi ,"Sólo caracteres latinos.")
    .matches(/^\s*[\S]+(\s[\S]+)+\s*$/gms, 'Periodo completo'),

  idclase: Yup.number()
    .integer("Ingresa números enteros")
    .positive("Ingresa un número mayor que 0"),
      
});

const ValidacionReunion = () => {
  
  
  return (

    <>

      <Formik

        initialValues={{
         
          cantidad_alumnos: '',
          fecha: '',
          detalle: '',
          idclase: '',
        }}

       
        validationSchema={reunionSchema}
        onSubmit={async(valores )=> {
          // same shape as initial values
          console.log(valores);
          await axios.post(url,valores).then(response => {
            Reunion.modalInsertar();
           // Materias2.peticionGet(); 
          }).catch(error => {
            console.log(error.message);
          })
        }}
        
      >

        {({touched, errors}) => (

          <Form className="formulario">
            

            <div>
              <label htmlFor="cantidad de alumnos">Descripcion</label>
              <Field
                type="text"
                name="cantidadalumnos"
                placeholder="Agrega la cantidad de alumnos"
                id="cantidadalumnos"
              />
              {touched.cantidad_alumnos && errors.cantidad_alumnos && <div className='error'>{errors.cantidad_alumnos}</div>}
              <ErrorMessage name="cantidadalumnos" component="div" />
            </div>

            <div>
              <label htmlFor="Fecha">Fecha</label>
              <Field
                type="text"
                name="Fecha"
                placeholder="Agrega la Fecha"
                id="Fecha"
              />
              {touched.fecha && errors.fecha && <div className='error'>{errors.fecha}</div>}
              <ErrorMessage name="Fecha" component="div" />
            </div>

            <div>
              <label htmlFor="Detalle">Fecha</label>
              <Field
                type="text"
                name="detalle"
                placeholder="Agrega los Detalles"
                id="detalle"
              />
              {touched.detalle && errors.detalle && <div className='error'>{errors.detalle}</div>}
              <ErrorMessage name="Detalle" component="div" />
            </div>

            <div>
              <label htmlFor="Clase">Fecha</label>
              <Field
                type="text"
                name="idclase"
                placeholder="Agrega el ID c"
                id="detalle"
              />
              {touched.idclase && errors.idclase && <div className='error'>{errors.idclase}</div>}
              <ErrorMessage name="idclase" component="div" />
            </div>

            <button type="submit" >Guardar</button>
          </Form>

        )}

      </Formik>


    </>

  );


}

export default ValidacionReunion;