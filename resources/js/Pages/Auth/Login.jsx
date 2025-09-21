import {
    faEye,
    faEyeSlash,
    faLock,
    faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "@inertiajs/react";
import ErrorMessage from "@/Components/ui/ErrorMessage";
import { useState } from "react";
import { HoverBorderGradient } from "@/Components/ui/hover-border-gradient";

export default function Login({ onSwitch }) {
    const [showPass, setShowPass] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/login");
    }

    // function handleForgotPassword(){

    // }

    return (
        <div className="text-white d-center py-9 h-dvh select-none">
            <div className="w-lg px-8 py-6 bg-black/5  backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
                <h2 className="text-center text-2xl font-bold mb-1">Login</h2>
                <p className="text-sm text-gray-400 text-center mb-3">
                    Log in, stay connected.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-center gap-4"
                >
                    {/* Username */}
                    <div className="w-full">
                        <label htmlFor="username" className="text-sm">
                            Username
                        </label>
                        <div className="inp-bx rounded-md h-11 mt-2 group">
                            <FontAwesomeIcon
                                icon={faUserAlt}
                                className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/50 group-focus-within:text-white transition ease-in"
                            />
                            <input
                                type="text"
                                placeholder="Enter your username"
                                id="username"
                                value={data.username}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[A-Za-z0-9_.-]*$/.test(value)) {
                                        setData("username", value);
                                    }
                                }}
                                tabIndex={1}
                                autoComplete="off"
                                className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                            />
                        </div>
                        {errors.username && (
                            <ErrorMessage message={errors.username} />
                        )}
                    </div>

                    {/* Password */}
                    <div className="w-full">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <button
                                type="button"
                                className="text-xs text-blue-500 hover:underline cursor-pointer"
                                onClick={() => onSwitch('forgot_password')}
                            >
                                Forgot password?
                            </button>
                        </div>
                        <div className="inp-bx rounded-md h-11 mt-2 group">
                            <FontAwesomeIcon
                                icon={faLock}
                                className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/50 group-focus-within:text-white transition ease-in"
                            />
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Enter your password"
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                autoComplete="off"
                                tabIndex={2}
                                className="h-full px-9 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                            />
                            <FontAwesomeIcon
                                icon={showPass ? faEyeSlash : faEye}
                                className="absolute text-whtie/70 top-1/2 right-4 text-sm -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPass(!showPass)}
                            />
                        </div>
                        {errors.password && (
                            <ErrorMessage message={errors.password} />
                        )}
                    </div>

                    <div className="w-full mt-3">
                        <button
                            type="submit"
                            className="bg-glass w-full py-2 rounded-md hover:bg-black/70 bg-black hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out font-semibold cursor-pointer"
                            disabled={processing}
                        >
                            LogIn
                        </button>
                    </div>

                    <div className="w-full text-center text-sm">
                        <span>
                            Don't have an account?
                            <button
                                type="button"
                                onClick={() => onSwitch('signup')}
                                className="text-blue-500 ml-1 cursor-pointer"
                            >
                                {" "}
                                Create one
                            </button>
                        </span>
                    </div>
                    <div className="mb-3 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                </form>
                <HoverBorderGradient
                    onClick={() => (window.location.href = "/auth/google")}
                    className="flex items-center "
                    containerClassName="w-full cursor-pointer bg-white/10 rounded-lg mt-4"
                >
                    <img
                        src="https://img.icons8.com/color/512/google-logo.png"
                        alt="Google logo"
                        className="w-5 h-5 mr-2"
                    />
                    Continue with Google
                </HoverBorderGradient>
            </div>
        </div>
    );
}
