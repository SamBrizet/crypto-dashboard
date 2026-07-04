import { FiArrowLeft } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import CoinChart from '../components/CoinChart.jsx'
import FallbackNotice from '../components/FallbackNotice.jsx'
import Loader from '../components/Loader.jsx'
import MetricCard from '../components/MetricCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useCryptoApp } from '../context/useCryptoApp.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { useCoinDetail } from '../hooks/useCoinDetail.js'
import { formatCompact, formatCurrency, formatPercent } from '../utils/format.js'

export default function CoinDetailPage() {
  const { coinId } = useParams()
  const { currency } = useCryptoApp()
  const { coin, chart, loading, error, usingFallback } = useCoinDetail(coinId, currency)

  useDocumentMeta({
    title: coin ? `${coin.name} | Crypto Dashboard` : 'Coin detail | Crypto Dashboard',
    description: 'Detalle de criptomoneda con metricas y grafico de precio.',
  })

  if (loading) {
    return <Loader screen label="Cargando detalle de la moneda" />
  }

  if (error || !coin) {
    return (
      <section className="empty-state empty-state--page">
        <h1>No pudimos cargar esta moneda.</h1>
        <Link className="button-link" to="/">
          Volver al dashboard
        </Link>
      </section>
    )
  }

  const price = coin.market_data?.current_price?.[currency] ?? coin.current_price
  const marketCap = coin.market_data?.market_cap?.[currency] ?? coin.market_cap
  const volume = coin.market_data?.total_volume?.[currency] ?? coin.total_volume
  const ath = coin.market_data?.ath?.[currency] ?? coin.ath
  const change = coin.market_data?.price_change_percentage_24h ?? coin.price_change_percentage_24h
  const supply = coin.market_data?.circulating_supply ?? coin.circulating_supply

  return (
    <div className="page-stack page-stack--tight">
      <section className="detail-panel">
        <Link className="back-link" to="/">
          <FiArrowLeft /> Volver
        </Link>

        <div className="detail-head">
          <img src={coin.image?.large ?? coin.image} alt={coin.name} />
          <div>
            <p className="eyebrow">Coin detail</p>
            <h1>{coin.name}</h1>
            <p>{coin.description?.en ?? 'Datos de mercado, volumen y momentum para una lectura rapida del activo.'}</p>
          </div>
        </div>

        {usingFallback ? <FallbackNotice /> : null}

        <div className="metric-grid">
          <MetricCard label="Price" value={formatCurrency(price, currency)} hint={`24h ${formatPercent(change)}`} />
          <MetricCard label="Market cap" value={formatCompact(marketCap, currency)} hint="Capitalizacion actual" />
          <MetricCard label="Volume" value={formatCompact(volume, currency)} hint="Volumen de trading" />
          <MetricCard label="ATH" value={formatCurrency(ath, currency)} hint={`Supply ${formatCompact(supply, currency === 'usd' ? 'usd' : 'eur')}`} />
        </div>

        <section className="chart-card">
          <SectionHeader eyebrow="Chart" title="Precio de los ultimos 7 dias" />
          <CoinChart data={chart} label={`${coin.name} price`} />
        </section>
      </section>
    </div>
  )
}