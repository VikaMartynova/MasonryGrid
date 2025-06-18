import { renderHook, waitFor } from '@testing-library/react'
import { useFetchData } from './useFetchData'

global.fetch = jest.fn()

describe('useFetchData', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches data successfully', async () => {
    const mockData = { photos: [{ id: 1, url: 'photo.jpg' }] }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    })

    const { result } = renderHook(() =>
      useFetchData<typeof mockData>('/photos')
    )

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toEqual(null)
    expect(result.current.error).toBe(null)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toEqual(mockData)
    })
  })

  it('handles fetch error', async () => {
    ;(fetch as jest.Mock).mockResolvedValue({ ok: false })

    const { result } = renderHook(() => useFetchData<any>('/photos'))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch')
      expect(result.current.data).toBeNull()
      expect(result.current.loading).toBe(false)
    })
  })
})
