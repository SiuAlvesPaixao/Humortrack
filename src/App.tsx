import { useState, useEffect } from 'react';
import RegistroHumor from './components/RegistroHumor';
import Analytics from './pages/Analytics';
import { generarDatosEjemplo, exportarACSV } from './utils/almacenamiento';

export default function App() {
  const [pantallaActiva, setPantallaActiva] = useState<'registro' | 'graficos' | 'exportar'>('registro');
  const [mensajeExito, setMensajeExito] = useState('');

  // Generar datos de ejemplo al cargar (solo si no hay datos)
  useEffect(() => {
    generarDatosEjemplo();
  }, []);

  const manejarGuardado = () => {
    setMensajeExito('✓ Registro guardado correctamente');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingTop: 40, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <header style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
            HumorTracker(:
          </h1>
          
          {/* Navegación */}
          <nav style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24 }}>
            {[
              { id: 'registro' as const, label: 'Registro' },
              { id: 'graficos' as const, label: 'Gráficos' },
              { id: 'exportar' as const, label: 'Exportar' }
            ].map(opcion => (
              <button
                key={opcion.id}
                onClick={() => setPantallaActiva(opcion.id)}
                style={{
                  padding: '10px 24px',
                  background: pantallaActiva === opcion.id ? '#2563eb' : 'white',
                  color: pantallaActiva === opcion.id ? 'white' : '#374151',
                  border: '1px solid #e5e7eb',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {opcion.label}
              </button>
            ))}
          </nav>
        </header>

        {mensajeExito && (
          <div style={{
            background: '#d1fae5',
            color: '#065f46',
            padding: 16,
            borderRadius: 8,
            marginBottom: 24,
            textAlign: 'center',
            fontWeight: 500,
            maxWidth: 800,
            margin: '0 auto 24px'
          }}>
            {mensajeExito}
          </div>
        )}

        {pantallaActiva === 'registro' && (
          <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: 32, maxWidth: 800, margin: '0 auto' }}>
            <RegistroHumor alGuardar={manejarGuardado} />
          </div>
        )}

        {pantallaActiva === 'graficos' && <Analytics />}

        {pantallaActiva === 'exportar' && (
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: 40, background: 'white', borderRadius: 12 }}>
            <h2 style={{ marginBottom: 16 }}>Exportar datos</h2>
            <p style={{ color: '#6b7280', marginBottom: 24 }}>
              Descarga tu historial completo en formato CSV para analizarlo o compartirlo con profesionales.
            </p>
            <button
              onClick={exportarACSV}
              style={{
                padding: '14px 32px',
                background: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              📥 Descargar CSV
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
