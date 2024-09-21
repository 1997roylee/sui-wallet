import { PropsWithChildren } from "react";

export default function Health({children}:PropsWithChildren) {
    return (
        <div
            style={{
                background:
                    'linear-gradient(rgba(235, 55, 66, 0.05) 0%, rgba(235, 55, 66, 0) 100%)',
            }}
        >
            {children}
        </div>
    )
}
