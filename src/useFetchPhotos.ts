import { useEffect, useState } from 'react'

import { PEXELS_API_KEY } from '../config'
import type { PhotoType } from './types'

const fetchPhotos = async (
  page: number,
  limit: number
): Promise<PhotoType[]> => {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?page=${page}&per_page=${limit}`,
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
    return data.photos
  } catch (error) {
    console.error('Failed to fetch photos:', error)
    return []
  }
}

export const useFetchPhotos = (
  page: number,
  limit: number
): {
  photos: PhotoType[]
} => {
  const [photos, setPhotos] = useState<PhotoType[]>([])

  useEffect(() => {
    console.log('useEffect called with page:', page, 'limit:', limit)
    fetchPhotos(page, limit).then((fetchedPhotos) => {
      setPhotos((curentPhotos) => [...curentPhotos, ...fetchedPhotos])
    })
  }, [page, limit])

  return {
    photos,
  }
}
