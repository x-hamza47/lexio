import UserHeader from "@/Components/UserHeader";
import Chats from "@/Components/Chats";
import { users } from "@/Data/users";
import PendingRequests from "@/Components/PendingRequests";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
    const [tab, setTab] = useState(() => {
        return sessionStorage.getItem("usersTab") || "chats";
    });
    const [pendingRequests, setPendingRequests] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        sessionStorage.setItem("usersTab", tab);
        if (tab === "addFriends") {
            fetchUsersData();
        }
    }, [tab]);

    const fetchUsersData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/add-friends-data");
            setPendingRequests(res.data.pendingRequests);
            setSuggestedUsers(res.data.suggestedUsers);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };
    return (
        <div className="max-h-[88dvh] flex flex-col">
            <UserHeader
                activeTab={tab}
                onTabChange={setTab}
                onFetch={() => fetchUsersData()}
            />
            <div className="users-list overflow-y-auto flex-1 mt-2">
                {tab === "chats" &&
                    users.map((user, i) => <Chats key={i} data={user} />)}
                {tab === "addFriends" && (
                    <>
                        {pendingRequests.length > 0 ||
                        suggestedUsers.length > 0 ? (
                            <>
                                {pendingRequests.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="text-white font-semibold px-2">
                                            Friend Requests
                                        </h3>
                                        {pendingRequests.map((req) => (
                                            <PendingRequests
                                                key={req.id}
                                                data={req.sender}
                                                type="pending"
                                                requestId={req.id}
                                            />
                                        ))}
                                    </div>
                                )}
                                {suggestedUsers.length > 0 && (
                                    <div>
                                        <h3 className="text-white font-semibold px-2">
                                            Suggested Friends
                                        </h3>
                                        {suggestedUsers.map((user) => (
                                            <PendingRequests
                                                key={user.id}
                                                data={user}
                                                type="suggested"
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="text-white p-2">Loading users...</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
