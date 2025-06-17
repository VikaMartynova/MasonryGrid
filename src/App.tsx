import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

const DetailPage = lazy(
  () => import(/* webpackChunkName: "detail-page" */ './pages/DetailPage')
)

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  )
}

export default App
