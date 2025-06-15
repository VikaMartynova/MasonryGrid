import { useEffect, useRef } from 'react'

export const useInfiniteScroll = (
  callback: () => void,
  threshold: string = '20%'
) => {
  const loaderRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      },
      {
        root: null,
        rootMargin: `0px 0px ${threshold} 0px`,
        threshold: 0,
      }
    )

    const current = loaderRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [callback, threshold])

  return loaderRef
}
