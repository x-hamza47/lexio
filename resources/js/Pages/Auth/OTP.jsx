import { useRef, useState } from "react";

export default function OTP() {
    const length = 6;
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inpRef = useRef([]);

    const handleChange = (value, index) => {
        if (/[^0-9]/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < length - 1) {
            inpRef.current[index + 1].focus();
        }

        if (newOtp.join("").length === length) {
            console.log("OTP entered", newOtp.join(""));
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
                <button
                    type="submit"
                    className="bg-glass w-full py-2 rounded-md hover:bg-black/70 bg-black hover:shadow-xl active:scale-90 active:shadow-inner transition duration-200 ease-in-out font-semibold cursor-pointer"
                >
                    Verify Code
                </button>
                <p className="mt-4 text-gray-400 text-sm text-center">
                    Didn’t get the code?{" "}
                    <button className="text-blue-400 underline cursor-pointer">
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
