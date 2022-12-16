import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { seleccionMes, seleccionAnio, seleccionRango } from './filtros';

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

const opciones = {
  maintainAspectRatio: false,
  responsive: true
}

var etiquetas = []
var asistencias = []
var retardos = []
var faltas = []

var totalAsistencias = []



export function Graficas(props) {

  if (props.listaReunion && props.listaAsistencias) {

    if (props.TipoPeriodo == 'mes') {
      [etiquetas, asistencias, retardos, faltas] = seleccionMes(props.TipoDatos, props.listaReunion, props.listaAsistencias, props.startDate, props.NombreClase, props.NombreAlumno)
    }

    if (props.TipoPeriodo == 'anio') {
      [etiquetas, asistencias, retardos, faltas] = seleccionAnio(props.TipoDatos, props.listaReunion, props.listaAsistencias, props.startDate, props.NombreClase, props.NombreAlumno)
    }

    if (props.TipoPeriodo == 'rangos' && props.dateRange[0] && props.dateRange[1]) {
      [etiquetas, asistencias, retardos, faltas] = seleccionRango(props.TipoDatos, props.listaReunion, props.listaAsistencias, props.startDate, props.NombreClase, props.NombreAlumno, props.dateRange)
    }

    const data = {
      labels: etiquetas,
      datasets: [
        {
          label: 'Asistencias',
          data: asistencias,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderWidth: 1,
        },
        {
          label: 'Retardos',
          data: retardos,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 1,
        },
        {
          label: 'Faltas',
          data: faltas,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1,
        },
      ],
    };


    if (props.Grafico == "btnradioP") {

      return (
        <><Line options={opciones} data={data} /></>
      )
    }

    if (props.Grafico == "btnradioB") {
      return (
        <><Bar options={opciones} data={data} /></>
      )
    }

  }


}

export function Filtro(props) {

  if (props.TipoDatos == "btnradioGrupos" && props.listaClases) {
    return (
      <>
        <select class="form-select form-select-lg mb-3 seleccion"
          aria-label=".form-select-lg example"
          id='selectgrupo'
          onChange={e => props.setNombreClase(e.target.value)}
        >
          {props.listaClases.map(e => (
            <option key={e.nombre} value={e.nombre} >{e.nombre}</option>))
          }
        </select>

      </>
    );

  }

  if (props.TipoDatos == "btnradioAlumnos" && props.listaAlumnos) {
    return (
      <>
        <select class="form-select form-select-lg mb-3 seleccion"
          aria-label=".form-select-lg example"
          id='selectgrupo'
          onChange={e => props.setNombreClase(e.target.value)}
        >
          {props.listaClases.map(e => (
            <option key={e.nombre} value={e.nombre} >{e.nombre}</option>))
          }
        </select>

        <select class="form-select form-select-lg mb-3 seleccion"
          aria-label=".form-select-lg example"
          id='selectalumno'
          onChange={e => props.setNombreAlumno(e.target.value)}
        >
          {props.listaAlumnos.map(e => (
            <option key={e.nombre} value={e.apellidoP + " " + e.apellidoM + " " + e.nombre} >{e.apellidoP + " " + e.apellidoM + " " + e.nombre}</option>))
          }
        </select>
      </>
    );
  }

}

export const Periodo = (props) => {

  if (props.TipoPeriodo == "mes") {
    return (
      <>
        <DatePicker
          selected={props.startDate}
          onChange={e => props.setStartDate(e)}
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

  if (props.TipoPeriodo == "anio") {
    return (
      <>
        <DatePicker
          selected={props.startDate}
          onChange={e => props.setStartDate(e)}
          showYearPicker
          dateFormat="yyyy"
          yearItemNumber={4}
          className="form-control"
          id='fechaAnio'
        />
      </>
    );
  }

  if (props.TipoPeriodo == "rangos") {
    return (
      <>
        <DatePicker
          selectsRange={true}
          startDate={props.startDateRange}
          endDate={props.endDate}
          onChange={e => props.setDateRange(e)}
          dateFormat="dd/MM/yyyy"
          className="form-control"
          isClearable={true}
          id='fechaRango'
        />
      </>
    );
  }
}

export function GraficaPastel(props) {

  if (props.listaReunion && props.listaAsistencias) {

    if (props.TipoPeriodo == 'mes') {
      [etiquetas, asistencias, retardos, faltas, totalAsistencias] = seleccionMes(props.TipoDatos, props.listaReunion, props.listaAsistencias, props.startDate, props.NombreClase, props.NombreAlumno)
      
      console.log(totalAsistencias)
    }

    if (props.TipoPeriodo == 'anio') {
      [etiquetas, asistencias, retardos, faltas, totalAsistencias] = seleccionAnio(props.TipoDatos, props.listaReunion, props.listaAsistencias, props.startDate, props.NombreClase, props.NombreAlumno)
    }

    if (props.TipoPeriodo == 'rangos' && props.dateRange[0] && props.dateRange[1]) {
      [etiquetas, asistencias, retardos, faltas, totalAsistencias] = seleccionRango(props.TipoDatos, props.listaReunion, props.listaAsistencias, props.startDate, props.NombreClase, props.NombreAlumno, props.dateRange)
    }

    const dataP = {
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

    return (
      <>
        <div className='estiloGpastel'>
          <Pie options={opciones} data={dataP} />
        </div>
      </>
    );
  }

}


