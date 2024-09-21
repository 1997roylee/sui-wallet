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
import { initPasswordCommand } from '@/scripts/background/commands'
import OnboardingLayout from '@/layouts/onboarding'
import { Heading } from '@/compoennts/ui/heading'
import useStepState from '@/stores/step.store'

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

    const {nextStep} =useStepState();
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

            if (!connection) {
                throw new Error('Connection not found')
            }

            await connection.send(initPasswordCommand(data.password))
            nextStep();
            navigate('/onboarding/backup-and-done', {
                state: {}
            })
        },
        [],
    )

    const disabledButton = !form.formState.isValid || !form.formState.isDirty

    return (
        <OnboardingLayout>
            <div className="flex flex-col gap-3">
                <div>
                    <Heading size='h3'>Create a password</Heading>
                    <Heading>You will use this to unlock your wallet</Heading>
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
                                    <FormLabel className='font-normal !mt-0 pl-2'>
                                        I agree to the Term of Service
                                    </FormLabel>
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" type="submit" size='lg' disabled={disabledButton}>
                            Continue
                        </Button>
                    </form>
                </Form>
            </div>
        </OnboardingLayout>
    )
}
