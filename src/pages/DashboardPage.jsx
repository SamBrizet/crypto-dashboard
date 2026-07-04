import { useMemo, useState } from 'react'
import FallbackNotice from '../components/FallbackNotice.jsx'
import CoinTable from '../components/CoinTable.jsx'
import Loader from '../components/Loader.jsx'
import MetricCard from '../components/MetricCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useCryptoApp } from '../context/useCryptoApp.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useCryptoMarkets } from '../hooks/useCryptoMarkets.js'
import { formatCompact, formatCurrency, formatPercent } from '../utils/format.js'

export default function DashboardPage() {
  const { currency } = useCryptoApp()
  const { coins, loading, error, usingFallback } = useCryptoMarkets(currency)
  const [query, setQuery] = useState('')

  useDocumentMeta({
    title: 'Crypto Dashboard | Market pulse',
    description: 'Dashboard cripto con CoinGecko, buscador, top gainers, top losers y detalle con graficos.',
  })

  const visibleCoins = useMemo(() => {
    return coins.filter((coin) => `${coin.name} ${coin.symbol}`.toLowerCase().includes(query.toLowerCase()))
  }, [coins, query])

  const gainers = useMemo(() => [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3), [coins])
  const losers = useMemo(() => [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 3), [coins])
  const totalMarketCap = useMemo(() => coins.reduce((sum, coin) => sum + coin.market_cap, 0), [coins])
  const totalVolume = useMemo(() => coins.reduce((sum, coin) => sum + coin.total_volume, 0), [coins])

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Market pulse, movers y detalle de monedas en una sola vista.</h1>
          <p>
            Un dashboard listo para Netlify con tema oscuro, cambio USD/EUR, busqueda y tablas de mercado.
          </p>
        </div>

        <div className="metric-grid">
          <MetricCard label="Market cap" value={formatCompact(totalMarketCap || 0, currency)} hint="Suma del universo visible" />
          <MetricCard label="24h volume" value={formatCompact(totalVolume || 0, currency)} hint="Liquidez del mercado" />
          <MetricCard label="Top gainer" value={gainers[0] ? formatPercent(gainers[0].price_change_percentage_24h) : '--'} hint={gainers[0]?.name ?? 'Esperando datos'} />
        </div>
      </section>

      {usingFallback ? <FallbackNotice /> : null}
      {loading ? <Loader label="Consultando mercado cripto" /> : null}
      {error ? <p className="status-card">{error}</p> : null}

      <section className="content-section">
        <SectionHeader eyebrow="Overview" title="Busca criptomonedas y revisa el mercado" copy="Ordenadas por capitalizacion con acceso directo al detalle." />
        <input className="search-input" type="search" placeholder="Buscar por nombre o simbolo" value={query} onChange={(event) => setQuery(event.target.value)} />
        <CoinTable coins={visibleCoins} currency={currency} />
      </section>

      <section className="content-section movers-grid">
        <div className="mover-card">
          <SectionHeader eyebrow="Top Gainers" title="Subidas mas fuertes" />
          <div className="mover-list">
            {gainers.map((coin) => (
              <article key={coin.id}>
                <strong>{coin.name}</strong>
                <span className="is-positive">{formatPercent(coin.price_change_percentage_24h)}</span>
                <small>{formatCurrency(coin.current_price, currency)}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="mover-card">
          <SectionHeader eyebrow="Top Losers" title="Caidas del dia" />
          <div className="mover-list">
            {losers.map((coin) => (
              <article key={coin.id}>
                <strong>{coin.name}</strong>
                <span className="is-negative">{formatPercent(coin.price_change_percentage_24h)}</span>
                <small>{formatCurrency(coin.current_price, currency)}</small>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}