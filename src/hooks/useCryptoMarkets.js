import { useEffect, useState } from 'react'
import { getCoinsMarkets } from '../services/coinGeckoService.js'

export function useCryptoMarkets(currency) {
  const [state, setState] = useState({ coins: [], loading: true, error: '', usingFallback: false })

  useEffect(() => {
    let cancelled = false

    async function load() {
      setState((current) => ({ ...current, loading: true, error: '' }))

      try {
        const response = await getCoinsMarkets(currency)
        if (!cancelled) {
          setState({ coins: response.data, loading: false, error: '', usingFallback: response.usingFallback })
        }
      } catch {
        if (!cancelled) {
          setState({ coins: [], loading: false, error: 'No pudimos cargar el mercado.', usingFallback: true })
        }
      }
    }

    const timer = window.setTimeout(() => {
      void load()
    }, 0)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [currency])

  return state
}