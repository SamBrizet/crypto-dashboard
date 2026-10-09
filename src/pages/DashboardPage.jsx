import { useMemo, useState } from 'react'
import { FiActivity, FiArrowDownRight, FiArrowUpRight, FiSearch, FiTrendingUp } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import FallbackNotice from '../components/FallbackNotice.jsx'
import CoinTable from '../components/CoinTable.jsx'
import Loader from '../components/Loader.jsx'
import MetricCard from '../components/MetricCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useCryptoApp } from '../context/useCryptoApp.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useCryptoMarkets } from '../hooks/useCryptoMarkets.js'
import { formatCompact, formatPercent } from '../utils/format.js'

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
  const averageChange = useMemo(
    () => (coins.length ? coins.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / coins.length : 0),
    [coins],
  )

  return (
    <div className="page-stack dashboard-page">
      <section className="dashboard-intro container" id="resumen">
        <div>
          <p className="eyebrow">COINGECKO <span aria-hidden="true">/</span> MERCADO GLOBAL</p>
          <h1>Mercado cripto</h1>
          <p>Una lectura clara de precios, volumen y movimientos en las últimas 24 horas.</p>
        </div>
        <span className="market-status"><i aria-hidden="true" /> Datos de mercado</span>
      </section>

      <section className="metric-grid container" aria-label="Resumen del mercado">
        <MetricCard icon={FiActivity} label="Activos seguidos" value={coins.length || '--'} hint="En este dashboard" />
        <MetricCard icon={FiTrendingUp} label="Capitalización visible" value={formatCompact(totalMarketCap || 0, currency)} hint="Suma de activos listados" />
        <MetricCard icon={FiArrowUpRight} label="Volumen 24 h" value={formatCompact(totalVolume || 0, currency)} hint="Volumen combinado" />
        <MetricCard icon={FiActivity} label="Variación promedio" value={formatPercent(averageChange)} hint="Cambio promedio en 24 h" tone={averageChange >= 0 ? 'positive' : 'negative'} />
      </section>

      {usingFallback ? <div className="container"><FallbackNotice /></div> : null}
      {loading ? <div className="container"><Loader label="Consultando mercado cripto" /></div> : null}
      {error ? <div className="container"><p className="status-card">{error}</p></div> : null}

      <div className="dashboard-layout container">
        <section className="market-panel" id="mercado">
          <div className="market-panel__heading">
            <SectionHeader eyebrow="Mercado spot" title="Principales activos" copy="Ordenados por capitalización de mercado." />
            <label className="search-field">
              <FiSearch aria-hidden="true" />
              <input aria-label="Buscar activo" type="search" placeholder="Buscar activo" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
          </div>
          <div className="market-panel__meta">
            <span>{visibleCoins.length} activos</span>
            <span>Actualizado en tiempo real</span>
          </div>
          <CoinTable coins={visibleCoins} currency={currency} />
          {visibleCoins.length === 0 ? <p className="empty-market">No encontramos activos con ese nombre.</p> : null}
        </section>

        <aside className="market-aside" id="movimientos">
          <section className="mover-card mover-card--gainers">
            <SectionHeader eyebrow="24 h · AL ALZA" title="Mayores subidas" />
            <div className="mover-list">
              {gainers.map((coin) => (
                <Link key={coin.id} className="mover-row" to={`/coin/${coin.id}`}>
                  <img src={coin.image} alt="" />
                  <span className="mover-row__name"><strong>{coin.name}</strong><small>{coin.symbol.toUpperCase()}</small></span>
                  <span className="mover-row__change is-positive"><FiArrowUpRight aria-hidden="true" />{formatPercent(coin.price_change_percentage_24h)}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mover-card mover-card--losers">
            <SectionHeader eyebrow="24 h · A LA BAJA" title="Mayores caídas" />
            <div className="mover-list">
              {losers.map((coin) => (
                <Link key={coin.id} className="mover-row" to={`/coin/${coin.id}`}>
                  <img src={coin.image} alt="" />
                  <span className="mover-row__name"><strong>{coin.name}</strong><small>{coin.symbol.toUpperCase()}</small></span>
                  <span className="mover-row__change is-negative"><FiArrowDownRight aria-hidden="true" />{formatPercent(coin.price_change_percentage_24h)}</span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}