// import LiquidGlass from "liquid-glass-react";
import Users from "./Users";
import Chat from "./Chat";

export default function Main() {
    return (
        <>
            <div className="p-5 w-full d-center max-h-dvh">
                <div className="lg:flex-1 h-full main p-5 flex gap-2 bg-white/5 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl overflow-y-hidden">
                    {/* <LiquidGlass
                displacementScale={60}
                blurAmount={0.05}
                saturation={140}
                aberrationIntensity={10}
                elasticity={0.10}
                cornerRadius={16}
                padding="20px 30px"
                style={{ position: 'fixed', top: '50%', left: '50%' }}
                className="select-none"
                > */}
                    <div className="border-r border-white/20 px-1 select-none">
                        <Users />
                    </div>
                    <div className="flex-1 lg:block hidden">
                        <Chat />
                    </div>

                    {/* </LiquidGlass> */}
                </div>
            </div>
        </>
    );
}
