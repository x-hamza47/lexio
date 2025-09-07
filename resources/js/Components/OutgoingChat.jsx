import UseHoldHover from "./hook/UseHoldHover";
import ActionDropDwn from "./ui/ActionDropDwn";

export default function OutgoingChat() {
    const { isHovered, onMouseEnter, onMouseLeave } = UseHoldHover(300);

    return (
        <div className="outgoing flex gap-7 w-full items-center flex-row-reverse group">
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="details px-2 py-1 bg-black/10 backdrop-blur-md shadow-md  max-w-3/4 rounded-lg inline"
            >
                <p className="text-white break-words text-sm inline">
                    Hello there! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Tempora evenie
                    Hello there! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Tempora evenie
                </p>
                <div className="meta inline-block float-end ml-5">
                    <span className="inline-flex gap-1 ">
                        <span className="inline-block">
                            <span className="time text-gray-500 text-[10px] select-none align-bottom">
                                02:25 PM
                            </span>
                        </span>
                        <span className="self-center">
                            <svg
                                width="15"
                                height="15"
                                viewBox="3 0 25 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 12L8 16L20 4"
                                    stroke="#4fa6f7ff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11 12L15 16L27 4"
                                    stroke="#4fa6f7ff"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                    </span>
                </div>
            </div>
            <ActionDropDwn show={isHovered} className={"flex-row-reverse"}/>
        </div>
    );
}
