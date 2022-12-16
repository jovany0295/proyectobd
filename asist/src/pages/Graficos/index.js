import React, { useState } from 'react';
import './App.css';
import { Conexion } from './conexiones'
import { Graficas, Filtro, Periodo, GraficaPastel } from './componentes';

const App = () => {

  const [listaAsistencias,setListaAsistencias] = useState()
  const [listaReunion, setListaReunion] = useState()
  const [listaAlumnos, setListaAlumno] = useState()
  const [listaClases, setListaClases] = useState()

  const [Grafico, setGrafico] = useState('btnradioP')
  const [TipoDatos, setTipoDatos] = useState('btnradioGrupos')
  const [TipoPeriodo, setTipoPeriodo] = useState('mes')


  const [startDate, setStartDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDateRange, endDate] = dateRange;

  const [NombreClase, setNombreClase] = useState();
  const [NombreAlumno, setNombreAlumno] = useState();


  return (

    <div className='App contenedor' style={{ height: '500px' }}>

      <div class='row g-3"'>

        <div class='col-md-4'>

          <div className='contenedoropciones2'>
            <br />

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

              <input type="radio" class="btn-check" name="btnradiofiltro" id="btnradioGrupos" defaultChecked onChange={e => setTipoDatos(e.target.id)} />
              <label class="btn btn-outline-primary" for="btnradioGrupos" >Por clase</label>

              <input type="radio" class="btn-check" name="btnradiofiltro" id="btnradioAlumnos" onChange={e => setTipoDatos(e.target.id)} />
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

            < Conexion
              setListaAsistencias={setListaAsistencias}
              setListaAlumno={setListaAlumno}
              setListaClases={setListaClases}
              setListaReunion={setListaReunion}
              setNombreClase = {setNombreClase}
              setNombreAlumno = {setNombreAlumno}
              listaAsistencias={listaAsistencias}
              listaAlumnos={listaAlumnos}
              listaClases={listaClases}
              listaReunion={listaReunion}
            />

            <hr />
            <Filtro
              TipoDatos={TipoDatos}
              listaAlumnos={listaAlumnos}
              listaClases={listaClases}
              NombreAlumno={NombreAlumno}
              setNombreAlumno={setNombreAlumno}
              NombreClase={NombreClase}
              setNombreClase={setNombreClase}
            />
            <Periodo
              TipoPeriodo={TipoPeriodo}
              startDate={startDate}
              setStartDate={setStartDate}
              startDateRange={startDateRange}
              endDate={endDate}
              setDateRange={setDateRange}
            />
            <GraficaPastel />

          </div>

        </div>

        <div class='col-md-8'>

          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">

            <input type="radio" class="btn-check" name="btnradio" id="btnradioP" defaultChecked onChange={e => setGrafico(e.target.id)} />
            <label class="btn btn-outline-primary" for="btnradioP" >Grafica de Puntos</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradioB" onChange={e => setGrafico(e.target.id)} />
            <label class="btn btn-outline-primary" for="btnradioB" >Grafica de Barras</label>

          </div>

          <div className='estiloGraficas'>
            <Graficas
              Grafico={Grafico}
              listaReunion={listaReunion}
              listaAsistencias={listaAsistencias}
              TipoDatos={TipoDatos}
              startDate={startDate}
              NombreClase={NombreClase}
              NombreAlumno={NombreAlumno}
              TipoPeriodo={TipoPeriodo}
            />
          </div>

        </div>

      </div>

    </div>

  );

}

export default App;