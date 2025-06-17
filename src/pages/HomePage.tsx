import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { PhotoComponent, Header } from '../components'
import { useFetchPhotos, useInfiniteScroll } from '../hooks'
import { PHOTOS_PER_PAGE } from '../constants'
import type { PhotoType } from '../types'

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
`

const PhoroWrapper = styled.div`
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
`

const HomePage = () => {
  const [page, setPage] = useState(1)
  const { photos } = useFetchPhotos(page, PHOTOS_PER_PAGE)
  const navigate = useNavigate()

  const setNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1)
  }, [])

  const loaderRef = useInfiniteScroll(setNextPage)

  const navigateToDetail = useCallback((id: number) => {
    navigate(`/detail/${id}`)
  }, [])

  return (
    <>
      <Header title="Gallery" />
      <PhotoGrid>
        {photos.map((photo: PhotoType, index: number) => {
          return (
            <PhoroWrapper
              key={`photo.id_${photo.id}_${index}`}
              onClick={() => navigateToDetail(photo.id)}
            >
              <PhotoComponent photoSrc={photo.src} photoAlt={photo.alt} />
            </PhoroWrapper>
          )
        })}
      </PhotoGrid>
      <div ref={loaderRef} style={{ height: '1px' }} />
    </>
  )
}

export default HomePage
