import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-1 rounded-md ring-offset-background transition-colors outline-none focus-visible:ring-2 focus-within:ring-2 ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm font-bold border',
    {
        variants: {
            variant: {
                default: '',
                primary: 'bg-primary-500 text-white',
                secondary: 'text-primary-500',
            },
            size: {
                xsm: 'py-1 px-2 max-sm:py-0 max-sm:px-1',
                sm: 'py-2 px-3 max-sm:py-1 max-sm:px-2 ',
                md: 'py-3 px-4 max-sm:py-2.5 max-sm:px-3',
                default: 'py-2 px-5 max-sm:py-2 max-sm:px-3',
                lg: 'py-4 px-8',
                wide: 'py-4 px-16',
                xl: 'py-6 px-16',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => (
        <button
            className={`${buttonVariants({ variant, size })} ${
                className ?? ''
            }`}
            ref={ref}
            {...props}
        />
    )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
