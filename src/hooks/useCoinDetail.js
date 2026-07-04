import { useEffect, useState } from 'react'
import { getCoinDetail } from '../services/coinGeckoService.js'

export function useCoinDetail(coinId, currency) {
  const [state, setState] = useState({ coin: null, chart: [], loading: true, error: '', usingFallback: false })

  useEffect(() => {
    let cancelled = false

    async function load() {
      setState((current) => ({ ...current, loading: true, error: '' }))

      try {
        const response = await getCoinDetail(coinId, currency)
        if (!cancelled) {
          setState({ ...response, loading: false, error: '' })
        }
      } catch {
        if (!cancelled) {
          setState({ coin: null, chart: [], loading: false, error: 'No pudimos cargar el detalle.', usingFallback: true })
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
  }, [coinId, currency])

  return state
}