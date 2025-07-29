'use client'

import { useRef } from 'react'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'

import { Switch } from '../../ui'
import type { SwitchFieldProps } from './types'

interface SwitchProps extends SwitchFieldProps {
  name: string
  description?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>
}

export const SwitchField = (props: SwitchProps) => {
  const { label, description, id, name, control, ...rest } = props

  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label
          htmlFor={id}
          className="bg-primary-foreground outline-border flex w-full cursor-pointer items-center justify-between rounded-md p-4 font-medium outline"
        >
          <div className="pointer-events-none flex flex-col">
            <p
              className="text-card-foreground pointer-events-none text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              {label}
            </p>
            <span className="text-muted-foreground text-xs">{description}</span>
          </div>

          <Switch
            {...rest}
            id={id}
            ref={ref}
            checked={!!field.value}
            onCheckedChange={field.onChange}
            onClick={(e) => e.stopPropagation()}
          />
        </label>
      )}
    />
  )
}
