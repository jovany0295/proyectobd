import React, { useState } from 'react';
import './App.css';


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

import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";


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


const App = () => {

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
    labels: value.etiquetas,
    datasets: [{
      label: value.titulog,
      backgroundColor: 'rgba(53, 162, 235, 0.4)',
      borderColor: "rgb(53, 162, 235)",
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0,255,0,0.2)',
      hoverBorderColor: "#FF0000",
      data: value.datos
    }]
  };

  const data2 = {
    labels: value.etiquetas,
    datasets: [{
      label: value.titulog,
      backgroundColor: 'rgba(53, 162, 235, 0.4)',
      borderColor: "rgb(53, 162, 235)",
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(0,255,0,0.2)',
      hoverBorderColor: "#FF0000",
      data: value.datos
    }]
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }

  const optipo = [
    { value: 'Grafica de Barras', label: 'Grafico de Barras' },
    { value: 'Grafica de Puntos', label: 'Grafica de Puntos' },
    { value: 'Grafica de Pastel', label: 'Grafica de Pastel' }
  ]

  const opperidos = [
    { value: 'Por semana', label: 'Por semana' },
    { value: 'Por mes', label: 'Por mes' },
    { value: 'Por año', label: 'Por año' }
  ]

  return (

    <div className='App contenedor' style={{ height: '500px' }}>


      <div class='row'>


        <div class='col-4' className='contenedoropciones'>
          <h2>Historial de asistencias</h2>

          <br />

          <select class="form-select form-select-lg mb-3 seleccion"
            aria-label=".form-select-lg example"
            onChange={cambiarGrafico}>
            {optipo.map(tipo => (
              <option key={tipo.value} value={tipo.value} >{tipo.value}</option>))
            }
          </select>

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