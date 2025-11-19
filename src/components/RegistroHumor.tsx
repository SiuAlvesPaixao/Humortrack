import { useState } from 'react';
import { guardarRegistro } from '../utils/almacenamiento';
import MoodLegend from './MoodLegend'; // ← NUEVO: importación

const etiquetasDisponibles = [
  'Sueño',
  'Ejercicio',
  'Trabajo',
  'Estudios',
  'Relaciones sociales',
  'Familia'
];

export default function RegistroHumor({ alGuardar }: { alGuardar: () => void }) {
  const [valorSeleccionado, setValorSeleccionado] = useState<number>(3);
  const [notaDelDia, setNotaDelDia] = useState('');
  const [etiquetasMarcadas, setEtiquetasMarcadas] = useState<string[]>([]);

  const manejarCambioEtiqueta = (etiqueta: string) => {
    if (etiquetasMarcadas.includes(etiqueta)) {
      setEtiquetasMarcadas(etiquetasMarcadas.filter(e => e !== etiqueta));
    } else {
      setEtiquetasMarcadas([...etiquetasMarcadas, etiqueta]);
    }
  };

  const enviarFormulario = () => {
    const fechaActual = new Date().toISOString().split('T')[0];
    
    guardarRegistro({
      fecha: fechaActual,
      valorHumor: valorSeleccionado,
      nota: notaDelDia,
      etiquetas: etiquetasMarcadas
    });

    // Limpiar formulario
    setValorSeleccionado(3);
    setNotaDelDia('');
    setEtiquetasMarcadas([]);
    
    alGuardar();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2 style={{ marginBottom: 24 }}>¿Cómo te sientes hoy?</h2>
      
      {/* Selector de humor */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>
          Nivel de ánimo
        </label>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {[1, 2, 3, 4, 5].map(valor => (
            <button
              key={valor}
              onClick={() => setValorSeleccionado(valor)}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                border: valorSeleccionado === valor ? '3px solid #2563eb' : '2px solid #e5e7eb',
                background: valorSeleccionado === valor ? '#dbeafe' : 'white',
                fontSize: 24,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              aria-pressed={valorSeleccionado === valor}
              title={`Nivel ${valor}`}
            >
              {valor === 1 && '😢'}
              {valor === 2 && '😕'}
              {valor === 3 && '😐'}
              {valor === 4 && '🙂'}
              {valor === 5 && '😄'}
            </button>
          ))}
        </div>
      </div>

      {/* Leyenda emocional justo debajo de las caritas */}
      <div style={{ marginBottom: 32 }}>
        <MoodLegend />
      </div>

      {/* Nota opcional */}
      <div style={{ marginBottom: 32 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
          Nota del día (opcional)
        </label>
        <textarea
          value={notaDelDia}
          onChange={(e) => setNotaDelDia(e.target.value)}
          placeholder="¿Qué ha pasado hoy?"
          style={{
            width: '100%',
            minHeight: 80,
            padding: 12,
            borderRadius: 8,
            border: '1px solid #d1d5db',
            fontSize: 14,
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Etiquetas */}
      <div style={{ marginBottom: 32 }}>
        <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>
          Etiquetas
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {etiquetasDisponibles.map(etiqueta => (
            <button
              key={etiqueta}
              onClick={() => manejarCambioEtiqueta(etiqueta)}
              style={{
                padding: '8px 16px',
                borderRadius: 20,
                border: '1px solid #d1d5db',
                background: etiquetasMarcadas.includes(etiqueta) ? '#2563eb' : 'white',
                color: etiquetasMarcadas.includes(etiqueta) ? 'white' : '#374151',
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              aria-pressed={etiquetasMarcadas.includes(etiqueta)}
            >
              {etiqueta}
            </button>
          ))}
        </div>
      </div>

      {/* Botón guardar */}
      <button
        onClick={enviarFormulario}
        style={{
          width: '100%',
          padding: '14px 24px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Guardar registro
      </button>
    </div>
  );
}
