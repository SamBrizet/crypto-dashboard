import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function NotFoundPage() {
  useDocumentMeta({
    title: '404 | Crypto Dashboard',
    description: 'Pagina no encontrada dentro del dashboard cripto.',
  })

  return (
    <section className="empty-state empty-state--page">
      <p className="eyebrow">404</p>
      <h1>Ese activo no cotiza aqui.</h1>
      <p>Regresa al dashboard principal para seguir explorando el mercado.</p>
      <Link className="button-link" to="/">
        Volver al dashboard
      </Link>
    </section>
  )
}