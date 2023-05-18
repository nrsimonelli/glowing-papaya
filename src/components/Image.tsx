import { useImage } from '../utils/useImage'

export const Image = ({
  name,
  className,
}: {
  name: string | number
  className?: string
}) => {
  const { image, loading, error } = useImage(name.toString())
  return (
    <div className={`ImageRoot ${className ?? ''}`}>
      {loading ? (
        <div className='image loading' />
      ) : error ? (
        <img className='image fallback' src={'src/assets/FALLBACK.webp'} />
      ) : (
        <img className='image' src={image} />
      )}
    </div>
  )
}
