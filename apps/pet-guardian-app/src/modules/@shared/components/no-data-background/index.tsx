import Image, { ImageProps } from 'next/image'

interface NoDataBackgroundProps extends ImageProps {
  text: string
}

export const NoDataBackground = (props: NoDataBackgroundProps) => {
  const { text, alt } = props

  return (
    <div className="flex flex-col items-center gap-8">
      <Image width={320} height={320} {...props} alt={alt} />

      <p className="text-primary animate-pulse text-center text-3xl font-medium">
        {text}
      </p>
    </div>
  )
}
