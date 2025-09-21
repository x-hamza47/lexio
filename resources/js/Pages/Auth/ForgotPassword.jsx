import { faArrowLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessage from "@/Components/ui/ErrorMessage";
import { useForm, usePage } from "@inertiajs/react";

export default function ForgotPassword({ onSwitch }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const flash = usePage().props.flash || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/forgot-password");
    };

    return (
        <div className="text-white d-center py-9 h-dvh select-none">
            <div className="w-lg px-8 py-6 bg-black/5  backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
                <button
                    className="absolute bg-white/5 border border-white/10 shadow-md text-gray-500 hover:text-white/80 w-10 h-10 d-center rounded-full  hover:bg-white/10 hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out cursor-pointer"
                    onClick={() => onSwitch("login")}
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <h2 className="text-center text-2xl font-bold mb-1">
                    Forgot Password
                </h2>
                <p className="text-sm text-gray-400 text-center mb-3">
                    Password Recovery
                </p>

                {flash.success && (
                    <p className="text-green-500 text-sm text-center mb-3">
                        {flash.success}
                    </p>
                )}
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
                            onChange={(e) => setData("email", e.target.value)}
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

                <div className="w-full mt-3">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-glass w-full py-2 rounded-md hover:bg-black/70 bg-black hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out font-semibold cursor-pointer"
                        disabled={processing}
                    >
                        {processing ? "Sending..." : "Recover"}
                    </button>
                </div>
            </div>
        </div>
    );
}
