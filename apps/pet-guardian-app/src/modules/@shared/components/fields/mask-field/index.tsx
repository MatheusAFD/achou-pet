'use client'

import { useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues } from 'react-hook-form'

import IMask from 'imask'

import { TextField } from '../text-field'
import type { TextFieldProps } from '../text-field'

interface MaskFieldProps extends TextFieldProps {
  name: string
  label?: string
  pattern: string
  errorMessage?: string
  isValid?: boolean
  control: Control<FieldValues>
  onValidate?: (value: string) => void | Promise<void>
}

export const MaskField = ({
  label = '',
  type = 'text',
  name,
  pattern,
  placeholder,
  errorMessage,
  control,
  onValidate,
  ...props
}: MaskFieldProps) => {
  const [maskedValue, setMaskedValue] = useState('')

  const masked = useMemo(
    () =>
      IMask.createMask({
        mask: pattern
      }),
    [pattern]
  )

  const handleMasking = (value: string) => {
    masked.resolve(value)
    return masked.value
  }

  const unmask = (value: string) => {
    return value.replace(/\D/g, '')
  }

  return (
    <div className="w-full flex flex-col">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            label={label}
            value={maskedValue || handleMasking(field.value || '')}
            errorMessage={errorMessage}
            disabled={props.disabled}
            onChange={async (e) => {
              const inputValue = e.target.value
              const unmaskedValue = unmask(inputValue)

              if (unmask(pattern).length < unmaskedValue.length) {
                return
              }

              const newMaskedValue = handleMasking(inputValue)
              setMaskedValue(newMaskedValue)

              field.onChange(unmaskedValue)

              if (unmask(pattern).length === unmaskedValue.length) {
                await onValidate?.(unmaskedValue)
              }
            }}
            placeholder={placeholder}
            {...props}
          />
        )}
      />
    </div>
  )
}
