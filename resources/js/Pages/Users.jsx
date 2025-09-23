import UserHeader from "@/Components/UserHeader";
import Chats from "@/Components/Chats";
import { users } from "@/Data/users";
import PendingRequests from "@/Components/PendingRequests";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Users({ activeTab, onTabChange }) {

    const [pendingRequests, setPendingRequests] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);


    useEffect(() => {
        if (activeTab === "addFriends") {
            fetchUsersData();
        }
    }, [activeTab]);

    const fetchUsersData = async () => {
        try {
            const res = await axios.get("/add-friends-data");
            setPendingRequests(res.data.pendingRequests);
            setSuggestedUsers(res.data.suggestedUsers);
        } catch (err) {
            console.error(err);
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
                                    <PendingRequests
                                        key={user.id}
                                        data={user}
                                        type="suggested"
                                    />
                                ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
