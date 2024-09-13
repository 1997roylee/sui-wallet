export function createCommand({
    name,
    callback,
}: {
    name: string
    callback: Function
}) {
    return {
        name,
        callback,
    }
}

export interface CommandPayload<TData extends any> {
    name: string
    data: TData
}

export function createCommandPayload<TData extends any>(name: string) {
    return (data?: TData) =>
        ({
            name,
            data,
        }) as CommandPayload<TData>
}
