export const mockCoins = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', current_price: 105230, market_cap: 2078320000000, market_cap_rank: 1, total_volume: 38920000000, price_change_percentage_24h: 2.84, circulating_supply: 19725000, ath: 109200 },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', current_price: 5840, market_cap: 702000000000, market_cap_rank: 2, total_volume: 22900000000, price_change_percentage_24h: 3.21, circulating_supply: 120180000, ath: 6120 },
  { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', current_price: 212, market_cap: 97100000000, market_cap_rank: 3, total_volume: 5600000000, price_change_percentage_24h: 6.28, circulating_supply: 456000000, ath: 259 },
  { id: 'binancecoin', symbol: 'bnb', name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', current_price: 742, market_cap: 112000000000, market_cap_rank: 4, total_volume: 1900000000, price_change_percentage_24h: -1.16, circulating_supply: 151000000, ath: 793 },
  { id: 'ripple', symbol: 'xrp', name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', current_price: 1.54, market_cap: 86700000000, market_cap_rank: 5, total_volume: 3800000000, price_change_percentage_24h: 4.91, circulating_supply: 56000000000, ath: 3.4 },
  { id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', current_price: 0.92, market_cap: 32900000000, market_cap_rank: 6, total_volume: 890000000, price_change_percentage_24h: -2.7, circulating_supply: 35600000000, ath: 3.1 },
  { id: 'chainlink', symbol: 'link', name: 'Chainlink', image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png', current_price: 22.3, market_cap: 13900000000, market_cap_rank: 7, total_volume: 810000000, price_change_percentage_24h: 5.8, circulating_supply: 626000000, ath: 52.7 },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', current_price: 0.28, market_cap: 40100000000, market_cap_rank: 8, total_volume: 1700000000, price_change_percentage_24h: -3.24, circulating_supply: 144000000000, ath: 0.73 },
  { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', image: 'https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png', current_price: 47.8, market_cap: 18800000000, market_cap_rank: 9, total_volume: 670000000, price_change_percentage_24h: 7.1, circulating_supply: 392000000, ath: 146 },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot', image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png', current_price: 11.7, market_cap: 16600000000, market_cap_rank: 10, total_volume: 320000000, price_change_percentage_24h: -1.92, circulating_supply: 1420000000, ath: 54.9 },
]

export const mockSparkline = Array.from({ length: 24 }, (_, index) => ({
  x: index,
  y: 100 + Math.sin(index / 2.5) * 8 + index * 1.2,
}))