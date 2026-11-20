import { Input as InputPrimitive } from '@base-ui/react/input'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: [
    'w-full min-w-0 rounded-lg border border-transparent bg-input/30 text-base transition-colors outline-none text-sm placeholder:text-muted-foreground focus-visible:border-ring',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:disabled:bg-input/80',
    'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
    'data-[invalid]:border-destructive data-[invalid]:ring-3 data-[invalid]:ring-destructive/20 dark:data-[invalid]:border-destructive/50 dark:data-[invalid]:ring-destructive/40',
    'file:me-2.5 file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
  ],
  variants: {
    size: {
      sm: 'h-8 px-2.5 py-1 text-xs file:h-6',
      default: 'h-10 px-3 py-2 file:h-6',
      lg: 'h-12 px-3.5 py-2.5 text-base file:h-7',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

type InputVariants = VariantProps<typeof inputVariants>

interface InputProps
  extends Omit<InputPrimitive.Props, 'size'>, InputVariants {}

function Input({ className, size, type, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot='input'
      className={(state) =>
        inputVariants({
          size,
          className:
            typeof className === 'function' ? className(state) : className,
        })
      }
      {...props}
    />
  )
}

export { Input, type InputVariants }
