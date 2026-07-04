export default function Loader({ label = 'Cargando mercado', screen = false }) {
  return (
    <div className={`loader${screen ? ' loader--screen' : ''}`} role="status" aria-live="polite">
      <span className="loader__pulse" aria-hidden="true"></span>
      <p>{label}</p>
    </div>
  )
}