import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown from "./ui/Dropdown";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { usePage } from "@inertiajs/react";

export default function UserHeader({activeTab, onFetch, onTabChange}) {
    const [search, setSearch] = useState("");
    const {auth} = usePage().props;

    return (
        <div className="flex items-center justify-center ">
            <div className="wrapper w-full">
                <section className="users px-1 ">
                    <header className="flex items-center justify-between">
                        <div className="content flex items-center gap-2">
                            <img
                                src={
                                    auth.user.profile_pic ??
                                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                                }
                                alt="Profile Pic"
                                className="w-[50px] h-[50px] rounded-full ring-2 ring-offset-2 ring-gray-500 ring-offset-white"
                            />
                            <div className="details">
                                <span className="text-white">
                                    {auth.user.name}
                                </span>
                                <p></p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className={`d-center w-8 h-8 rounded-full text-white bg-glass hover:bg-white/20 transition duration-200 ease-in-out ${
                                    activeTab === "addFriends"
                                        ? "ring-2 ring-white"
                                        : ""
                                }`}
                                onClick={() => {
                                    onFetch();
                                    onTabChange("addFriends");
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faUserPlus}
                                    className="text-sm p-2 rounded-full"
                                />
                            </button>
                            <Dropdown />
                        </div>
                    </header>

                    <div className="inp-bx text-white w-full mt-5 rounded-md">
                        <input
                            type="text"
                            value={search}
                            placeholder="Search or start a new chat"
                            className="px-8 py-1.5 text-sm placeholder:text-white/50 w-full border-b border-b-white/50  outline-none rounded-md bg-white/10 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                            autoFocus
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-xs"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
