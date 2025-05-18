import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { useController, FieldValues, Control, Path } from 'react-hook-form'

import { Trash2 } from 'lucide-react'

import { Button } from '@user-app/modules/@shared/components/ui'
import { cn } from '@user-app/modules/@shared/utils'

import { ChildTooltip } from '../../child-tooltip'
import { Avatar, AvatarImage } from '../../ui'

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

  function handleDelete() {
    onChange(undefined)
    if (inputRef.current) inputRef.current.value = ''
  }

  function isFile(v: unknown): v is File {
    return v instanceof File
  }

  function getImageSrc(): string | null {
    if (isFile(value)) {
      return URL.createObjectURL(value)
    }

    if (typeof value === 'string' && value) {
      return value
    }
    return null
  }

  const imageSrc = getImageSrc()

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'size-32 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer border border-dashed border-gray-300 relative',
          error && 'border-red-500'
        )}
        onClick={() => inputRef.current?.click()}
      >
        {imageSrc ? (
          <>
            <Avatar className="w-full h-full outline-2 outline-primary">
              <AvatarImage
                src={imageSrc}
                width={128}
                height={128}
                alt="Avatar preview"
                className="w-full h-full object-cover rounded-full"
              />
            </Avatar>
            <ChildTooltip content="Remover foto">
              <Button
                type="button"
                size="icon"
                className="absolute  -bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete()
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </ChildTooltip>
          </>
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
