import Users from "./Users";
import Chat from "./Chat";
import { ShootingStars } from "@/Components/ui/shooting-stars";
import { StarsBackground } from "@/Components/ui/stars-background";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import "../bootstrap";
import { usePage } from "@inertiajs/react";
import { encryptPrivateKey, generateKeyPair } from "../Components/utils/crypto";
import axios from "axios";

export default function Main() {
    const { auth } = usePage().props;
    
    const [activeTab, setActiveTab] = useState(() => {
        return sessionStorage.getItem("usersTab") || "chats";
    });

    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        sessionStorage.setItem("usersTab", activeTab);
    }, [activeTab]);

    useEffect(() => {

        if (auth.user && (!auth.user.public_key || !auth.user.private_key_encrypted)) {
            (async () => {
                try {
                    const { privateKey, publicKey } = await generateKeyPair(auth.user.name, auth.user.email);

                    const password = crypto.randomUUID();
                    const privateEncryptedKey = encryptPrivateKey(privateKey, password);

                    await axios.post("/save-user-keys", {
                        user_id: auth.user.id,
                        public_key: publicKey,
                        private_key_encrypted: privateEncryptedKey,
                    });

                    console.log("Keys generated and saved for Google user:", auth.user.email);
                } catch (err) {
                    console.error("Failed to generate/save keys:", err);
                }
            })();
        }
    }, [auth.user]);

    return (
        <>
            <div>
                <ShootingStars />
                <StarsBackground className="bg-[#030303] -z-40" />
            </div>
            <div className="p-5 w-full d-center max-h-dvh h-dvh ">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} pendingCount={pendingCount} />
                <div className="lg:flex-1 h-full main p-5 flex gap-2 bg-white/5 backdrop-blur-xs lg:border-y lg:border-r border border-white/20 shadow-lg rounded-2xl lg:rounded-none lg:rounded-r-2xl overflow-y-hidden">
                    <div className="border-r border-white/20 px-1 select-none w-[400px]">
                        <Users
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            setPendingCount={setPendingCount}
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
