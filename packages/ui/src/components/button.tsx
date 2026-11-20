import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { IconLoader2 } from '@tabler/icons-react'
import { cn, tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: [
    'group/button cursor-pointer relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition ease-in-out outline-none select-none',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  variants: {
    variant: {
      default:
        'bg-primary text-primary-foreground hover:bg-primary/80 font-medium',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium',
      ghost:
        'bg-transparent text-foreground/80 hover:text-foreground hover:bg-muted/50',
    },
    size: {
      default: 'h-10 gap-1.5 px-4 text-sm [&_svg]:size-4',
      sm: 'h-8 gap-1 px-3 text-xs [&_svg]:size-3.5',
      lg: 'h-12 gap-2 px-6 text-base [&_svg]:size-5',
    },
    isIcon: {
      true: 'px-0',
    },
  },
  compoundVariants: [
    { isIcon: true, size: 'default', class: 'size-10' },
    { isIcon: true, size: 'sm', class: 'size-8' },
    { isIcon: true, size: 'lg', class: 'size-12' },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    isIcon: false,
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonProps extends ButtonPrimitive.Props, ButtonVariants {
  isLoading?: boolean
}

function Button({
  isIcon,
  isLoading = false,
  disabled,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot='button'
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={cn(buttonVariants({ variant, size, isIcon }), className)}
      {...props}
    >
      {isLoading && (
        <span className='absolute inset-0 flex items-center justify-center'>
          <IconLoader2 className='animate-spin' aria-hidden='true' />
        </span>
      )}
      <span
        className={
          isLoading
            ? 'invisible inline-flex items-center gap-[inherit]'
            : 'inline-flex items-center gap-[inherit]'
        }
      >
        {children}
      </span>
    </ButtonPrimitive>
  )
}

export { Button, type ButtonVariants }
