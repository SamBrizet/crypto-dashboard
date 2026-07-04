import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loader from './components/Loader.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import AppShell from './layout/AppShell.jsx'

const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const CoinDetailPage = lazy(() => import('./pages/CoinDetailPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader screen label="Cargando dashboard cripto" />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<DashboardPage />} />
            <Route path="coin/:coinId" element={<CoinDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
