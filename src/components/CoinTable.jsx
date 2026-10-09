import { Link } from 'react-router-dom'
import { formatCompact, formatCurrency, formatPercent } from '../utils/format.js'

export default function CoinTable({ coins, currency }) {
  return (
    <div className="table-card">
      <table className="coin-table" aria-label="Precios del mercado de criptomonedas">
        <thead>
          <tr>
            <th>Activo</th>
            <th>Precio</th>
            <th>24h</th>
            <th>Cap. de mercado</th>
            <th>Volumen 24 h</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>
                <Link className="coin-inline" to={`/coin/${coin.id}`}>
                  <img src={coin.image} alt="" />
                  <div>
                    <strong>{coin.name}</strong>
                    <span>{coin.symbol.toUpperCase()} <small>· #{coin.market_cap_rank}</small></span>
                  </div>
                </Link>
              </td>
              <td data-label="Precio">{formatCurrency(coin.current_price, currency)}</td>
              <td data-label="24 h" className={coin.price_change_percentage_24h >= 0 ? 'is-positive' : 'is-negative'}>
                {formatPercent(coin.price_change_percentage_24h)}
              </td>
              <td data-label="Cap. mercado">{formatCompact(coin.market_cap, currency)}</td>
              <td data-label="Volumen 24 h">{formatCompact(coin.total_volume, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}