import axios from 'axios'
import { mockCoins, mockSparkline } from '../data/mockCoins.js'

const client = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 12000,
})

function getFxRate(currency) {
  return currency === 'eur' ? 0.92 : 1
}

function mapCoin(coin, currency) {
  const fx = getFxRate(currency)

  return {
    ...coin,
    current_price: coin.current_price * fx,
    market_cap: coin.market_cap * fx,
    total_volume: coin.total_volume * fx,
    ath: coin.ath * fx,
  }
}

export async function getCoinsMarkets(currency = 'usd') {
  try {
    const { data } = await client.get('/coins/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 20,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h',
      },
    })

    return { data, usingFallback: false }
  } catch {
    return { data: mockCoins.map((coin) => mapCoin(coin, currency)), usingFallback: true }
  }
}

export async function getCoinDetail(coinId, currency = 'usd') {
  try {
    const [{ data: coin }, { data: chart }] = await Promise.all([
      client.get(`/coins/${coinId}`, { params: { localization: false, market_data: true, sparkline: false } }),
      client.get(`/coins/${coinId}/market_chart`, { params: { vs_currency: currency, days: 7, interval: 'daily' } }),
    ])

    return {
      coin,
      chart: chart.prices.map(([time, value]) => ({ x: time, y: value })),
      usingFallback: false,
    }
  } catch {
    const fallback = mockCoins.find((coin) => coin.id === coinId) ?? mockCoins[0]
    return {
      coin: {
        ...fallback,
        description: { en: 'Fallback dataset used when CoinGecko is not reachable.' },
        links: { homepage: ['https://www.coingecko.com/'] },
        market_data: {
          current_price: { [currency]: mapCoin(fallback, currency).current_price },
          market_cap: { [currency]: mapCoin(fallback, currency).market_cap },
          total_volume: { [currency]: mapCoin(fallback, currency).total_volume },
          price_change_percentage_24h: fallback.price_change_percentage_24h,
          ath: { [currency]: mapCoin(fallback, currency).ath },
          circulating_supply: fallback.circulating_supply,
        },
        image: { large: fallback.image },
      },
      chart: mockSparkline,
      usingFallback: true,
    }
  }
}