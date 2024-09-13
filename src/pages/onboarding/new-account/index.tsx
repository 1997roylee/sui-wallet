import { useCallback } from 'react'
import { Button } from '@/compoennts/ui/button'
import { Input } from '@/compoennts/ui/input'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from '@/compoennts/ui/check-box'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/compoennts/ui/form'
import { useConnection } from '@/compoennts/connection-provider'
import { createWalletCommand } from '@/scripts/background/commands'

const passwordCchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 8 characters'),
        confirmPassword: z
            .string()
            .min(6, 'Confirm password must be at least 8 characters'),
        agree: z.boolean(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

export default function Page() {
    const navigate = useNavigate()

    const connection = useConnection()

    const form = useForm<z.infer<typeof passwordCchema>>({
        defaultValues: {
            password: '',
            confirmPassword: '',
            agree: false,
        },
        reValidateMode: 'onSubmit',
        // reValidateMode: 'onBlur',
        resolver: zodResolver(passwordCchema),
    })

    const onSubmit = useCallback(
        async (data: z.infer<typeof passwordCchema>) => {
            if (!data.agree) {
                alert('Please agree to the terms')
                return
            }

            if (!connection){
                throw new Error('Connection not found')
            }

            connection.send(createWalletCommand(data.password))
            navigate('/onboarding/backup-and-done')
        },
        [],
    )

    return (
        <div className="flex flex-col gap-3">
            <div>
                <p>Create a password</p>
                <p>You will use this to unlock your wallet</p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel />
                                <FormControl>
                                    <Input
                                        placeholder="Confirm Password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="agree"
                        render={({ field }) => (
                            <FormItem className="flex items-center">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="">
                                    <FormLabel>
                                        I agree to the Term of Service
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button className="w-full" type="submit">
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    )
}
