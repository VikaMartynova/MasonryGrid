import type { PhotoType } from '../types'
import styled from 'styled-components'

export const PhotoItem = styled.div`
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

export const PhotoComponent = ({
  photo,
  onClick,
}: {
  photo: PhotoType
  onClick: (photoId: number) => void
}) => {
  return (
    <PhotoItem onClick={() => onClick(photo.id)}>
      <img
        srcSet={`
                ${photo.src.tiny} 240w,
                ${photo.src.small} 400w,
                ${photo.src.medium} 800w,
                ${photo.src.large} 1200w,
                ${photo.src.large2x} 1600w
              `}
        sizes="(max-width: 480px) 240px,
                     (max-width: 768px) 400px,
                     (max-width: 1024px) 800px,
                     1200px"
        alt={photo.alt}
      />
    </PhotoItem>
  )
}
