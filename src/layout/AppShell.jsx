import { AnimatePresence, motion } from 'framer-motion'
import { FiActivity, FiMoon, FiSun } from 'react-icons/fi'
import { NavLink, Outlet } from 'react-router-dom'
import { useCryptoApp } from '../context/useCryptoApp.js'

export default function AppShell() {
  const { currency, setCurrency, theme, toast, toggleTheme } = useCryptoApp()

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink className="brand" to="/">
            <span className="brand__mark"><FiActivity aria-hidden="true" /></span>
            <span className="brand__name">Crypto<span>Pulse</span></span>
          </NavLink>

          <nav className="site-nav" aria-label="Secciones del dashboard">
            <a href="#resumen">Resumen</a>
            <a href="#mercado">Mercado</a>
            <a href="#movimientos">Movimientos</a>
          </nav>

          <div className="header-controls">
            <span className="currency-label">Moneda</span>
            <select value={currency} onChange={(event) => setCurrency(event.target.value)} aria-label="Moneda">
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
            </select>
            <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <AnimatePresence>
        {toast.open ? (
          <motion.div
            className="toast"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            {toast.message}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}