{/* Selector de humor */}
      <div style={{ marginBottom: 32 }}>
        <label style={{ display: 'block', marginBottom: 12, fontWeight: 500 }}>
          Nivel de ánimo
        </label>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          {[
            { valor: 1, emoji: '😢', texto: 'Muy mal' },
            { valor: 2, emoji: '😕', texto: 'Mal' },
            { valor: 3, emoji: '😐', texto: 'Normal' },
            { valor: 4, emoji: '🙂', texto: 'Bien' },
            { valor: 5, emoji: '😄', texto: 'Muy bien' }
          ].map(({ valor, emoji, texto }) => (
            <div key={valor} style={{ textAlign: 'center' }}>
              <button
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
                {emoji}
              </button>
              <div style={{
                fontSize: 12,
                color: valorSeleccionado === valor ? '#2563eb' : '#6b7280',
                fontWeight: valorSeleccionado === valor ? 600 : 400,
                marginTop: 6
              }}>
                {texto}
              </div>
            </div>
          ))}
        </div>
      </div>
```

6. **Guarda haciendo scroll hasta abajo** y haz clic en "Commit changes"
7. Mensaje del commit: `Add emoji labels`
8. Confirma

---

## ¿Qué hace este código?

- Crea un array con cada emoji y su texto correspondiente
- Para cada uno, crea un `<div>` que contiene:
  - El botón con el emoji (arriba)
  - El texto explicativo (abajo)
- El texto cambia de color cuando seleccionas ese emoji (de gris a azul)

---

## Resultado esperado:
```
😢      😕      😐      🙂      😄
Muy mal  Mal   Normal  Bien  Muy bien
