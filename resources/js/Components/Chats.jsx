import VerifyBadge from "@/Components/ui/VerifyBadge";

export default function Chats({ data }) {
    return (
        <div className="select-none">
            <div className="chat-card relative flex items-center justify-between sharp-border py-3 pl-2 pr-4 mt-1 cursor-pointer ">
                <span className="flex gap-4 select-none">
                    <img
                        src={data.profile}
                        alt="profile-pic"
                        className="w-9 h-9 rounded-full outline-[2px] outline-green-700 outline-offset-4 "
                    />
                    <div className="details text-white select-none">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium tracking-wider line-clamp-1">
                                {data.name.length > 20 ? data.name.slice(0, 20) + "..." : data.name}
                            </span>
                            <div className="relative w-4.5 h-4.5 ">
                                <VerifyBadge />
                            </div>
                            <div className="bg-glass text-gray-200 px-1.5 py-[1px] rounded-xl inline-flex items-center gap-1">
                                <span className="text-[10px] ">🔥 7500</span>
                            </div>
                        </div>
                        <p className="text-xs font-normal text-gray-400">
                            {data.msg.length > 30
                                ? data.msg.slice(0, 30) + "..."
                                : data.msg}
                        </p>

                        <div className="hidden text-green-500 text-xs">
                            typing...
                        </div>
                    </div>
                </span>

                <div className="flex flex-col items-center self-start ">
                    <span className="text-[10px] text-white/60">
                        {data.time}
                    </span>

                    {data.noti && (
                        <div className="bg-glass mt-1 w-5 leading-1 h-5 rounded-full  text-[9px] text-white d-center">
                            {data.noti}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
