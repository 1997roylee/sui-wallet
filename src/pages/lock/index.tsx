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

const passwordCchema = z.object({
    password: z.string().min(6, 'Password must be at least 8 characters'),
})

export default function Page() {
    const navigate = useNavigate()

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

            await connection.send(verifyPasswordCommand(data.password))
        },
        [],
    )

    return (
        <div className="flex flex-col">
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

                    <Button className="w-full" type="submit" size="lg">
                        Continue
                    </Button>
                </form>
            </Form>
        </div>
    )
}
