import UserHeader from "@/Components/UserHeader";
import Chats from "@/Components/Chats";
import { users }  from "@/Data/users";

export default function Users() {
    return (
        <div className="max-h-[85dvh] flex flex-col">
            <UserHeader />
            <div className="users-list overflow-y-auto flex-1 mt-2">

            {users.map((user, i) => (
                <Chats key={i} data={user}/>
            ))}
            </div>
        </div>
    );
}
