import * as React from 'react'
import { Controller, Control } from 'react-hook-form'

import { SelectProps } from '@radix-ui/react-select'
import { CircleX } from 'lucide-react'

import {
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../../ui'

interface SelectFieldProps extends SelectProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  placeholder?: string
  label?: string
  options: {
    label: string
    value: string
  }[]
  errorMessage?: string
}

export const SelectedField = ({
  name,
  control,
  options,
  placeholder,
  label,
  errorMessage,
  required,
  ...rest
}: SelectFieldProps) => {
  return (
    <fieldset style={{ width: '100%' }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Label className="mb-2">
              {label}: {required && '*'}
            </Label>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              {...rest}
            >
              <SelectTrigger ref={field.ref} className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="min-w-full">
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}
      />
      {errorMessage && (
        <div className="flex gap-1 items-center">
          <CircleX size={20} className="fill-red-500 text-white" />
          <p className="font-medium text-xs text-red-500">{errorMessage}</p>
        </div>
      )}
    </fieldset>
  )
}
