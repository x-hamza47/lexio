import VerifyBadge from "@/Components/ui/VerifyBadge";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PendingRequests({ data, type, requestId }) {
    const randomDelay = `${Math.random() * 5}s`; 
    const randomDuration = `${1.5 + Math.random() * 2}s`;

    return (
        <div className="select-none">
            <div className="chat-card relative flex items-center justify-between sharp-border py-3 pl-2 pr-4 mt-1 cursor-pointer ">
                <span className="flex gap-4 select-none">
                    <img
                        src={data.profile_pic}
                        alt="profile-pic"
                        className="w-9 h-9 rounded-full outline-[2px] outline-green-700 outline-offset-4 "
                    />
                    <div className="details text-white select-none">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-white text-sm font-medium tracking-wider line-clamp-1">
                                {data.name}
                            </span>
                            {data.is_verified ? (
                                <div className="relative w-4 h-4">
                                    <VerifyBadge />
                                </div>
                            ) : null}

                            {data.is_premium ? (
                                <span
                                    className="premium-badge relative d-center p-0.5 w-5 h-5 bg-glass rounded-full"
                                    style={{
                                        "--shine-delay": randomDelay,
                                        "--shine-duration": randomDuration,
                                    }}
                                >

                                    <FontAwesomeIcon
                                        icon={faCrown}
                                        className="relative z-10 text-yellow-400 text-xs"
                                    />
                                </span>
                            ) : null}
                        </div>
                        <p className="text-xs font-normal text-gray-400">
                            {data.username}
                        </p>
                    </div>
                </span>
            </div>
        </div>
    );
}
