import { faEnvelope, faEye, faEyeSlash, faLock, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

    return (
        <>
            <div className="text-white d-center h-dvh">
                <div className="w-lg px-8 py-6 bg-glass rounded-md bg-white/5">
                    <form action="#" className="w-full flex flex-col gap-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="text-sm">
                                Full Name
                            </label>
                            <div className="inp-bx rounded-md h-11 mt-2 ">
                                <FontAwesomeIcon
                                    icon={faUserAlt}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/70"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter your fullname"
                                    id="name"
                                    autoComplete="off"
                                    className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                            </div>
                            {/* <span className="text-red-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current inline mr-1"><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM320 448C302.3 448 288 433.7 288 416C288 398.3 302.3 384 320 384C337.7 384 352 398.3 352 416C352 433.7 337.7 448 320 448zM320 192C338.2 192 352.7 207.5 351.4 225.7L344 329.7C343.1 342.3 332.6 352 320.1 352C307.5 352 297.1 342.3 296.2 329.7L288.8 225.7C287.3 207.5 301.8 192 320 192z"/></svg>
                            name field is required
                        </span> */}
                        </div>
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="text-sm">
                                Username
                            </label>
                            <div className="inp-bx rounded-md h-11 mt-2 ">
                                <FontAwesomeIcon
                                    icon={faUserAlt}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/70"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    id="username"
                                    autoComplete="off"
                                    className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                            </div>
                            {/* <span className="text-red-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current inline mr-1"><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM320 448C302.3 448 288 433.7 288 416C288 398.3 302.3 384 320 384C337.7 384 352 398.3 352 416C352 433.7 337.7 448 320 448zM320 192C338.2 192 352.7 207.5 351.4 225.7L344 329.7C343.1 342.3 332.6 352 320.1 352C307.5 352 297.1 342.3 296.2 329.7L288.8 225.7C287.3 207.5 301.8 192 320 192z"/></svg>
                            name field is required
                        </span> */}
                        </div>
                        {/* Email Address */}
                        <div>
                            <label htmlFor="email" className="text-sm">
                                Email
                            </label>
                            <div className="inp-bx rounded-md h-11 mt-2 ">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/70"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    id="email"
                                    autoComplete="off"
                                    className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                            </div>
                            <span className="text-red-500 text-sm">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current inline mr-1"><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM320 448C302.3 448 288 433.7 288 416C288 398.3 302.3 384 320 384C337.7 384 352 398.3 352 416C352 433.7 337.7 448 320 448zM320 192C338.2 192 352.7 207.5 351.4 225.7L344 329.7C343.1 342.3 332.6 352 320.1 352C307.5 352 297.1 342.3 296.2 329.7L288.8 225.7C287.3 207.5 301.8 192 320 192z"/></svg> */}
                                {/* name field is required */}
                            </span>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <div className="inp-bx rounded-md h-11 mt-2 ">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/70"
                                />
                                <input
                                    type={showPass ? "password" : "text"}
                                    placeholder="Enter your password"
                                    id="password"
                                    autoComplete="off"
                                    className="h-full px-9 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                                <FontAwesomeIcon
                                    icon={showPass ? faEye : faEyeSlash}
                                    className="absolute text-whtie/70 top-1/2 right-4 text-sm -translate-y-1/2 cursor-pointer"
                                    onClick={() => setShowPass(!showPass)}
                                />
                            </div>
                            {/* <span className="text-red-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current inline mr-1"><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM320 448C302.3 448 288 433.7 288 416C288 398.3 302.3 384 320 384C337.7 384 352 398.3 352 416C352 433.7 337.7 448 320 448zM320 192C338.2 192 352.7 207.5 351.4 225.7L344 329.7C343.1 342.3 332.6 352 320.1 352C307.5 352 297.1 342.3 296.2 329.7L288.8 225.7C287.3 207.5 301.8 192 320 192z"/></svg>
                            name field is required
                        </span> */}
                        </div>
                        {/* Password */}
                        <div>
                            <label
                                htmlFor="confirm_password"
                                className="text-sm"
                            >
                                Confirm Password
                            </label>
                            <div className="inp-bx rounded-md h-11 mt-2">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/70"
                                />
                                <input
                                    type={showConfirmPass ? "password" : "text"}
                                    placeholder="confirm password"
                                    id="confirm_password"
                                    autoComplete="off"
                                    className="h-full px-9 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                                <FontAwesomeIcon
                                    icon={showConfirmPass ? faEye : faEyeSlash}
                                    className="absolute text-whtie/70 top-1/2 right-4 text-sm -translate-y-1/2 cursor-pointer"
                                    onClick={() =>
                                        setShowConfirmPass(!showConfirmPass)
                                    }
                                />
                            </div>
                            {/* <span className="text-red-500 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current inline mr-1"><path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM320 112C205.1 112 112 205.1 112 320C112 434.9 205.1 528 320 528C434.9 528 528 434.9 528 320C528 205.1 434.9 112 320 112zM320 448C302.3 448 288 433.7 288 416C288 398.3 302.3 384 320 384C337.7 384 352 398.3 352 416C352 433.7 337.7 448 320 448zM320 192C338.2 192 352.7 207.5 351.4 225.7L344 329.7C343.1 342.3 332.6 352 320.1 352C307.5 352 297.1 342.3 296.2 329.7L288.8 225.7C287.3 207.5 301.8 192 320 192z"/></svg>
                            name field is required
                        </span> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
