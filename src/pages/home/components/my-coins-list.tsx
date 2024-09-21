import { Avatar, AvatarFallback, AvatarImage } from '@/compoennts/ui/avatar'

function CoinItem() {
    return <div className="flex rounded-lg hover:bg-gray-50 p-3">
        <div className="flex items-center">
            <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
               <div>
                <div>Sui</div>
                <div>0 SUI</div>
               </div>
            </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex">Seeting</div>
    </div>
}

export default function MyCoinsList() {
    return <div className="flex flex-col">
        <CoinItem/>
        <CoinItem/>
        <CoinItem/>
        <CoinItem/>
        <CoinItem/>
    </div>
}
