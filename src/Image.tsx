import { useImage } from './utils/useImage'

export const Image = ({ name }: { name: string | number }) => {
  const { image, loading, error } = useImage(name.toString())
  return (
    <div className={'image-root'}>
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
