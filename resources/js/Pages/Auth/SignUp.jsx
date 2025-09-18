import {
    faEnvelope,
    faEye,
    faEyeSlash,
    faLock,
    faLockOpen,
    faPencil,
    faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import ErrorMessage from "@/Components/ui/ErrorMessage";
import { Link, useForm } from "@inertiajs/react";
import debounce from "lodash.debounce";

export default function SignUp() {
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [preview, setPreview] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    );

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

    // const checkUsernameExists = useCallback(
    //     debounce(asyn (value) =>  {
    //         if()
    //     })
    // )


    const { data, setData, post, processing, errors } = useForm({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        profile_pic: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/register");
    }

    return (
        <>
            <div className="text-white d-center py-9">
                <div className="w-lg px-8 py-6 bg-black/5  backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
                    <h2 className="text-center text-2xl font-bold mb-5">
                        Sign Up
                    </h2>
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
                                className="w-full h-full rounded-full"
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
                            <div
                                className={`inp-bx rounded-md h-11 mt-2 group outline outline-amber-50/0 outline-offset-4 ${
                                    errors.name ? "outline-red-500" : ""
                                }`}
                            >
                                <FontAwesomeIcon
                                    icon={faUserAlt}
                                    className="absolute top-1/2 left-2 -translate-y-1/2 text-sm text-white/50 group-focus-within:text-white transition ease-in"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter your fullname"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    autoComplete="off"
                                    className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                            </div>
                            {errors.name && (
                                <ErrorMessage message={errors.name} />
                            )}
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
                                    placeholder="Enter your username"
                                    id="username"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    autoComplete="off"
                                    className="h-full pl-9 pr-2 text-sm placeholder:text-white/50 w-full border-b border-b-white/50 outline-none rounded-md bg-white/5 hover:bg-white/20 focus:bg-black/40 transition ease-in"
                                />
                            </div>
                            {errors.username && (
                                <ErrorMessage message={errors.username} />
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
                                    placeholder="Enter your email"
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
                                    type={showConfirmPass ? "password" : "text"}
                                    placeholder="confirm password"
                                    id="confirm_password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
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
                        </div>

                        <div className="w-full mt-3">
                            <button
                                type="submit"
                                className="bg-glass w-full py-2 rounded-md hover:bg-black/20 bg-black hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out font-semibold"
                                disabled={processing}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

                        <div className="w-full text-center text-sm">
                            <span>
                                Already have an account? <Link href="/">Log in </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
