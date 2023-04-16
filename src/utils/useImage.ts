import { useEffect, useState } from 'react'

export const useImage = (name: string) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [image, setImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getImage = async () => {
      try {
        const response: typeof import('*.webp') = await import(
          `../assets/${name}.webp`
        )
        setImage(response.default)
        if (error) {
          setError(null)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    getImage()
  }, [name])

  return {
    loading,
    error,
    image,
  }
}
