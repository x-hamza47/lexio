import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import VerifyBadge from "@/Components/ui/VerifyBadge";
import { faCrown, faSearch, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRef } from "react";
import useClickOutside from "./hook/useClickOutside";


export default function FriendList({ friends }) {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const friendListWrapper = useRef(null);

    useClickOutside(friendListWrapper, () => setOpen(false));

    return (
        <div className="relative" ref={friendListWrapper}>
            <button
                className="d-center w-8 h-8 rounded-full text-white bg-glass hover:bg-white/20 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="text-md p-2 rounded-full"
                />
            </button>

            <AnimatePresence >
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            opacity: { duration: 0.3, ease: "easeInOut" },
                        }}
                        className="w-96 px-3 bg-glass bg-black/95  rounded-2xl absolute top-0 left-10 z-50 origin-top shadow-lg overflow-hidden"

                    >
                        <div className="relative flex flex-col max-h-[550px] h-[550px]  justify-between sharp-border py-3 pl-2 pr-4 mt-1 cursor-pointer" >
                            <section>
                                <h4 className="text-gray-400 font-bold font-sans text-2xl">New Chat</h4>
                                <div className="inp-bx text-white w-full mt-5 rounded-md ">
                                    <input
                                        type="text"
                                        value={search}
                                        placeholder="Search name or username"
                                        className="px-8 py-2 text-xs placeholder:text-white/50 w-full border-b border-b-white/50  outline-none rounded-md bg-white/10 hover:bg-white/20 focus:bg-white/5 transition ease-in"
                                        autoFocus={open}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faSearch}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-xs"
                                    />
                                </div>
                            </section>
                            <section className="h-full overflow-y-auto users-list my-2">
                                <span className="px-3 py-3 my-2 hover:text-white transition ease-in sharp-border cursor-pointer flex items-center gap-6 w-full text-white/70 chat-card ">
                                    <FontAwesomeIcon icon={faUsers} className="bg-gray-500/40 rounded-full px-2 py-2.5" />
                                    New Group
                                </span>
                                <small className="text-gray-400 ml-2">All Friends</small>
                                {friends.length > 0 ? (
                                    friends.filter(f =>
                                        f.name.toLowerCase().includes(search.toLowerCase()) ||
                                        f.username.toLowerCase().includes(search.toLowerCase())
                                    )
                                        .map(friend => (
                                            <ChatCard key={friend.id} data={friend} />
                                        ))
                                ) : (
                                    <div className="text-gray-500 text-xs text-center px-2 mt-4">
                                        No friends found
                                        <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700 mt-4" />
                                    </div>
                                )}
                            </section>


                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

    )
}

function ChatCard({ data }) {
    const randomDelay = `${Math.random() * 5}s`;
    const randomDuration = `${1.5 + Math.random() * 2}s`;
    return (

        <div className="chat-card relative flex items-center justify-between sharp-border py-3 pl-2 pr-4 mt-1 cursor-pointer "

        >
            <span className="flex gap-4 select-none">
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
                        <span className="text-white text-sm font-medium tracking-wider line-clamp-1">
                            {data.name.length > 15 ? data.name.slice(0, 15) + "..." : data.name}
                            {/* Hamza aamir */}
                        </span>
                        {data.is_verified && (
                            <div className="relative w-4 h-4">
                                <VerifyBadge />
                            </div>
                        )}
                        {data.is_premium && (
                            <span
                                className="premium-badge relative d-center w-4 h-4 bg-glass rounded-full"
                                style={{
                                    "--shine-delay": randomDelay,
                                    "--shine-duration": randomDuration,
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faCrown}
                                    className="relative z-10 text-[8px] text-amber-400"
                                />
                            </span>
                        )}
                        <div className="bg-glass text-gray-200 px-1 py-[1px] rounded-xl inline-flex items-center gap-1">
                            <span className="text-[10px] text-nowrap">🔥 7.6k</span>
                        </div>
                    </div>
                    <p className="text-xs font-normal text-gray-400">
                        Hey there, I'm using chit chat.
                    </p>

                </div>
            </span>

        </div>
    );
}
