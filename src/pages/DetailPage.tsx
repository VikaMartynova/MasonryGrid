import { useParams } from 'react-router-dom'
import { PhotoComponent, Header } from '../components'
import { useFetchData } from '../hooks'
import styled from 'styled-components'

import type { PhotoType } from '../types'

const PageContainer = styled.div<{ gradientColor?: string }>`
  background: ${({ gradientColor }) =>
    `linear-gradient(to left top, ${gradientColor || 'rgba(0, 0, 0, 0.6)'}, transparent)`};
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
`

export const PhotoInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;

  a {
    display: inline-block;
    margin-top: 1px;
    text-decoration: underline;
  }
`

const PhotoWrapper = styled.div`
  position: relative;
  object-fit: contain;
  grow: 1;
  overflow: hidden;
`

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const {
    data: photoDetail,
    loading,
    error,
  } = useFetchData<PhotoType>(`photos/${id}`)

  return (
    <PageContainer gradientColor={photoDetail?.avg_color}>
      <PhotoInfo>
        {photoDetail ? (
          <>
            <Header title={photoDetail.alt || `Photo_${photoDetail.id}`} />
            <p>By {photoDetail.photographer}</p>
            <a
              href={photoDetail.photographer_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Photographer’s Profile
            </a>
            <PhotoWrapper>
              <PhotoComponent
                photoSrc={photoDetail.src}
                photoAlt={photoDetail.alt}
              />
            </PhotoWrapper>
          </>
        ) : loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : null}
      </PhotoInfo>
    </PageContainer>
  )
}

export default DetailPage
