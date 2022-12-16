export const seleccionMes = (TipoDatos, listaReunion, listaAsistencias, startDate, NombreClase, NombreAlumno) => {

  var etiquetas = []
  var asistencias = []
  var retardos = []
  var faltas = []
  var accion = []

  if (TipoDatos == "btnradioGrupos") {

    const datos = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == startDate.getMonth() + 1 &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.fecha, clase.asistencias, clase.retardos, clase.faltas]; })

    for (var i = 0; i < datos.length; i++) {
      etiquetas.push(datos[i][0]);
      asistencias.push(datos[i][1]);
      retardos.push(datos[i][2]);
      faltas.push(datos[i][3]);
    }

    var totalAsistencias = [asistencias.reduce((a, b) => a + b, 0), retardos.reduce((a, b) => a + b, 0), faltas.reduce((a, b) => a + b, 0)]

    return [etiquetas, asistencias, retardos, faltas, totalAsistencias]

  }

  if (TipoDatos == "btnradioAlumnos") {

    var datos = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == startDate.getMonth() + 1 &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.Fecha, clase.diferencia, clase.accion]; })

    retardos = []
    faltas = []

    for (var i = 0; i < datos.length; i++) {
      etiquetas.push(datos[i][0]);
      asistencias.push(datos[i][1]);
      accion.push(datos[i][2]);
    }

    var tempAsistencias = 0
    var tempRetardos = 0
    var tempFaltas = 0

    for (var i = 0; i < accion.length; i++) {
      if (accion[i] == 'asistio') tempAsistencias += 1
      if (accion[i] == 'retardo') tempRetardos += 1
      if (accion[i] == 'falta') tempFaltas += 1

    }

    var totalAsistencias = [tempAsistencias, tempRetardos, tempFaltas]

    return [etiquetas, asistencias, retardos, faltas, totalAsistencias]

  }

}

