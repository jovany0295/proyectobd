import React, { useState } from 'react';
import './App.css';
import Modal from './modalgraficas';
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


const url = "http://127.0.0.1:8000/bd/v1/Asistencia/";
var datostem = [30, 25, 23, 27, 24];
var etiquetastem = ['Luenes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

const App = () => {

  const peticionGet = () => {
    axios.get(url).then(response => {
      setvalue2({ datos2: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }

  const [tipografico, setTipografico] = useState("Grafica de Barras");
  const cambiarGrafico = async e => setTipografico(e.target.value);


  const Grafica = () => {

    if (tipografico == "Grafica de Barras") {
      return (
        <><Bar options={opciones} data={data} /></>
      )
    }

    if (tipografico == "Grafica de Puntos") {
      return (
        <><Line options={opciones} data={data} /></>
      )
    }

    if (tipografico == "Grafica de Pastel") {
      return (
        <><Pie options={opciones} data={data} /></>
      )
    }
  }

  const [tipofiltro, setTipofiltro] = useState("Por grupo");
  const cambiarFiltro = async e => {
    datostem = [];
    etiquetastem = [];

    for (var i = 0; i < value2.datos2.length; i++) {
      datostem.push(value2.datos2[i].diferencia);
      etiquetastem.push(value2.datos2[i].fecha);
    }

    console.log(datostem);

    console.log(etiquetastem);
    setTipofiltro(e.target.value);
  }

  const filtro = () => {

    if (tipofiltro == "Por alumno") {
      return (
        <>
          <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="idAlumno" id="idAlumno"
          >
            {value2.datos2.map(asistencia => (
              <option key={asistencia.idAlumno} value={asistencia.idAlumno}>{asistencia.idAlumno}</option>

            ))
            }
          </select>
        </>
      )

    }

    if (tipofiltro == "Por grupo") {
      return (
        <>
          <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name="idReunion" id="idReunion"
          >
            {value2.datos2.map(reunion => (
              <option key={reunion.idReunion} value={reunion.idReunion}>{reunion.idReunion}</option>))
            }

          </select>
        </>
      )
    }
  }


  const initialState = { datos: [30, 25, 23, 27, 24], etiquetas: ['Luenes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'], titulog: "Por semana" };
  const [value, setvalue] = useState(initialState);

  const handleChange = async e => {

    if (e.target.value == "Por semana") {
      setvalue(prevState => ({
        ...prevState, datos: [30, 25, 23, 27, 24],
        etiquetas: ['Luenes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
        titulog: "Por semana"
      }));
    }
    if (e.target.value == "Por mes") {
      setvalue(prevState => ({
        ...prevState,
        datos: [120, 117, 118, 121],
        etiquetas: ['semana 1', 'semana 2', 'semana 3', 'semana 4'],
        titulog: "Por mes"
      }));
    }
    if (e.target.value == "Por año") {
      setvalue(prevState => ({
        ...prevState,
        datos: [1120, 1117, 1181, 1211, 1130, 1217, 1381, 1231, 1130, 1317, 1121, 1241],
        etiquetas: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nombiembre', 'Diciembre'],
        titulog: "Por año"
      }));
    }

  }

  const data = {
    labels: etiquetastem,
    datasets: [{
      label: 'registro',
      backgroundColor: 'rgba(53, 162, 235, 0.4)',
      borderColor: "rgb(53, 162, 235)",
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0,255,0,0.2)',
      hoverBorderColor: "#FF0000",
      data: datostem
    }]
  };


  const initialState2 = { datos2: [], datos3: [] };
  const [value2, setvalue2] = useState(initialState2);

  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }

  const optipog = [
    { value: 'Grafica de Barras', label: 'Grafico de Barras' },
    { value: 'Grafica de Puntos', label: 'Grafica de Puntos' },
    { value: 'Grafica de Pastel', label: 'Grafica de Pastel' }
  ]

  const optipof = [
    { value: 'Por grupo', label: 'Por grupo' },
    { value: 'Por alumno', label: 'Por alumno' },
  ]

  const opperidos = [
    { value: 'Por semana', label: 'Por semana' },
    { value: 'Por mes', label: 'Por mes' },
    { value: 'Por año', label: 'Por año' }
  ]

  { peticionGet() }

  return (

    <div className='App contenedor' style={{ height: '500px' }}>


      <div class='row'>


        <div class='col-4' className='contenedoropciones'>
          <h2>Historial de asistencias</h2>

          <br />

          <select class="form-select form-select-lg mb-3 seleccion"
            aria-label=".form-select-lg example"
            onChange={cambiarGrafico}>
            {optipog.map(tipo => (
              <option key={tipo.value} value={tipo.value} >{tipo.value}</option>))
            }
          </select>

          <select class="form-select form-select-lg mb-3 seleccion"
            aria-label=".form-select-lg example"
            onChange={cambiarFiltro}
          >
            {optipof.map(tipo => (
              <option key={tipo.value} value={tipo.value} >{tipo.value}</option>))
            }
          </select>


          {filtro()}


          <select class="form-select form-select-lg mb-3 seleccion"
            aria-label=".form-select-lg example"
            onChange={handleChange}>
            {opperidos.map(perido => (
              <option key={perido.value} value={perido.value} >{perido.value}</option>))
            }
          </select>

        </div>
        <div class='col-8' className='contenedorgrafico'>

          {Grafica()}


        </div>

      </div>


    </div>

  );


}

export default App;