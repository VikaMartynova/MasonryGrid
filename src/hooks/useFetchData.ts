import { useState, useEffect } from 'react'
import { PEXELS_API_KEY } from '../../config'
import { PEXEL_ENDPOINT } from '../constants'

export const useFetchData = <T = any>(
  path: string
): {
  data: T | null
  loading: boolean
  error: string | null
} => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${PEXEL_ENDPOINT}${path}`, {
          headers: {
            Authorization: `${PEXELS_API_KEY}`,
          },
        })
        if (!response.ok) throw new Error('Failed to fetch')
        const result: T = await response.json()
        setData(result)
      } catch (err: any) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [path, setData])

  return { data, loading, error }
}
