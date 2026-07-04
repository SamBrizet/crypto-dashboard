import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CryptoContext } from './cryptoContextObject.js'

const STORAGE_KEYS = {
  currency: 'crypto-dashboard-currency',
  theme: 'crypto-dashboard-theme',
}

function readStorage(key, fallback) {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function CryptoProvider({ children }) {
  const [currency, setCurrency] = useState(() => readStorage(STORAGE_KEYS.currency, 'usd'))
  const [theme, setTheme] = useState(() => readStorage(STORAGE_KEYS.theme, 'dark'))
  const [toast, setToast] = useState({ open: false, message: '' })
  const toastTimer = useRef(null)

  useEffect(() => {
    writeStorage(STORAGE_KEYS.currency, currency)
  }, [currency])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.theme, theme)
    document.documentElement.dataset.theme = theme

    return () => {
      window.clearTimeout(toastTimer.current)
    }
  }, [theme])

  const showToast = useCallback((message) => {
    setToast({ open: true, message })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => {
      setToast({ open: false, message: '' })
    }, 2400)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ currency, setCurrency, showToast, theme, toast, toggleTheme }),
    [currency, setCurrency, showToast, theme, toast, toggleTheme],
  )

  return <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
}