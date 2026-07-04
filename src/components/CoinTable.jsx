import { Link } from 'react-router-dom'
import { formatCompact, formatCurrency, formatPercent } from '../utils/format.js'

export default function CoinTable({ coins, currency }) {
  return (
    <div className="table-card">
      <table className="coin-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price</th>
            <th>24h</th>
            <th>Market Cap</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>
                <Link className="coin-inline" to={`/coin/${coin.id}`}>
                  <img src={coin.image} alt={coin.name} />
                  <div>
                    <strong>{coin.name}</strong>
                    <span>{coin.symbol.toUpperCase()}</span>
                  </div>
                </Link>
              </td>
              <td>{formatCurrency(coin.current_price, currency)}</td>
              <td className={coin.price_change_percentage_24h >= 0 ? 'is-positive' : 'is-negative'}>
                {formatPercent(coin.price_change_percentage_24h)}
              </td>
              <td>{formatCompact(coin.market_cap, currency)}</td>
              <td>{formatCompact(coin.total_volume, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}