export const seleccionAnio = (TipoDatos, listaReunion, listaAsistencias, startDate, NombreClase, NombreAlumno) => {

  if (TipoDatos == "btnradioGrupos") {

    const enero = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '01' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas]; })

    const febrero = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '02' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const marzo = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '03' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const abril = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '04' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const mayo = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '05' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const junio = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '06' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const julio = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '07' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const agosto = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '08' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const septiembre = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '09' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const octubre = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '10' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const noviembre = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '11' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    const diciembre = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      e.fecha.substring(5, 7) == '12' &&
      e.fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return [clase.asistencias, clase.retardos, clase.faltas] })

    var etiquetas = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    var asistencias1 = []
    var retardos1 = []
    var faltas1 = []
    var asistencias2 = []
    var retardos2 = []
    var faltas2 = []
    var asistencias3 = []
    var retardos3 = []
    var faltas3 = []
    var asistencias4 = []
    var retardos4 = []
    var faltas4 = []
    var asistencias5 = []
    var retardos5 = []
    var faltas5 = []
    var asistencias6 = []
    var retardos6 = []
    var faltas6 = []
    var asistencias7 = []
    var retardos7 = []
    var faltas7 = []
    var asistencias8 = []
    var retardos8 = []
    var faltas8 = []
    var asistencias9 = []
    var retardos9 = []
    var faltas9 = []
    var asistencias10 = []
    var retardos10 = []
    var faltas10 = []
    var asistencias11 = []
    var retardos11 = []
    var faltas11 = []
    var asistencias12 = []
    var retardos12 = []
    var faltas12 = []

    for (var i = 0; i < enero.length; i++) {
      asistencias1.push(enero[i][0]);
      retardos1.push(enero[i][1]);
      faltas1.push(enero[i][2]);
    }

    for (var i = 0; i < febrero.length; i++) {
      asistencias2.push(febrero[i][0]);
      retardos2.push(febrero[i][1]);
      faltas2.push(febrero[i][2]);
    }

    for (var i = 0; i < marzo.length; i++) {
      asistencias3.push(marzo[i][0]);
      retardos3.push(marzo[i][1]);
      faltas3.push(marzo[i][2]);
    }

    for (var i = 0; i < abril.length; i++) {
      asistencias4.push(abril[i][0]);
      retardos4.push(abril[i][1]);
      faltas4.push(abril[i][2]);
    }

    for (var i = 0; i < mayo.length; i++) {
      asistencias5.push(mayo[i][0]);
      retardos5.push(mayo[i][1]);
      faltas5.push(mayo[i][2]);
    }

    for (var i = 0; i < junio.length; i++) {
      asistencias6.push(junio[i][0]);
      retardos6.push(junio[i][1]);
      faltas6.push(junio[i][2]);
    }

    for (var i = 0; i < julio.length; i++) {
      asistencias7.push(julio[i][0]);
      retardos7.push(julio[i][1]);
      faltas7.push(julio[i][2]);
    }
    for (var i = 0; i < agosto.length; i++) {
      asistencias8.push(agosto[i][0]);
      retardos8.push(agosto[i][1]);
      faltas8.push(agosto[i][2]);
    }
    for (var i = 0; i < septiembre.length; i++) {
      asistencias9.push(septiembre[i][0]);
      retardos9.push(septiembre[i][1]);
      faltas9.push(septiembre[i][2]);
    }
    for (var i = 0; i < octubre.length; i++) {
      asistencias10.push(octubre[i][0]);
      retardos10.push(octubre[i][1]);
      faltas10.push(octubre[i][2]);
    }
    for (var i = 0; i < noviembre.length; i++) {
      asistencias11.push(noviembre[i][0]);
      retardos11.push(noviembre[i][1]);
      faltas11.push(noviembre[i][2]);
    }
    for (var i = 0; i < diciembre.length; i++) {
      asistencias12.push(diciembre[i][0]);
      retardos12.push(diciembre[i][1]);
      faltas12.push(diciembre[i][2]);
    }

    const asistencias = [
      asistencias1.reduce((a, b) => a + b, 0),
      asistencias2.reduce((a, b) => a + b, 0),
      asistencias3.reduce((a, b) => a + b, 0),
      asistencias4.reduce((a, b) => a + b, 0),
      asistencias5.reduce((a, b) => a + b, 0),
      asistencias6.reduce((a, b) => a + b, 0),
      asistencias7.reduce((a, b) => a + b, 0),
      asistencias8.reduce((a, b) => a + b, 0),
      asistencias9.reduce((a, b) => a + b, 0),
      asistencias10.reduce((a, b) => a + b, 0),
      asistencias11.reduce((a, b) => a + b, 0),
      asistencias12.reduce((a, b) => a + b, 0)
    ]

    const faltas = [
      faltas1.reduce((a, b) => a + b, 0),
      faltas2.reduce((a, b) => a + b, 0),
      faltas3.reduce((a, b) => a + b, 0),
      faltas4.reduce((a, b) => a + b, 0),
      faltas5.reduce((a, b) => a + b, 0),
      faltas6.reduce((a, b) => a + b, 0),
      faltas7.reduce((a, b) => a + b, 0),
      faltas8.reduce((a, b) => a + b, 0),
      faltas9.reduce((a, b) => a + b, 0),
      faltas10.reduce((a, b) => a + b, 0),
      faltas11.reduce((a, b) => a + b, 0),
      faltas12.reduce((a, b) => a + b, 0)
    ]

    const retardos = [
      retardos1.reduce((a, b) => a + b, 0),
      retardos2.reduce((a, b) => a + b, 0),
      retardos3.reduce((a, b) => a + b, 0),
      retardos4.reduce((a, b) => a + b, 0),
      retardos5.reduce((a, b) => a + b, 0),
      retardos6.reduce((a, b) => a + b, 0),
      retardos7.reduce((a, b) => a + b, 0),
      retardos8.reduce((a, b) => a + b, 0),
      retardos9.reduce((a, b) => a + b, 0),
      retardos10.reduce((a, b) => a + b, 0),
      retardos11.reduce((a, b) => a + b, 0),
      retardos12.reduce((a, b) => a + b, 0)

    ]

    var totalAsistencias = [asistencias.reduce((a, b) => a + b, 0), retardos.reduce((a, b) => a + b, 0), faltas.reduce((a, b) => a + b, 0)]


    return [etiquetas, asistencias, retardos, faltas, totalAsistencias]


  }

  if (TipoDatos == "btnradioAlumnos") {

    console.log(listaAsistencias)

    const enero = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '01' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion; })

    const febrero = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '02' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const marzo = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '03' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const abril = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '04' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const mayo = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '05' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const junio = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '06' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const julio = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '07' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const agosto = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '08' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const septiembre = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '09' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const octubre = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '10' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const noviembre = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '11' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })

    const diciembre = listaAsistencias.filter(e =>
      e.idAlumno == NombreAlumno &&
      e.Clase == NombreClase &&
      e.Fecha.substring(5, 7) == '12' &&
      e.Fecha.substring(0, 4) == startDate.getFullYear()
    ).map(function (clase) { return clase.accion })


    const NumAsistencias = []
    const NumRetardos = []
    const NumFaltas = []
    var tempAsistencias = 0
    var tempRetardos = 0
    var tempFaltas = 0

    for (var i = 0; i < enero.length; i++) {
      if (enero[i] == 'asistio') tempAsistencias += 1
      if (enero[i] == 'retardo') tempRetardos += 1
      if (enero[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempRetardos);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < febrero.length; i++) {
      if (febrero[i] == 'asistio') tempAsistencias += 1
      if (febrero[i] == 'retardo') tempRetardos += 1
      if (febrero[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempRetardos);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < marzo.length; i++) {
      if (marzo[i] == 'asistio') tempAsistencias += 1
      if (marzo[i] == 'retardo') tempRetardos += 1
      if (marzo[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempRetardos);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < abril.length; i++) {
      if (abril[i] == 'asistio') tempAsistencias += 1
      if (abril[i] == 'retardo') tempRetardos += 1
      if (abril[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempRetardos);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < mayo.length; i++) {
      if (mayo[i] == 'asistio') tempAsistencias += 1
      if (mayo[i] == 'retardo') tempRetardos += 1
      if (mayo[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempFaltas);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < junio.length; i++) {
      if (junio[i] == 'asistio') tempAsistencias += 1
      if (junio[i] == 'retardo') tempRetardos += 1
      if (junio[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempFaltas);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < julio.length; i++) {
      if (julio[i] == 'asistio') tempAsistencias += 1
      if (julio[i] == 'retardo') tempRetardos += 1
      if (julio[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempFaltas);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < agosto.length; i++) {
      if (agosto[i] == 'asistio') tempAsistencias += 1
      if (agosto[i] == 'retardo') tempRetardos += 1
      if (agosto[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempFaltas);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < septiembre.length; i++) {
      if (septiembre[i] == 'asistio') tempAsistencias += 1
      if (septiembre[i] == 'retardo') tempRetardos += 1
      if (septiembre[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempFaltas);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < octubre.length; i++) {
      if (octubre[i] == 'asistio') tempAsistencias += 1
      if (octubre[i] == 'retardo') tempRetardos += 1
      if (octubre[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempFaltas);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < noviembre.length; i++) {
      if (noviembre[i] == 'asistio') tempAsistencias += 1
      if (noviembre[i] == 'retardo') tempRetardos += 1
      if (noviembre[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempFaltas);

    tempAsistencias = 0
    tempRetardos = 0
    tempFaltas = 0

    for (var i = 0; i < diciembre.length; i++) {
      if (diciembre[i] == 'asistio') tempAsistencias += 1
      if (diciembre[i] == 'retardo') tempRetardos += 1
      if (diciembre[i] == 'falta') tempFaltas += 1

    }
    NumAsistencias.push(tempAsistencias);
    NumRetardos.push(tempRetardos);
    NumFaltas.push(tempFaltas);
    etiquetas = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    var totalAsistencias = [
      NumAsistencias.reduce((a, b) => a + b, 0),
      NumRetardos.reduce((a, b) => a + b, 0) ,
      NumFaltas.reduce((a, b) => a + b, 0) 
    ]

    return [etiquetas, NumAsistencias, NumRetardos, NumFaltas, totalAsistencias]

  }



}


export const seleccionRango = (TipoDatos, listaReunion, listaAsistencias, startDate, NombreClase, NombreAlumno, dateRange) => {

  var etiquetas = []
  var asistencias = []
  var retardos = []
  var faltas = []
  var accion = []

  if (TipoDatos == "btnradioGrupos") {

    const datos = listaReunion.filter(e =>
      e.idClase == NombreClase &&
      new Date(e.fecha).getTime() > dateRange[0].getTime() &&
      new Date(e.fecha).getTime() < dateRange[1].getTime()
    ).map(function (clase) { return [clase.fecha, clase.asistencias, clase.retardos, clase.faltas]; })

    for (var i = 0; i < datos.length; i++) {
      etiquetas.push(datos[i][0]);
      asistencias.push(datos[i][1]);
      retardos.push(datos[i][2]);
      faltas.push(datos[i][3]);
    }

    var totalAsistencias = [asistencias.reduce((a, b) => a + b, 0), retardos.reduce((a, b) => a + b, 0), faltas.reduce((a, b) => a + b, 0)]


    return [etiquetas, asistencias, retardos, faltas, totalAsistencias]

  }

  if (TipoDatos == "btnradioAlumnos") {

    const datos = listaAsistencias.filter(e =>
      e.Clase == NombreClase &&
      e.idAlumno == NombreAlumno &&
      new Date(e.Fecha).getTime() > dateRange[0].getTime() &&
      new Date(e.Fecha).getTime() < dateRange[1].getTime()
    ).map(function (clase) { return [clase.Fecha, clase.diferencia, clase.accion]; })

    for (var i = 0; i < datos.length; i++) {
      etiquetas.push(datos[i][0]);
      asistencias.push(datos[i][1]);
      accion.push(datos[i][2]);
    }

    var tempAsistencias = 0
    var tempRetardos = 0
    var tempFaltas = 0

    for (var i = 0; i < accion.length; i++) {
      if (accion[i] == 'asistio') tempAsistencias += 1
      if (accion[i] == 'retardo') tempRetardos += 1
      if (accion[i] == 'falta') tempFaltas += 1

    }

    var totalAsistencias = [tempAsistencias, tempRetardos, tempFaltas]
    return [etiquetas, asistencias, retardos, faltas, totalAsistencias]

  }

}