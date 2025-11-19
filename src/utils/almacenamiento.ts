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
