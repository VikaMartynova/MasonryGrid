import React, { useState } from 'react'
import styled from 'styled-components'

import { PhotoComponent } from './components'
import { useFetchPhotos } from './useFetchPhotos'
import { PHOTOS_PER_PAGE } from './constants'

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
`

const Header = () => {
  return (
    <header>
      <h1>My App</h1>
    </header>
  )
}

function App() {
  const [page, setPage] = useState(1)
  const { photos } = useFetchPhotos(page, PHOTOS_PER_PAGE)
  return (
    <>
      <Header />
      <PhotoGrid>
        {photos.map((photo, index) => {
          return (
            <div key={`photo.id_${index}`}>
              <PhotoComponent photo={photo} onClick={() => {}} />
            </div>
          )
        })}
      </PhotoGrid>
    </>
  )
}

export default App
