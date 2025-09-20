import {
    faCheckCircle,
    faEnvelope,
    faEye,
    faEyeSlash,
    faLock,
    faLockOpen,
    faPencil,
    faUserAlt,
    faWarning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import ErrorMessage from "@/Components/ui/ErrorMessage";
import { useForm } from "@inertiajs/react";
import debounce from "lodash.debounce";
import axios from "axios";
import { HoverBorderGradient } from "@/Components/ui/hover-border-gradient";

export default function SignUp({ onSwitch, onOtp }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        profile_pic: "",
    });

    const [usernameAvailable, setUsernameAvailable] = useState(null);
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [preview, setPreview] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    );
    const [confirmError, setConfirmError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        post("/register", {
            preserveScroll: true,
            onSuccess: () => {
                onSwitch('otp');
            }
        });
    }

    const handleConfirmError = (e) => {
        let value = e.target.value;

        setData("password_confirmation", e.target.value);

        if (data.password && value !== data.password) {
            setConfirmError("Passwords do not match");
        } else {
            setConfirmError("");
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("profile_pic", file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const checkUsernameAPI = useCallback(
        debounce(async (value) => {
            if (!value || value.trim() === "") {
                setUsernameAvailable(null);
                return;
            }
            const usernameToCheck = value;

            try {
                const res = await axios.get("/check-username", {
                    params: { username: usernameToCheck },
                });
                if (usernameToCheck !== data.username) return;

                setUsernameAvailable(res.data.available);
            } catch (err) {
                console.error("username check error:", err);
            }
        }, 450),
        [data.username]
    );

    useEffect(() => {
        checkUsernameAPI(data.username);
        return () => {
            checkUsernameAPI.cancel();
        };
    }, [data.username, checkUsernameAPI]);

    return (
        <div className="text-white d-center py-9 select-none">
            <div className="w-lg px-8 py-6 bg-black/5  backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
                <h2 className="text-center text-2xl font-bold mb-1">Sign Up</h2>
                <p className="text-sm text-gray-400 text-center mb-3">
                    No account? No worries, join us in seconds.
                </p>

                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="w-full flex flex-col items-center gap-4"
                >
                    {/* Full Name */}
                    <div className="profile-wrapper w-24 h-24 relative rounded-full bg-black/50 backdrop-blur-md shadow-md p-2 box-content border border-white/30">
                        <img
                            src={preview}
                            id="preview"
                            className="w-full h-full rounded-full object-cover"
                            alt="Profile"
                        />
                        <label
                            htmlFor="fileInput"
                            className="absolute bg-glass -bottom-1 right-3 w-8 h-8 d-center cursor-pointer text-sm  rounded-full  hover:bg-black/60 bg-black hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out"
                            title="Upload Pic"
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </label>
                    </div>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        name="image"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div className="w-full">
                        <label htmlFor="name" className="text-sm">
                            Full Name
                        </label>
                        <div className="inp-bx rounded-md h-11 mt-2 group ">
                            <FontAwesomeIcon
                                icon={faUserAlt}
                                className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/50 group-focus-within:text-white transition ease-in"
                            />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                autoComplete="off"
                                className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                            />
                        </div>
                        {errors.name && <ErrorMessage message={errors.name} />}
                    </div>
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
                                placeholder="Choose a unique username"
                                id="username"
                                value={data.username}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^[A-Za-z0-9_.-]*$/.test(value)) {
                                        setData("username", value);
                                        clearErrors("username");
                                    }
                                }}
                                autoComplete="off"
                                className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                            />
                        </div>
                        {errors.username && !usernameAvailable && (
                            <ErrorMessage message={errors.username} />
                        )}

                        {usernameAvailable === true && (
                            <span className="text-xs text-green-400">
                                <FontAwesomeIcon icon={faCheckCircle} />{" "}
                                Username is available
                            </span>
                        )}

                        {usernameAvailable === false && (
                            <span className="text-xs text-amber-500">
                                <FontAwesomeIcon icon={faWarning} /> Username
                                already taken
                            </span>
                        )}
                    </div>
                    {/* Email Address */}
                    <div className="w-full">
                        <label htmlFor="email" className="text-sm">
                            Email
                        </label>
                        <div className="inp-bx rounded-md h-11 mt-2 group">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/50 group-focus-within:text-white transition ease-in"
                            />
                            <input
                                type="text"
                                placeholder="Enter your email address"
                                id="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                autoComplete="off"
                                className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                            />
                        </div>
                        <span className="text-red-500 text-sm">
                            {errors.email && (
                                <ErrorMessage message={errors.email} />
                            )}
                        </span>
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
                        <label htmlFor="confirm_password" className="text-sm">
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
                            disabled={processing || usernameAvailable === false}
                        >
                            Create account
                        </button>
                    </div>
                    <div className="w-full text-center text-sm">
                        <span>
                            Already have an account?
                            <button
                                type="button"
                                onClick={() => onSwitch('login')}
                                className="text-blue-500 ml-1 cursor-pointer"
                            >
                                Log in
                            </button>
                        </span>
                    </div>
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
                    or
                </form>
                <HoverBorderGradient
                    onClick={() => (window.location.href = "/auth/google")}
                    className="flex items-center"
                    containerClassName="w-full cursor-pointer bg-white/10 rounded-lg mt-3"
                >
                    <img
                        src="https://img.icons8.com/color/512/google-logo.png"
                        alt="Google logo"
                        className="w-5 h-5 mr-2"
                    />
                    Sign up with Google
                </HoverBorderGradient>
            </div>
        </div>
    );
}
