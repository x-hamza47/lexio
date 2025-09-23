import Users from "./Users";
import Chat from "./Chat";
import { ShootingStars } from "@/Components/ui/shooting-stars";
import { StarsBackground } from "@/Components/ui/stars-background";
import Sidebar from "./Sidebar";

export default function Main() {
    return (
        <>
            <div>
                <ShootingStars />
                <StarsBackground className="bg-[#030303] -z-40" />
            </div>
            <div className="p-5 w-full d-center max-h-dvh h-dvh ">
                <Sidebar/>
                <div className="lg:flex-1 h-full main p-5 flex gap-2 bg-white/5 backdrop-blur-xs border-y border-r border-white/20 shadow-lg rounded-r-2xl overflow-y-hidden">
                    <div className="border-r border-white/20 px-1 select-none w-[400px]">
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
