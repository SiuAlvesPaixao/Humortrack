import { useState } from 'react';
import RegistroHumor from './components/RegistroHumor';

export default function App() {
  const [mensajeExito, setMensajeExito] = useState('');

  const manejarGuardado = () => {
    setMensajeExito('✓ Registro guardado correctamente');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', paddingTop: 40, paddingBottom: 40 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px' }}>
        <header style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#111827', marginBottom: 8 }}>
            HumorTracker
          </h1>
          <p style={{ color: '#6b7280', fontSize: 16 }}>
            Registra tu estado de ánimo diario
          </p>
        </header>

        {mensajeExito && (
          <div style={{
            background: '#d1fae5',
            color: '#065f46',
            padding: 16,
            borderRadius: 8,
            marginBottom: 24,
            textAlign: 'center',
            fontWeight: 500
          }}>
            {mensajeExito}
          </div>
        )}

        <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: 32 }}>
          <RegistroHumor alGuardar={manejarGuardado} />
        </div>
      </div>
    </div>
  );
}
