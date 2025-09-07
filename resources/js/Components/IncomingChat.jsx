import UseHoldHover from "./hook/UseHoldHover";
import ActionDropDwn from "./ui/ActionDropDwn";

export default function IncomingChat({ msg, index }) {

    const {isHovered, onMouseEnter, onMouseLeave} = UseHoldHover(300);

    return (
        <div
            className={` incoming flex mr-auto items-center gap-4 w-full group ${
                msg.reaction && "mb-3.5"
            }`}
            key={index}
        >
            <div
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className="details relative px-2 py-1 max-w-4/6 bg-white/10 backdrop-blur-md rounded-lg break-word inline"
            >
                <p className="text-white break-words text-sm inline self-center">
                    {msg.message}
                </p>
                <div className="meta inline-block ml-5 float-end">
                    <span className="time text-gray-400 text-[10px] select-none align-bottom">
                        02:25 PM
                    </span>
                </div>
                {msg.reaction && (
                    <span className="text-sm absolute -bottom-4 left-2 mt-1 rounded-full bg-glass border-gray-900 p-0.5 select-none">
                        {msg.reaction}
                    </span>
                )}
            </div>
            <ActionDropDwn show={isHovered} />
        </div>
    );
}
