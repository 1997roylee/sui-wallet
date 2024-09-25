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
import { useForm } from 'react-hook-form'
import { useConnection } from '@/compoennts/connection-provider'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { verifyPasswordCommand } from '@/scripts/background/commands'
import { Input } from '@/compoennts/ui/input'
import { Button } from '@/compoennts/ui/button'
import { Heading } from '@/compoennts/ui/heading'
import { useAppState } from '@/stores/app.store'

const passwordCchema = z.object({
    password: z.string().min(6, 'Password must be at least 8 characters'),
})

export default function Page() {
    const navigate = useNavigate()
    const {setAuthenticated} = useAppState();
    const connection = useConnection()

    const form = useForm<z.infer<typeof passwordCchema>>({
        defaultValues: {
            password: '',
        },
        reValidateMode: 'onSubmit',
        resolver: zodResolver(passwordCchema),
    })

    const onSubmit = useCallback(
        async (data: z.infer<typeof passwordCchema>) => {
            if (!connection) {
                throw new Error('Connection not found')
            }

            const isValid = await connection.send(
                verifyPasswordCommand(data.password),
            )
            console.log('isValid', isValid)
            if (!isValid) return

            setAuthenticated(true)
            navigate('/home')
        },
        [],
    )

    const isDisabled = !form.formState.isValid

    return (
        <div className="flex flex-col flex-1 p-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 flex-1"
                >
                    <div className="flex border-b">
                        <Heading>Sui wallet</Heading>
                    </div>
                    <div className="flex-1 flex justify-center flex-col">
                        <Heading size="h3" align="center">
                            Enter your password
                        </Heading>
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
                    </div>

                    <Button
                        className="w-full"
                        type="submit"
                        size="lg"
                        disabled={isDisabled}
                    >
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    )
}
