import VerifyBadge from "@/Components/ui/VerifyBadge";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

export default function SuggestedUser({ data, type, onRequestSent }) {
    const randomDelay = `${Math.random() * 5}s`;
    const randomDuration = `${1.5 + Math.random() * 2}s`;

    const [requested, setRequested] = useState(false);

    // ! Send Request API
    const handleSendRequest = async () => {
        if (requested) return;
        try {
            setRequested(true);
            const res = await axios.post(`/friend-request/${data.id}`);
            // console.log("API response:", res.data);
        } catch (err) {
            console.error("Error sending friend request:", err);
            if (err.response?.status === 400 && onRequestSent) {
                onRequestSent(data.id);
            }
        }
    };
    return (
        <div className="select-none">
            <div className=" relative flex items-center justify-between sharp-border py-3 pl-2 pr-4 mt-1 cursor-pointer ">
                <span className="flex gap-4 select-none w-full">
                    <img
                        src={
                            data.profile_pic ??
                            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                        }
                        alt="profile-pic"
                        className="w-9 h-9 rounded-full outline-[2px] outline-green-700 outline-offset-4 "
                    />
                    <div className="details text-white select-none">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium tracking-wider">
                                {data.name.length > 20
                                    ? data.name.slice(0, 20) + "..."
                                    : data.name}
                            </span>
                            {data.is_verified && (
                                <div className="relative w-4 h-4">
                                    <VerifyBadge />
                                </div>
                            )}

                            {data.is_premium && (
                                <span
                                    className={`premium-badge relative d-center p-0.5 w-5 h-5 bg-glass rounded-full`}
                                    style={{
                                        "--shine-delay": randomDelay,
                                        "--shine-duration": randomDuration,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCrown}
                                        className={`relative z-10  text-xs ${data.username == "hamza-aamir"
                                            ? "text-red-800"
                                            : "text-yellow-400"
                                            }`}
                                    />
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-normal text-gray-400">
                            {data.username}
                        </p>
                    </div>
                </span>
                {requested ? (
                    <button
                        disabled
                        className="text-xs bg-black/20 h-7 px-2 font-semibold text-white/40 rounded-md cursor-default"
                    >
                        Requested
                    </button>
                ) : (
                    <button
                        onClick={handleSendRequest}
                        className="text-xs bg-glass h-7 text-nowrap px-2 font-sans font-semibold text-white rounded-full hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                    >
                        Send request
                    </button>
                )}
            </div>
        </div>
    );
}
