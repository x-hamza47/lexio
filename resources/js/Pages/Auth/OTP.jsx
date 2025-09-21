import axios from "axios";
import { useRef, useState, useEffect } from "react";

export default function OTP({ onSwitch }) {
    const length = 6;
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const [errors, setErrors] = useState({});
    const inpRef = useRef([]);
    const [counter, setCounter] = useState(0); 
    const [resendDisabled, setResendDisabled] = useState(false);

    const handleChange = (value, index) => {
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < length - 1) {
            inpRef.current[index + 1].focus();
        }

        if (newOtp.join("").length === length) {
            verifyOtp(newOtp.join(""));
        }
    };

    const handleKeyDown = (e, i) => {
        if (
            (e.key === "Backspace" || e.key === "ArrowLeft") &&
            !otp[i] &&
            i > 0
        ) {
            inpRef.current[i - 1].focus();
        }
        if (e.key === "ArrowRight" && !otp[i] && i < otp.length - 1) {
            inpRef.current[i + 1].focus();
        }
    };
    const verifyOtp = async (otpCode) => {
        try {
            const res = await axios.post("/verify-otp", { otp_code: otpCode });
            if (res.data.success) {
                console.log("OTP Verified");
                setErrors({ otp_success: res.data.message });
                setTimeout(() => {
                    onSwitch("login");
                }, 1500);
            } else {
                setErrors({ otp_code: res.data.message });
            }
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ otp_code: "Verification failed" });
            }
        }
    };

    const handleResend = async () => {
        if (resendDisabled) return;

        setResendDisabled(true);
        setCounter(120); 

        try {
            const res = await axios.post("/resend-otp");
            if (res.data.success) {
                console.log("OTP resent successfully");
            }
        } catch (err) {
            console.error("Resend OTP failed:", err);
        }
    };

    useEffect(() => {
        if (counter <= 0) {
            setResendDisabled(false);
            return;
        }
        const timer = setInterval(() => {
            setCounter((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [counter]);

    return (
        <div className="text-white d-center py-9 h-dvh select-none">
            <div className="w-lg px-8 py-6 bg-black/5  backdrop-blur-md border border-white/20 shadow-lg rounded-2xl">
                <h2 className="text-center text-2xl font-bold mb-1">
                    Enter OTP
                </h2>
                <div className="flex gap-2 justify-center my-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inpRef.current[index] = el)}
                            placeholder="-"
                            className="w-12 h-12 text-center text-xl border border-white/40 rounded-lg bg-black/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                {errors.otp_code && (
                    <p className="text-red-400 text-sm text-center mb-2">
                        {errors.otp_code}
                    </p>
                )}
                {errors.otp_success && (
                    <p className="text-green-400 text-sm text-center mb-2">
                        {errors.otp_success} Awesome! Your account is verified.
                        Go ahead and log in.
                    </p>
                )}
                {/* <button
                    type="button"
                    // onClick={() => verifyOtp()}
                    disabled={loading}
                    className="bg-glass w-full py-2 rounded-md hover:bg-black/70 bg-black hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out font-semibold cursor-pointer"
                >
                    Verify Code
                </button> */}
                <p className="mt-4 text-gray-400 text-sm text-center">
                    Didn’t get the code?{" "}
                    <button
                        className={`text-blue-400 underline cursor-pointer ${
                            resendDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        {resendDisabled ? `Resend in ${counter}s` : "Resend"}
                    </button>
                </p>
            </div>
        </div>
    );
}
