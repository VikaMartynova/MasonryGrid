import { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { PhotoComponent, Header } from '../components'
import { useInfiniteScroll, useFetchData } from '../hooks'
import { PHOTOS_PER_PAGE } from '../constants'
import type { PhotoType } from '../types'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
`

const PhoroWrapper = styled.div<{ bgColor?: string }>`
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
  background-color: ${({ bgColor }) => bgColor || '#eee'};
`

const HomePage = () => {
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const [allPhotos, setAllPhotos] = useState<PhotoType[]>([])
  const { data, loading, error } = useFetchData<{ photos: PhotoType[] }>(
    `curated?page=${page}&per_page=${PHOTOS_PER_PAGE}`
  )

  useEffect(() => {
    if (data && data?.photos) {
      setAllPhotos((prev) => [...prev, ...data.photos])
    }
  }, [data])

  const setNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1)
  }, [])

  const loaderRef = useInfiniteScroll(setNextPage)

  const navigateToDetail = useCallback((id: number) => {
    navigate(`/detail/${id}`)
  }, [])

  return (
    <PageContainer>
      <Header title="Gallery" />
      {allPhotos.length ? (
        <PhotoGrid>
          {allPhotos.map((photo: PhotoType, index: number) => {
            return (
              <PhoroWrapper
                bgColor={photo.avg_color}
                key={`photo.id_${photo.id}_${index}`}
                onClick={() => navigateToDetail(photo.id)}
              >
                <PhotoComponent photoSrc={photo.src} photoAlt={photo.alt} />
              </PhoroWrapper>
            )
          })}
        </PhotoGrid>
      ) : null}
      {loading ? <div>Loading...</div> : null}
      {error ? <div>Error: {error}</div> : null}
      <div ref={loaderRef} style={{ height: '1px' }} />
    </PageContainer>
  )
}

export default HomePage
