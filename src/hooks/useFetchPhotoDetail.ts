import { PEXELS_API_KEY } from '../../config'

import type { PhotoType } from '../types'

export const useFetchPhotoDetail = async (
  photoId: string
): Promise<PhotoType | null> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/photos/${photoId}`,
      {
        headers: {
          Authorization: `${PEXELS_API_KEY}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch photo detail:', error)
    return null
  }
}
