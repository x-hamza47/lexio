import Users from "./Users";
import Chat from "./Chat";
import { ShootingStars } from "@/Components/ui/shooting-stars";
import { StarsBackground } from "@/Components/ui/stars-background";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function Main() {
    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem("usersTab") || "chats";
    });

    useEffect(() => {
        sessionStorage.setItem("usersTab", activeTab);
    }, [activeTab]);

    return (
        <>
            <div>
                <ShootingStars />
                <StarsBackground className="bg-[#030303] -z-40" />
            </div>
            <div className="p-5 w-full d-center max-h-dvh h-dvh ">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="lg:flex-1 h-full main p-5 flex gap-2 bg-white/5 backdrop-blur-xs lg:border-y lg:border-r border border-white/20 shadow-lg rounded-2xl lg:rounded-none lg:rounded-r-2xl overflow-y-hidden">
                    <div className="border-r border-white/20 px-1 select-none w-[400px]">
                        <Users
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </div>
                    <div className="flex-1 lg:block hidden">
                        <Chat />
                    </div>
                </div>
            </div>
        </>
    );
}
