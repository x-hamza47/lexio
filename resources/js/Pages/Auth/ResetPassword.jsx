import { useForm } from "@inertiajs/react";
import { ShootingStars } from "@/Components/ui/shooting-stars";
import { StarsBackground } from "@/Components/ui/stars-background";
import { GlobeDemo } from "@/Components/ui/GridGlobe";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faLock,
    faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import ErrorMessage from "@/Components/ui/ErrorMessage";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        email: email || "",
        token: token || "",
        password: "",
        password_confirmation: "",
    });
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [confirmError, setConfirmError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/reset-password");
    };

    const handleConfirmError = (e) => {
        let value = e.target.value;

        setData("password_confirmation", e.target.value);

        if (data.password && value !== data.password) {
            setConfirmError("Passwords do not match");
        } else {
            setConfirmError("");
        }
    };
    return (
        <div className="overflow-x-hidden d-center h-dvh">
            <div>
                <ShootingStars />
                <StarsBackground className="bg-[#030303] -z-40" />
            </div>
            <GlobeDemo />
            <div className="text-white d-center py-9 select-none">
                <div className="w-lg px-8 py-6 bg-black/5  backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col items-center gap-4"
                    >
                        <h2 className="text-center text-xl font-bold mb-3">
                            Reset Password
                        </h2>

                        <input type="hidden" value={data.email} />
                        <input type="hidden" value={data.token} />

                        {/* Password */}
                        <div className="w-full">
                            <label htmlFor="password" className="text-sm">
                                New Password
                            </label>
                            <div className="inp-bx rounded-md h-11 mt-2 group">
                                <FontAwesomeIcon
                                    icon={faLock}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/50 group-focus-within:text-white transition ease-in"
                                />
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    autoComplete="off"
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
                        {/* Password */}
                        <div className="w-full">
                            <label
                                htmlFor="confirm_password"
                                className="text-sm"
                            >
                                Confirm Password
                            </label>
                            <div className="inp-bx rounded-md h-11 mt-2 group">
                                <FontAwesomeIcon
                                    icon={faLockOpen}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/50 group-focus-within:text-white transition ease-in"
                                />
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    placeholder="Re-enter your password"
                                    id="confirm_password"
                                    value={data.password_confirmation}
                                    onChange={handleConfirmError}
                                    autoComplete="off"
                                    className="h-full px-9 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                                <FontAwesomeIcon
                                    icon={showConfirmPass ? faEyeSlash : faEye}
                                    className="absolute text-whtie/70 top-1/2 right-4 text-sm -translate-y-1/2 cursor-pointer"
                                    onClick={() =>
                                        setShowConfirmPass(!showConfirmPass)
                                    }
                                />
                            </div>
                            {confirmError && (
                                <ErrorMessage message={confirmError} />
                            )}
                        </div>

                        <div className="w-full mt-3">
                            <button
                                type="submit"
                                className="bg-glass w-full py-2 rounded-md hover:bg-black/70 bg-black hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out font-semibold cursor-pointer"
                                disabled={processing}
                            >
                                {processing ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
