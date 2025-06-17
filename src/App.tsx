import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

const DetailPage = lazy(
  () => import(/* webpackChunkName: "detail-page" */ './pages/DetailPage')
)

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
