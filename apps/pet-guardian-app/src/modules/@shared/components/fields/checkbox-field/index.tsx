'use client'

import { useRef } from 'react'
import { Controller } from 'react-hook-form'
import type { Control, FieldValues } from 'react-hook-form'

import { Checkbox, Label } from '../../ui'

type CheckboxFieldProps = {
  name: string
  control: Control<FieldValues>
  label: string
  id?: string
  className?: string
}

export const CheckboxField = ({
  name,
  control,
  label,
  id,
  className
}: CheckboxFieldProps) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`flex items-center space-x-2 ${className ?? ''}`}>
          <Checkbox
            id={id}
            ref={ref}
            checked={!!field.value}
            onCheckedChange={field.onChange}
          />
          <Label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
        </div>
      )}
    />
  )
}
