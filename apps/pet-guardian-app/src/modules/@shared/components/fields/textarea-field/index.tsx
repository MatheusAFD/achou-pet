import * as React from 'react'

import { CircleX } from 'lucide-react'

import { cn } from '@user-app/modules/@shared/utils/index'

import { Conditional } from '../../conditional'
import { Label } from '../../ui'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: string
  errorMessage?: string
}

export const TextareaField = (props: TextareaProps) => {
  const { label, errorMessage, className, required, id, ...rest } = props

  const hasLabel = Boolean(label)

  return (
    <fieldset>
      <Conditional condition={hasLabel}>
        <Label htmlFor={`data-test-id-${id}`} className="mb-2">
          {label}: {required && '*'}
        </Label>
      </Conditional>
      <textarea
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-xs placeholder:font-medium placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          errorMessage && 'border-red-400 placeholder:text-red-400',
          className
        )}
        id={`data-test-id-${id}`}
        {...rest}
      />

      <div
        className={cn(
          'transition-all duration-300 ease-in-out overflow-hidden',
          errorMessage ? 'max-h-10 mt-1' : 'max-h-0'
        )}
      >
        {errorMessage && (
          <div className="flex gap-1 items-center">
            <CircleX size={20} className="fill-red-500 text-white" />
            <p className="font-medium text-xs text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </fieldset>
  )
}
