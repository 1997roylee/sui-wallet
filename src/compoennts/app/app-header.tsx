import { AvatarFallback } from '@radix-ui/react-avatar'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { LuCopy } from 'react-icons/lu'
export default function AppHeader() {
    return (
        <div className="flex items-center bg-white">
            <div className="flex items-center">
                <Avatar>
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>Account 01</p>
                <Button size="icon" variant='ghost'>
                    <LuCopy />
                </Button>
            </div>
            <div className="flex-1"></div>
            <div className="flex">Seeting</div>
        </div>
    )
}
