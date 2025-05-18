import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { useController, FieldValues, Control, Path } from 'react-hook-form'

import Image from 'next/image'

import { cn } from '@user-app/modules/@shared/utils'

export interface ImageFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  errorMessage?: string
  required?: boolean
  accept?: string
  maxSizeMB?: number
}

export function ImageField<T extends FieldValues>({
  name,
  control,
  label = '',
  errorMessage,
  accept = 'image/*',
  maxSizeMB = 5
}: ImageFieldProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control })

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > maxSizeMB * 1024 * 1024) {
      return
    }
    onChange(file)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer border border-dashed border-gray-300',
          error && 'border-red-500'
        )}
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <Image
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            width={96}
            height={96}
            alt="Avatar preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-gray-400 text-xs text-center">
            {label || 'Inserir foto'}
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleFileChange}
        data-testid={`image-upload-${name}`}
      />
      {!!errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  )
}
