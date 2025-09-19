import {
    faEye,
    faEyeSlash,
    faLock,
    faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useForm } from "@inertiajs/react";
import ErrorMessage from "@/Components/ui/ErrorMessage";
import { useState } from "react";

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        username: "",
        password: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/login");
    }

    return (
        <>
            <div className="text-white d-center py-9 h-dvh">
                <div className="w-lg px-8 py-6 bg-black/5  backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
                    <h2 className="text-center text-2xl font-bold mb-5">
                        Login 
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
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
                            <label htmlFor="password" className="text-sm">
                                Password
                            </label>
                            <div className="inp-bx rounded-md h-11 mt-2 group">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/50 group-focus-within:text-white transition ease-in"
                                />
                                <input
                                    type={showPass ? "password" : "text"}
                                    placeholder="Enter your password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoComplete="off"
                                    className="h-full px-9 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                                <FontAwesomeIcon
                                    icon={showPass ? faEye : faEyeSlash}
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
                                className="bg-glass w-full py-2 rounded-md hover:bg-black/20 bg-black hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out font-semibold"
                                disabled={processing}
                            >
                                LogIn
                            </button>
                        </div>

                        <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

                        <div className="w-full text-center text-sm">
                            <span>
                                Don'nt have an account?
                                <Link href="/register-page" className="text-blue-500"> Create one</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
