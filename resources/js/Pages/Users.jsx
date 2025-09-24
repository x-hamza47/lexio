import UserHeader from "@/Components/UserHeader";
import Chats from "@/Components/Chats";
import { users } from "@/Data/users";
import PendingRequests from "@/Components/PendingRequests";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SuggestedUser from "@/Components/SuggestedUser";
import Loader from "@/Components/ui/Loader";
import  {LoadingMessages } from "@/Data/LoadingMessages"

export default function Users({ activeTab, onTabChange }) {
    const [loadingMessage, setLoadingMessage] = useState("");
    const [pendingRequests, setPendingRequests] = useState([]);

    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [loadingMore, setLoadingMore] = useState(true);
    const [loadedOnce, setLoadedOnce] = useState(false);

    const loaderRef = useRef(null);

    useEffect(() => {
        if (!loaderRef.current || !nextCursor) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting && nextCursor && !loadingMore) {
                    fetchUsersData(nextCursor);
                }
            },
            { threshold: 1 }
        );

        observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [nextCursor, loadingMore]);


    useEffect(() => {
        if (activeTab === "addFriends" && !loadedOnce) {
            setLoadedOnce(true);
            fetchUsersData();
        }
    }, [activeTab, loadedOnce]);

    const fetchUsersData = async (cursor = null) => {
        try {
            setLoadingMore(true);
            let url = "/add-friends-data";
            if (cursor) {
                url += `?cursor=${cursor}`;
            }
            const res = await axios.get(url);

            if (res.data.pendingRequests) {
                setPendingRequests(res.data.pendingRequests);
            }

            if (res.data.suggestedUsers) {
                setSuggestedUsers((prev) => [
                    ...prev,
                    ...res.data.suggestedUsers.data,
                ]);
                setNextCursor(res.data.suggestedUsers.next_cursor);

                if (!res.data.suggestedUsers.next_cursor) {
                    const randomIndex = Math.floor(
                        Math.random() * LoadingMessages.length
                    );
                    setLoadingMessage(LoadingMessages[randomIndex]);
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingMore(false);
        }
    };
    return (
        <div className="max-h-[88dvh] flex flex-col">
            <UserHeader
                activeTab={activeTab}
                onTabChange={onTabChange}
                onFetch={() => fetchUsersData()}
            />
            <div className="users-list overflow-y-auto flex-1 mt-2">
                {activeTab === "chats" &&
                    users.map((user, i) => <Chats key={i} data={user} />)}
                {activeTab === "addFriends" && (
                    <>
                        <div className="my-4">
                            <h3 className="text-white font-semibold font-sans px-2 ">
                                Friend Requests
                            </h3>
                            {pendingRequests.length > 0 ? (
                                pendingRequests.map((req) => (
                                    <PendingRequests
                                        key={req.id}
                                        data={req.sender}
                                        type="pending"
                                        requestId={req.id}
                                    />
                                ))
                            ) : (
                                <div className="text-gray-500 text-xs text-center px-2">
                                    No requests found.
                                </div>
                            )}
                        </div>
                        <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                        <div>
                            <h3 className="text-white font-semibold font-sans px-2 mb-2">
                                Suggested Friends
                            </h3>
                            {suggestedUsers.length > 0 &&
                                suggestedUsers.map((user) => (
                                    <SuggestedUser
                                        key={user.id}
                                        data={user}
                                        type="suggested"
                                    />
                                ))}
                            <div
                                ref={loaderRef}
                                className="h-8 flex items-center justify-center text-gray-400 text-xs my-2"
                            >
                                {loadingMore ? (
                                    <Loader size={6}  />
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
