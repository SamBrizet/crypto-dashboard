import { useContext } from 'react'
import { CryptoContext } from './cryptoContextObject.js'

export function useCryptoApp() {
  const context = useContext(CryptoContext)

  if (!context) {
    throw new Error('useCryptoApp debe usarse dentro de CryptoProvider')
  }

  return context
}