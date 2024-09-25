'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'

const avatarVariants = cva(
    'inline-flex items-center justify-center rounded-full',
    {
        variants: {
            size: {
                default: 'h-10 w-10',
                sm: 'h-8 w-8',
                lg: 'h-12 w-12',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    },
)

export interface AvatarProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof avatarVariants> {
    asChild?: boolean
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'div'
        return (
            <Comp
                className={cn(avatarVariants({ size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)

Avatar.displayName = 'Avatar'

export { Avatar, avatarVariants }
