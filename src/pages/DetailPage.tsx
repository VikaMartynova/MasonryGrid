import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PhotoComponent, Header } from '../components'
import { useFetchPhotoDetail } from '../hooks'
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

    &:hover {
      text-decoration: underline;
    }
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
  const [photoDetail, setPhotoDetail] = useState<PhotoType | null>(null)

  useEffect(() => {
    if (id) {
      useFetchPhotoDetail(id).then((data) => {
        setPhotoDetail(data)
      })
    }
  }, [id])

  if (!photoDetail) {
    return <div>Loading...</div>
  }

  return (
    <PageContainer gradientColor={photoDetail.avg_color}>
      <PhotoInfo>
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
      </PhotoInfo>
    </PageContainer>
  )
}

export default DetailPage
