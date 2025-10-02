import UserHeader from "@/Components/UserHeader";
import Chats from "@/Components/Chats";
import { users } from "@/Data/users";
import PendingRequests from "@/Components/PendingRequests";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SuggestedUser from "@/Components/SuggestedUser";
import Loader from "@/Components/ui/Loader";
import { LoadingMessages } from "@/Data/LoadingMessages";
import { AnimatePresence, motion } from "framer-motion";
import { usePage } from "@inertiajs/react";

export default function Users({ activeTab, onTabChange, setPendingCount }) {
    const { auth } = usePage().props;
    const [loadingMessage, setLoadingMessage] = useState("");
    const [loadingMore, setLoadingMore] = useState(true);
    const [loadedOnce, setLoadedOnce] = useState(false);
    const loaderRef = useRef(null);

    const [pendingRequests, setPendingRequests] = useState([]);

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);

    // ! Web Socket for Pending Requests
    useEffect(() => {
        if (!auth?.user?.id || !window.Echo) {
            console.warn("WebSocket not initialized or user not authenticated");
            return;
        }

        const channelName = `friend-requests.${auth.user.id}`;
        const channel = window.Echo.private(channelName);

        channel.listen(".FriendRequestSent", (e) => {
            if (e.sender && e.sender.req) {
                setPendingRequests((prev) => {
                    if (prev.some((req) => req.id === e.sender.req)) {
                        console.log(
                            "Duplicate request ignored for sender:",
                            e.sender.id
                        );
                        return prev;
                    }
                    return [{ id: e.sender.req, sender: e.sender }, ...prev];
                });

                setSuggestedUsers((prev) => {
                    return prev.filter((user) => user.id !== e.sender.id);
                });

            } else {
                console.error("Invalid friend request payload:", e);
            }
        });

        channel.error((err) => {
            console.error("WebSocket error on channel", channelName, err);
        });

        // channel.subscribed(() => {
        //     console.log("Successfully subscribed to", channelName);
        // });

        return () => {
            // console.log("Cleaning up WebSocket listener for", channelName);
            window.Echo.leave(channelName);
        };
    }, [auth?.user?.id]);

    // ! Initial Fetch when ActiveTab is Add Friends
    useEffect(() => {
        if (activeTab === "addFriends" && !loadedOnce) {
            setLoadedOnce(true);
            fetchPendingRequests();
            fetchSuggestedUsers();
        }
    }, [activeTab, loadedOnce]);

    // hack: Infinite Scroll for Suggested Users
    useEffect(() => {
        if (!loaderRef.current || !nextCursor) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && nextCursor && !loadingMore) {
                    fetchSuggestedUsers(nextCursor);
                }
            },
            { threshold: 1 }
        );

        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [nextCursor, loadingMore]);


    // ! Fetch Pending Request API
    const fetchPendingRequests = async () => {
        try {
            const res = await axios.get('/pending-requests');

            if (res.data.pendingRequests) {
                setPendingRequests((prev) => {
                    const prevIds = new Set(prev.map((r) => r.id.toString()));
                    const newRequests = res.data.pendingRequests.filter((req) => !prevIds.has(req.id.toString()));

                    return [...newRequests, ...prev];
                });
            }
        } catch (err) {
            console.error("Failed to load pending requests", err);
        }
    }
    // ! Fetch Suggested Users API
    const fetchSuggestedUsers = async (cursor = null) => {
        try {
            setLoadingMore(true);
            let url = "/suggested-users";
            if (cursor) {
                url += `?cursor=${cursor}`;
            }
            const res = await axios.get(url);

            if (res.data.suggestedUsers) {
                setSuggestedUsers((prev) => {
                    const all = [
                        ...prev,
                        ...res.data.suggestedUsers.data,
                    ];
                    return Array.from(new Map(all.map(u => [u.id, u])).values());
                });
                setNextCursor(res.data.suggestedUsers.next_cursor);

                if (!res.data.suggestedUsers.nextCursor) {
                    const randomIndex = Math.floor(
                        Math.random() * LoadingMessages.length
                    );
                    setLoadingMessage(LoadingMessages[randomIndex]);
                }
            }
        } catch (err) {
            console.error("Failed to load suggested users", err);
        } finally {
            setLoadingMore(false);
        }
    }

    useEffect(() => {
        if (setPendingCount) {
            setPendingCount(pendingRequests.length);
        }
    },[pendingRequests, setPendingCount]);
    return (
        <div className="max-h-[88dvh] flex flex-col ">
            <UserHeader
                activeTab={activeTab}
                onTabChange={onTabChange}
            // onFetch={() => fetchUsersData()}
            />
            <div className="users-list overflow-y-auto flex-1 mt-2 ">
                {activeTab === "chats" &&
                    users.map((user, i) => <Chats key={i} data={user} />)}
                {activeTab === "addFriends" && (
                    <>
                        <div className="my-4 ">
                            <h3 className="text-white font-semibold font-sans px-2 ">
                                Friend Requests
                            </h3>
                            <AnimatePresence mode="wait">
                                {pendingRequests.length > 0 ? (
                                    pendingRequests.map((req) => (
                                        <motion.div
                                            key={req.id}
                                            initial={{ opacity: 0, scale: 0.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.1 }}
                                            transition={{
                                                scale: {
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 10,
                                                    mass: 0.2,
                                                    bounce: 0.2,
                                                },
                                                opacity: {
                                                    duration: 0.3,
                                                    ease: "easeInOut",
                                                },
                                            }}
                                        >
                                            <PendingRequests
                                                data={req.sender}
                                                type="pending"
                                                requestId={req.id}
                                                onHandleRequest={id =>
                                                    setPendingRequests(prev => prev.filter(r => r.id !== id))
                                                }
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                        className="mt-3"
                                    >
                                        <div className="text-gray-500 text-xs text-center px-2">
                                            No requests found.
                                        </div>
                                        <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700 mt-4" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold font-sans px-2 mb-2">
                                Suggested Friends
                            </h3>
                            <AnimatePresence>
                                {suggestedUsers.length > 0 &&
                                    suggestedUsers.map((user) => (
                                        <motion.div
                                            key={user.id}
                                            initial={{ opacity: 0, scale: 0.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.1 }}
                                            transition={{
                                                scale: {
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 10,
                                                    mass: 0.2,
                                                    bounce: 0.2,
                                                },
                                                opacity: {
                                                    duration: 0.3,
                                                    ease: "easeInOut",
                                                },
                                            }}
                                        >
                                            <SuggestedUser
                                                data={user}
                                                type="suggested"
                                                onRequestSent={(id) => {
                                                    setSuggestedUsers((prev) => prev.filter((u) => u.id !== id));
                                                }}
                                            />
                                        </motion.div>
                                    ))}
                            </AnimatePresence>
                            <div
                                ref={loaderRef}
                                className="h-8 flex items-center justify-center text-gray-400 text-xs my-2"
                            >
                                {loadingMore ? (
                                    <Loader size={25} />
                                ) : nextCursor ? (
                                    "Scroll to load more"
                                ) : (
                                    loadingMessage
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
