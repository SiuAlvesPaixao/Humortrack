import { obtenerTodosLosRegistros, exportarACSV } from '../utils/almacenamiento';

export default function Historial() {
  const registros = obtenerTodosLosRegistros();
  
  // Ordenar por fecha más reciente primero
  const registrosOrdenados = [...registros].sort((a, b) => 
    new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const promedioGeneral = registros.length > 0
    ? (registros.reduce((suma, r) => suma + r.valorHumor, 0) / registros.length).toFixed(1)
    : 0;

  const obtenerColorHumor = (valor: number) => {
    if (valor <= 2) return '#ef4444';
    if (valor === 3) return '#f59e0b';
    return '#10b981';
  };

  const obtenerEmojiHumor = (valor: number) => {
    const emojis = ['😢', '😕', '😐', '🙂', '😄'];
    return emojis[valor - 1];
  };

  const formatearFecha = (fecha: string) => {
    const opciones: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ margin: 0 }}>Tu historial</h2>
        {registros.length > 0 && (
          <button
            onClick={exportarACSV}
            style={{
              padding: '10px 20px',
              background: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            📥 Exportar CSV
          </button>
        )}
      </div>

      {registros.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 60,
          background: '#f9fafb',
          borderRadius: 12,
          color: '#6b7280'
        }}>
          <p style={{ fontSize: 18, marginBottom: 8 }}>Aún no tienes registros</p>
          <p style={{ fontSize: 14 }}>Empieza a registrar tu humor diario para ver tu progreso</p>
        </div>
      ) : (
        <>
          {/* Estadísticas resumidas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 32
          }}>
            <div style={{
              background: '#dbeafe',
              padding: 20,
              borderRadius: 8,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#1e40af' }}>
                {registros.length}
              </div>
              <div style={{ fontSize: 14, color: '#1e3a8a', marginTop: 4 }}>
                Días registrados
              </div>
            </div>

            <div style={{
              background: '#fef3c7',
              padding: 20,
              borderRadius: 8,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#b45309' }}>
                {promedioGeneral}
              </div>
              <div style={{ fontSize: 14, color: '#92400e', marginTop: 4 }}>
                Promedio general
              </div>
            </div>
          </div>

          {/* Gráfica simple */}
          <div style={{
            background: 'white',
            padding: 24,
            borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            marginBottom: 32
          }}>
            <h3 style={{ marginBottom: 20, fontSize: 18 }}>Evolución semanal</h3>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: 200,
              gap: 8,
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: 8
            }}>
              {registrosOrdenados.slice(0, 14).reverse().map((registro, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    background: obtenerColorHumor(registro.valorHumor),
                    height: `${(registro.valorHumor / 5) * 100}%`,
                    borderRadius: '4px 4px 0 0',
                    minHeight: 20,
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  title={`${formatearFecha(registro.fecha)}: ${registro.valorHumor}/5`}
                >
                  <div style={{
                    position: 'absolute',
                    bottom: -24,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: 11,
                    color: '#6b7280',
                    whiteSpace: 'nowrap'
                  }}>
                    {new Date(registro.fecha).getDate()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lista de registros */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {registrosOrdenados.map((registro, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  padding: 20,
                  borderRadius: 12,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderLeft: `4px solid ${obtenerColorHumor(registro.valorHumor)}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                    {formatearFecha(registro.fecha)}
                  </div>
                  <div style={{ fontSize: 24 }}>
                    {obtenerEmojiHumor(registro.valorHumor)}
                  </div>
                </div>

                {registro.nota && (
                  <p style={{
                    fontSize: 14,
                    color: '#6b7280',
                    marginBottom: 12,
                    lineHeight: 1.5
                  }}>
                    {registro.nota}
                  </p>
                )}

                {registro.etiquetas.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {registro.etiquetas.map((etiqueta, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: 12,
                          padding: '4px 12px',
                          background: '#f3f4f6',
                          color: '#4b5563',
                          borderRadius: 12
                        }}
                      >
                        {etiqueta}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
