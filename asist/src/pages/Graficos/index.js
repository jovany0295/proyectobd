import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

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


function App() {

  const url = "http://127.0.0.1:8000/bd/v1/Asistencia/";
  const urlreunion = "http://127.0.0.1:8000/bd/v1/Reunion/";
  const urlalumnos = "http://127.0.0.1:8000/bd/v1/Alumno/";
  const urlclase = "http://127.0.0.1:8000/bd/v1/Clase/";

  const [listaAsistencias, setvalueAsistencia] = useState([]);
  const [listaReunion, setvalueReunion] = useState([]);
  const [listaAlumnos, setvalueAlumnos] = useState([]);
  const [listaClases, setvalueClases] = useState([]);

  const peticionGet = () => {
    axios.get(url).then(response => {
      setvalueAsistencia(response.data)
    }).catch(error => {
      console.log(error.message);
    })
  }

  const peticionGetReunion = () => {
    axios.get(urlreunion).then(response => {
      setvalueReunion(response.data)
    }).catch(error => {
      console.log(error.message);
    })
  }

  const peticionGetAlumno = () => {
    axios.get(urlalumnos).then(response => {
      setvalueAlumnos(response.data)
    }).catch(error => {

      console.log(error.message);
    })
  }

  const peticionGetClases = () => {
    axios.get(urlclase).then(response => {
      setvalueClases(response.data)
    }).catch(error => {
      console.log(error.message);
    })
  }

  useEffect(() => {
    peticionGetAlumno()
    peticionGetReunion()
    peticionGet()
    peticionGetClases()
  }, [])


  const [tipografico, setTipografico] = useState("btnradioP");
  const cambiarGrafica = async e => setTipografico(e.target.id);


  const Grafica = () => {

    if (tipografico == "btnradioB") {
      return (
        <><Bar options={opciones} data={data} /></>
      )
    }

    if (tipografico == "btnradioP") {
      return (
        <><Line options={opciones} data={data} /></>
      )
    }
  }

  const [datos, setDatos] = useState([]);
  const [datosRetardos, setRetardos] = useState([]);
  const [datosFaltas, setFaltas] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [titulo, setTitulo] = useState();

  const data = {
    labels: etiquetas,
    datasets: [
      {
        label: 'Asistencias',
        data: datos,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1,
      },
      {
        label: 'Retardos',
        data: datosRetardos,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderWidth: 1,
      },
      {
        label: 'Faltas',
        data: datosFaltas,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
      },
    ],
  };


  const [totalAsistencias, setTotalAsistencias] = useState([]);

  const data2 = {
    labels: ['asistencias', 'retardos', 'faltas'],
    datasets: [
      {
        label: '# Total: ',
        data: totalAsistencias,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }

  const [formaDatos, setformaDatos] = useState("btnradioGrupos");

  const filtro = () => {

    if (formaDatos == "btnradioGrupos") {
      return (
        <>
          <select class="form-select form-select-lg mb-3 seleccion"
            aria-label=".form-select-lg example"
            id='selectgrupo'
            onChange={actualizarDatos}
          >
            {listaClases.map(e => (
              <option key={e.nombre} value={e.nombre} >{e.nombre}</option>))
            }
          </select>

        </>
      );

    }

    if (formaDatos == "btnradioAlumnos") {
      return (
        <>
          <select class="form-select form-select-lg mb-3 seleccion"
            aria-label=".form-select-lg example"
            id='selectalumno'
            onChange={actualizarDatos}
          >
            {listaAlumnos.map(e => (
              <option key={e.nombre} value={e.apellidoP + " " + e.apellidoM + " " + e.nombre} >{e.apellidoP + " " + e.apellidoM + " " + e.nombre}</option>))
            }
          </select>
        </>
      );
    }


  }

  const [TipoPeriodo, setTipoPeriodo] = useState("mes");


  const [dateRange, setDateRange] = useState([null, null]);
  const [startDateRange, endDate] = dateRange;


  const periodo = () => {

    if (TipoPeriodo == "mes") {
      return (
        <>
          <DatePicker
            selected={startDate}
            onChange={seleccionMes}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            showFullMonthYearPicker
            showFourColumnMonthYearPicker
            className="form-control"
            id='fechaMes'
          />

        </>
      );
    }

    if (TipoPeriodo == "anio") {
      return (
        <>
          <DatePicker
            selected={startDate}
            onChange={seleccionAnio}
            showYearPicker
            dateFormat="yyyy"
            yearItemNumber={4}
            className="form-control"
            id='fechaAnio'
          />
        </>
      );
    }

    if (TipoPeriodo == "rangos") {
      return (
        <>
          <DatePicker
            selectsRange={true}
            startDate={startDateRange}
            endDate={endDate}
            onChange={seleccionRango}
            dateFormat="dd/MM/yyyy"
            className="form-control"
            isClearable={true}
            id='fechaRango'
          />
        </>
      );
    }


  }

  const actualizarDatos = () => {

    if (TipoPeriodo == 'mes') {
      seleccionMes(startDate)
    }

    if (TipoPeriodo == 'anio') {
      seleccionAnio(startDate)
    }
  }

  const seleccionMes = async e => {

    setStartDate(e)

    if (formaDatos == "btnradioGrupos") {

      setEtiquetas(listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == e.getMonth() + 1 &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.fecha; }))

      const numAsistencias = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == e.getMonth() + 1 &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias; })

      const numRetardos = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == e.getMonth() + 1 &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas; })

      const numFaltas = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == e.getMonth() + 1 &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos; })

      setDatos(numAsistencias)
      setRetardos(numRetardos)
      setFaltas(numFaltas)

      setTotalAsistencias([numAsistencias.reduce((a, b) => a + b, 0), numRetardos.reduce((a, b) => a + b, 0), numFaltas.reduce((a, b) => a + b, 0)])

    }

    if (formaDatos == "btnradioAlumnos") {

      setEtiquetas(listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == e.getMonth() + 1 &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.Fecha; }))

      setDatos(listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == e.getMonth() + 1 &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.diferencia; }))

      const numAsistencias = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == e.getMonth() + 1 &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion; })

      console.log(numAsistencias)

      var tempAsistencias = 0
      var tempRetardos = 0
      var tempFaltas = 0

      for (var i = 0; i < numAsistencias.length; i++) {
        if(numAsistencias[i]=='asistio') tempAsistencias+=1
        if(numAsistencias[i]=='retardo') tempRetardos+=1
        if(numAsistencias[i]=='falta') tempFaltas+=1
        
      }

      setRetardos([])
      setFaltas([])
     setTotalAsistencias([tempAsistencias, tempRetardos, tempFaltas])


    }
  }

  const seleccionAnio = async e => {

    setStartDate(e);

    if (formaDatos == "btnradioGrupos") {

      const numAsistencias01 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '01' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos01 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '01' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas01 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '01' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias02 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '02' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos02 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '02' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas02 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '02' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })


      const numAsistencias03 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '03' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos03 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '03' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas03 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '03' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias04 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '04' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos04 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '04' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas04 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '04' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias05 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '05' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos05 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '05' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas05 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '05' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias06 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '06' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos06 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '06' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas06 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '06' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias07 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '07' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos07 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '07' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas07 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '07' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias08 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '08' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos08 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '08' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas08 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '08' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias09 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '09' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos09 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '09' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas09 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '09' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias10 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '10' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos10 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '10' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas10 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '10' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias11 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '11' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos11 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '11' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas11 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '11' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      const numAsistencias12 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '12' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.asistencias })

      const numRetardos12 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '12' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.retardos })

      const numFaltas12 = listaReunion.filter(e2 =>
        e2.idClase == document.getElementById('selectgrupo').value &&
        e2.fecha.substring(5, 7) == '12' &&
        e2.fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.faltas })

      setDatos([
        numAsistencias01.reduce((a, b) => a + b, 0),
        numAsistencias02.reduce((a, b) => a + b, 0),
        numAsistencias03.reduce((a, b) => a + b, 0),
        numAsistencias04.reduce((a, b) => a + b, 0),
        numAsistencias05.reduce((a, b) => a + b, 0),
        numAsistencias06.reduce((a, b) => a + b, 0),
        numAsistencias07.reduce((a, b) => a + b, 0),
        numAsistencias08.reduce((a, b) => a + b, 0),
        numAsistencias09.reduce((a, b) => a + b, 0),
        numAsistencias10.reduce((a, b) => a + b, 0),
        numAsistencias11.reduce((a, b) => a + b, 0),
        numAsistencias12.reduce((a, b) => a + b, 0)
      ])

      setFaltas([
        numFaltas01.reduce((a, b) => a + b, 0),
        numFaltas02.reduce((a, b) => a + b, 0),
        numFaltas03.reduce((a, b) => a + b, 0),
        numFaltas04.reduce((a, b) => a + b, 0),
        numFaltas05.reduce((a, b) => a + b, 0),
        numFaltas06.reduce((a, b) => a + b, 0),
        numFaltas07.reduce((a, b) => a + b, 0),
        numFaltas08.reduce((a, b) => a + b, 0),
        numFaltas09.reduce((a, b) => a + b, 0),
        numFaltas10.reduce((a, b) => a + b, 0),
        numFaltas11.reduce((a, b) => a + b, 0),
        numFaltas12.reduce((a, b) => a + b, 0)
      ])

      setRetardos([
        numRetardos01.reduce((a, b) => a + b, 0),
        numRetardos02.reduce((a, b) => a + b, 0),
        numRetardos03.reduce((a, b) => a + b, 0),
        numRetardos04.reduce((a, b) => a + b, 0),
        numRetardos05.reduce((a, b) => a + b, 0),
        numRetardos06.reduce((a, b) => a + b, 0),
        numRetardos07.reduce((a, b) => a + b, 0),
        numRetardos08.reduce((a, b) => a + b, 0),
        numRetardos09.reduce((a, b) => a + b, 0),
        numRetardos10.reduce((a, b) => a + b, 0),
        numRetardos11.reduce((a, b) => a + b, 0),
        numRetardos12.reduce((a, b) => a + b, 0)

      ])

      setEtiquetas(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'])
      setTotalAsistencias([
        numAsistencias01.reduce((a, b) => a + b, 0) +
        numAsistencias02.reduce((a, b) => a + b, 0) +
        numAsistencias03.reduce((a, b) => a + b, 0) +
        numAsistencias04.reduce((a, b) => a + b, 0) +
        numAsistencias05.reduce((a, b) => a + b, 0) +
        numAsistencias06.reduce((a, b) => a + b, 0) +
        numAsistencias07.reduce((a, b) => a + b, 0) +
        numAsistencias08.reduce((a, b) => a + b, 0) +
        numAsistencias09.reduce((a, b) => a + b, 0) +
        numAsistencias10.reduce((a, b) => a + b, 0) +
        numAsistencias11.reduce((a, b) => a + b, 0) +
        numAsistencias12.reduce((a, b) => a + b, 0),

        numRetardos01.reduce((a, b) => a + b, 0) +
        numRetardos02.reduce((a, b) => a + b, 0) +
        numRetardos03.reduce((a, b) => a + b, 0) +
        numRetardos04.reduce((a, b) => a + b, 0) +
        numRetardos05.reduce((a, b) => a + b, 0) +
        numRetardos06.reduce((a, b) => a + b, 0) +
        numRetardos07.reduce((a, b) => a + b, 0) +
        numRetardos08.reduce((a, b) => a + b, 0) +
        numRetardos09.reduce((a, b) => a + b, 0) +
        numRetardos10.reduce((a, b) => a + b, 0) +
        numRetardos11.reduce((a, b) => a + b, 0) +
        numRetardos12.reduce((a, b) => a + b, 0),

        numFaltas01.reduce((a, b) => a + b, 0) +
        numFaltas02.reduce((a, b) => a + b, 0) +
        numFaltas03.reduce((a, b) => a + b, 0) +
        numFaltas04.reduce((a, b) => a + b, 0) +
        numFaltas05.reduce((a, b) => a + b, 0) +
        numFaltas06.reduce((a, b) => a + b, 0) +
        numFaltas07.reduce((a, b) => a + b, 0) +
        numFaltas08.reduce((a, b) => a + b, 0) +
        numFaltas09.reduce((a, b) => a + b, 0) +
        numFaltas10.reduce((a, b) => a + b, 0) +
        numFaltas11.reduce((a, b) => a + b, 0) +
        numFaltas12.reduce((a, b) => a + b, 0)

      ])
    }

    if (formaDatos == "btnradioAlumnos") {

      const numAsistencias01 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '01' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias02 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '02' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias03 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '03' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias04 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '04' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias05 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '05' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias06 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '06' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias07 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '07' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias08 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '08' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias09 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '09' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias10 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '10' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias11 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '11' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      const numAsistencias12 = listaAsistencias.filter(e2 =>
        e2.idAlumno == document.getElementById('selectalumno').value &&
        e2.Fecha.substring(5, 7) == '12' &&
        e2.Fecha.substring(0, 4) == e.getFullYear()
      ).map(function (clase) { return clase.accion })

      console.log(numAsistencias12)

      const NumAsistencias = []
      const NumRetardos = []
      const NumFaltas = []
      var tempAsistencias = 0
      var tempRetardos = 0
      var tempFaltas = 0

      for (var i = 0; i < numAsistencias01.length; i++) {
        if(numAsistencias01[i]=='asistio') tempAsistencias+=1
        if(numAsistencias01[i]=='retardo') tempRetardos+=1
        if(numAsistencias01[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias02.length; i++) {
        if(numAsistencias02[i]=='asistio') tempAsistencias+=1
        if(numAsistencias02[i]=='retardo') tempRetardos+=1
        if(numAsistencias02[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias03.length; i++) {
        if(numAsistencias03[i]=='asistio') tempAsistencias+=1
        if(numAsistencias03[i]=='retardo') tempRetardos+=1
        if(numAsistencias03[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias04.length; i++) {
        if(numAsistencias04[i]=='asistio') tempAsistencias+=1
        if(numAsistencias04[i]=='retardo') tempRetardos+=1
        if(numAsistencias04[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias05.length; i++) {
        if(numAsistencias05[i]=='asistio') tempAsistencias+=1
        if(numAsistencias05[i]=='retardo') tempRetardos+=1
        if(numAsistencias05[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias06.length; i++) {
        if(numAsistencias06[i]=='asistio') tempAsistencias+=1
        if(numAsistencias06[i]=='retardo') tempRetardos+=1
        if(numAsistencias06[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias07.length; i++) {
        if(numAsistencias07[i]=='asistio') tempAsistencias+=1
        if(numAsistencias07[i]=='retardo') tempRetardos+=1
        if(numAsistencias07[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias08.length; i++) {
        if(numAsistencias08[i]=='asistio') tempAsistencias+=1
        if(numAsistencias08[i]=='retardo') tempRetardos+=1
        if(numAsistencias08[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias09.length; i++) {
        if(numAsistencias09[i]=='asistio') tempAsistencias+=1
        if(numAsistencias09[i]=='retardo') tempRetardos+=1
        if(numAsistencias09[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias10.length; i++) {
        if(numAsistencias10[i]=='asistio') tempAsistencias+=1
        if(numAsistencias10[i]=='retardo') tempRetardos+=1
        if(numAsistencias10[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias11.length; i++) {
        if(numAsistencias11[i]=='asistio') tempAsistencias+=1
        if(numAsistencias11[i]=='retardo') tempRetardos+=1
        if(numAsistencias11[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      tempAsistencias = 0
      tempRetardos = 0
      tempFaltas = 0

      for (var i = 0; i < numAsistencias12.length; i++) {
        if(numAsistencias12[i]=='asistio') tempAsistencias+=1
        if(numAsistencias12[i]=='retardo') tempRetardos+=1
        if(numAsistencias12[i]=='falta') tempFaltas+=1
        
      }
      NumAsistencias.push(tempAsistencias);
      NumRetardos.push(tempRetardos);
      NumFaltas.push(tempRetardos);

      setRetardos([])
      setFaltas([])
      setEtiquetas(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'])
      setDatos(NumAsistencias)
   
    }
  }

  const seleccionRango = async e => {
    setDateRange(e);

    if (e[0] && e[1]) {

      e[0].setDate(e[0].getDate() - 1);

      if (formaDatos == "btnradioGrupos") {

        setEtiquetas(listaReunion.filter(e2 =>
          e2.idClase == document.getElementById('selectgrupo').value &&
          new Date(e2.fecha).getTime() > e[0].getTime() &&
          new Date(e2.fecha).getTime() < e[1].getTime()

        ).map(function (clase) { return clase.fecha; }))

        const numAsistencias = listaReunion.filter(e2 =>
          e2.idClase == document.getElementById('selectgrupo').value &&
          new Date(e2.fecha).getTime() > e[0].getTime() &&
          new Date(e2.fecha).getTime() < e[1].getTime()
        ).map(function (clase) { return clase.asistencias; })

        const numRetardos = listaReunion.filter(e2 =>
          e2.idClase == document.getElementById('selectgrupo').value &&
          new Date(e2.fecha).getTime() > e[0].getTime() &&
          new Date(e2.fecha).getTime() < e[1].getTime()
        ).map(function (clase) { return clase.faltas; })

        const numFaltas = listaReunion.filter(e2 =>
          e2.idClase == document.getElementById('selectgrupo').value &&
          new Date(e2.fecha).getTime() > e[0].getTime() &&
          new Date(e2.fecha).getTime() < e[1].getTime()
        ).map(function (clase) { return clase.retardos; })

        setDatos(numAsistencias)
        setRetardos(numRetardos)
        setFaltas(numFaltas)

        setTotalAsistencias([numAsistencias.reduce((a, b) => a + b, 0), numRetardos.reduce((a, b) => a + b, 0), numFaltas.reduce((a, b) => a + b, 0)])


      }
    }
  }

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    actualizarDatos()
  }, [TipoPeriodo, listaReunion])

  return (

    <div className='App contenedor' style={{ height: '500px' }}>
      <div class='row g-3"'>

        <div class='col-md-4'>

          <div className='contenedoropciones2'>
            <br />

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

              <input type="radio" class="btn-check" name="btnradiofiltro" id="btnradioGrupos" defaultChecked onChange={e => setformaDatos(e.target.id)} />
              <label class="btn btn-outline-primary" for="btnradioGrupos" >Por clase</label>

              <input type="radio" class="btn-check" name="btnradiofiltro" id="btnradioAlumnos" onChange={e => setformaDatos(e.target.id)} />
              <label class="btn btn-outline-primary" for="btnradioAlumnos" >Por alumno</label>

            </div>

            <br /><br />

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

              <input type="radio" class="btn-check" name="periodo" id="mes" defaultChecked onChange={e => setTipoPeriodo(e.target.id)} />
              <label class="btn btn-outline-primary" for="mes" >Mensual</label>

              <input type="radio" class="btn-check" name="periodo" id="anio" onChange={e => setTipoPeriodo(e.target.id)} />
              <label class="btn btn-outline-primary" for="anio" >Anual</label>

              <input type="radio" class="btn-check" name="periodo" id="rangos" onChange={e => setTipoPeriodo(e.target.id)} />
              <label class="btn btn-outline-primary" for="rangos" >Personalizar</label>

            </div>
            <hr />

            {filtro()}
            {periodo()}

            <div className='estiloGpastel'>
              <Pie options={opciones} data={data2} />
            </div>



          </div>

        </div>

        <div class='col-md-8'>

          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

            <input type="radio" class="btn-check" name="btnradio" id="btnradioP" defaultChecked onChange={cambiarGrafica} />
            <label class="btn btn-outline-primary" for="btnradioP" >Grafica de Puntos</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradioB" onChange={cambiarGrafica} />
            <label class="btn btn-outline-primary" for="btnradioB" >Grafica de Barras</label>

          </div>

          <div className='estiloGraficas'>
            {Grafica()}
          </div>


        </div>


      </div>


    </div>

  );

}

export default App;