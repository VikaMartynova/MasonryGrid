import type { PhotoType } from '../types'
import styled from 'styled-components'

export const PhotoImg = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const PhotoComponent = ({
  photoSrc,
  photoAlt = 'Photo',
}: {
  photoSrc: PhotoType['src']
  photoAlt?: string
}) => {
  return (
    <PhotoImg
      as="img"
      srcSet={`
                ${photoSrc.tiny} 240w,
                ${photoSrc.small} 400w,
                ${photoSrc.medium} 800w,
                ${photoSrc.large} 1200w,
                ${photoSrc.large2x} 1600w
              `}
      sizes="(max-width: 480px) 240px,
                     (max-width: 768px) 400px,
                     (max-width: 1024px) 800px,
                     1200px"
      alt={photoAlt}
    />
  )
}
