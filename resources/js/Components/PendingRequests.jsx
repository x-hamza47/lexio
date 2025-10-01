import VerifyBadge from "@/Components/ui/VerifyBadge";
import { faCrown, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PendingRequests({ data, type, requestId }) {
    const randomDelay = `${Math.random() * 5}s`;
    const randomDuration = `${1.5 + Math.random() * 2}s`;

    return (

        <div className="select-none">
            <div className="chat-card relative flex items-center justify-between sharp-border py-3 pl-2 pr-4 mt-1 cursor-pointer ">
                <span className="flex gap-4 select-none">
                    <img
                        src={
                            data.profile_pic && data.profile_pic.trim() !== ""
                                ? data.profile_pic
                                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                        }
                        alt="profile-pic"
                        className="w-9 h-9 rounded-full outline-[2px] outline-green-700 outline-offset-4"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
                        }}
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
                <div className="flex gap-2">
                    <Button color="green-500">Accept</Button>
                    <Button icon={faX} color="red-400"/>
                </div>
            </div>
        </div>
    );
}

function Button({ className, icon, children, color = "white" }) {
    const isIconOnly = icon && !children;

    return (
        <button
            className={`
                text-sm text-${color} bg-glass font-sans font-semibold
                transition duration-200 ease-in-out cursor-pointer
                hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner rounded-full
                ${isIconOnly
                    ? "w-8 h-8 flex items-center justify-center " 
                    : "px-3 py-1 " 
                }
                ${className}
            `}
        >
            {icon && <FontAwesomeIcon icon={icon} />}
            {children}
        </button>
    );
}
