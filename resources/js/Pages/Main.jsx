import Users from "./Users";
import Chat from "./Chat";
import { ShootingStars } from "@/Components/ui/shooting-stars";
import { StarsBackground } from "@/Components/ui/stars-background";


export default function Main() {


    return (
        <>
            <div>
                <ShootingStars />
                <StarsBackground className="bg-[#030303] -z-40" />
            </div>
            <div className="p-5 w-full d-center max-h-dvh">
                <div className="lg:flex-1 h-full main p-5 flex gap-2 bg-white/5 backdrop-blur-xs border border-white/20 shadow-lg rounded-2xl overflow-y-hidden">
                    <div className="border-r border-white/20 px-1 select-none">
                        <Users />
                    </div>
                    <div className="flex-1 lg:block hidden">
                        <Chat />
                    </div>
                </div>
            </div>
        </>
    );
}
