import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'

const badgeVariants = cva('rounded-lg mb-1', {
  variants: {
    variant: {
      default: 'bg-primary',
      dark: 'bg-green-dark'
    },
    size: {
      default: 'w-10 h-[6px]',
      sm: 'w-8 h-[6px]',
      lg: 'w-14 h-[6px] mb-2'
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type BadgeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    hideOnMobile?: boolean
  }

export const LineBadge = ({
  size,
  variant,
  className,
  hideOnMobile = false,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={cn(badgeVariants({ variant, size, className }), {
        'hidden md:block': hideOnMobile
      })}
      {...props}
    />
  )
}
