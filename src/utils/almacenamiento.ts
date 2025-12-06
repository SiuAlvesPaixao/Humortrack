export interface RegistroHumor {
  fecha: string;
  valorHumor: number;
  nota: string;
  etiquetas: string[];
}

// Guardar un nuevo registro
export function guardarRegistro(registro: RegistroHumor) {
  const registrosActuales = obtenerTodosLosRegistros();
  registrosActuales.push(registro);
  localStorage.setItem('registros-humor', JSON.stringify(registrosActuales));
}

// Obtener todos los registros
export function obtenerTodosLosRegistros(): RegistroHumor[] {
  const datos = localStorage.getItem('registros-humor');
  if (!datos) return [];
  return JSON.parse(datos);
}

// Exportar a CSV
export function exportarACSV() {
  const registros = obtenerTodosLosRegistros();
  
  let contenidoCSV = 'Fecha,Humor (1-5),Nota,Etiquetas\n';
  
  registros.forEach(reg => {
    const etiquetasTexto = reg.etiquetas.join('; ');
    contenidoCSV += `${reg.fecha},${reg.valorHumor},"${reg.nota}","${etiquetasTexto}"\n`;
  });
  
  const blob = new Blob([contenidoCSV], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `humor-tracker-${new Date().toISOString().split('T')[0]}.csv`;
  enlace.click();
}

// Generar datos de ejemplo para demo
export function generarDatosEjemplo() {
  const datosExistentes = obtenerTodosLosRegistros();
  
  // Solo generar si no hay datos
  if (datosExistentes.length > 0) return;
  
  const etiquetasOpciones = ['Sueño', 'Ejercicio', 'Trabajo', 'Estudios', 'Relaciones sociales', 'Familia'];
  const registrosEjemplo: RegistroHumor[] = [];
  
  // Generar 30 días de datos
  for (let i = 29; i >= 0; i--) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - i);
    const fechaTexto = fecha.toISOString().split('T')[0];
    
    // Simular variación realista de humor
    let humor = 3;
    if (i < 7) {
      // Última semana: tendencia positiva
      humor = Math.random() > 0.3 ? 4 : 3;
      if (Math.random() > 0.7) humor = 5;
    } else if (i >= 14 && i < 21) {
      // Hace 2 semanas: periodo más difícil
      humor = Math.random() > 0.4 ? 2 : 3;
      if (Math.random() > 0.8) humor = 1;
    } else {
      // Resto: variación normal
      humor = Math.floor(Math.random() * 3) + 2; // 2-4
    }
    
    // Seleccionar 2-4 etiquetas aleatorias
    const numEtiquetas = Math.floor(Math.random() * 3) + 2;
    const etiquetasSeleccionadas: string[] = [];
    const etiquetasCopia = [...etiquetasOpciones];
    
    for (let j = 0; j < numEtiquetas; j++) {
      const indiceAleatorio = Math.floor(Math.random() * etiquetasCopia.length);
      etiquetasSeleccionadas.push(etiquetasCopia[indiceAleatorio]);
      etiquetasCopia.splice(indiceAleatorio, 1);
    }
    
    // Generar notas variadas según el humor
    const notasPositivas = [
      'Buen día en general',
      'Me sentí productivo hoy',
      'Pasé tiempo con amigos',
      'Día tranquilo y agradable',
      'Logré completar mis objetivos'
    ];
    
    const notasNeutrales = [
      'Día normal, sin grandes cambios',
      'Un poco cansado pero bien',
      'Día rutinario',
      'Sin novedades importantes'
    ];
    
    const notasNegativas = [
      'Día complicado con muchas tareas',
      'Me sentí algo estresado',
      'Tuve algunos problemas que resolver',
      'Día cansado y largo',
      'Poco tiempo para descansar'
    ];
    
    let nota = '';
    if (humor >= 4) {
      nota = notasPositivas[Math.floor(Math.random() * notasPositivas.length)];
    } else if (humor === 3) {
      nota = Math.random() > 0.5 
        ? notasNeutrales[Math.floor(Math.random() * notasNeutrales.length)]
        : '';
    } else {
      nota = notasNegativas[Math.floor(Math.random() * notasNegativas.length)];
    }
    
    registrosEjemplo.push({
      fecha: fechaTexto,
      valorHumor: humor,
      nota: nota,
      etiquetas: etiquetasSeleccionadas
    });
  }
  
  localStorage.setItem('registros-humor', JSON.stringify(registrosEjemplo));
}
