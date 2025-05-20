import Image, { ImageProps } from 'next/image'

interface NoDataBackgroundProps extends ImageProps {
  text: string
}

export const NoDataBackground = (props: NoDataBackgroundProps) => {
  const { text, alt } = props

  return (
    <div className="flex gap-8 flex-col items-center">
      <Image width={320} height={320} {...props} alt={alt} />

      <p className="text-primary text-3xl text-center font-medium animate-pulse">
        {text}
      </p>
    </div>
  )
}
