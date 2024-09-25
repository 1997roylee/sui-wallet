import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const headingVariants = cva('', {
    variants: {
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        },
        size: {
            h1: 'text-4xl font-medium',
            h2: 'text-3xl font-medium',
            h3: 'text-2xl font-medium',
            h4: 'text-xl font-medium',
            h5: 'text-lg font-medium',
            h6: 'text-base font-medium',
            default: 'text-base',
            sm: 'text-sm',
            xs: 'text-xs',
        },
    },
    defaultVariants: {
        size: 'default',
        align: 'left',
    },
})

export interface HeadingProps
    extends React.ButtonHTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof headingVariants> {
    asChild?: boolean
}

const Heading = React.forwardRef<HTMLParagraphElement, HeadingProps>(
    ({ className, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'p'
        return (
            <Comp
                className={cn(headingVariants({ size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)
Heading.displayName = 'Heading'

export { Heading, headingVariants }
