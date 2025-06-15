import React, { useState, useCallback } from 'react'
import styled from 'styled-components'

import { PhotoComponent } from './components'
import { useFetchPhotos, useInfiniteScroll } from './hooks'
import { PHOTOS_PER_PAGE } from './constants'
import type { PhotoType } from './types'

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

  const setNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1)
  }, [])

  const loaderRef = useInfiniteScroll(setNextPage)

  return (
    <>
      <Header />
      <PhotoGrid>
        {photos.map((photo: PhotoType, index: number) => {
          return (
            <div key={`photo.id_${index}`}>
              <PhotoComponent photo={photo} onClick={() => {}} />
            </div>
          )
        })}
      </PhotoGrid>
      <div ref={loaderRef} style={{ height: '1px' }} />
    </>
  )
}

export default App
