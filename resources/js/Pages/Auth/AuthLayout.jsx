import { GlobeDemo } from "@/Components/ui/GridGlobe";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { motion } from "framer-motion";
import { ShootingStars } from "@/Components/ui/shooting-stars";
import { StarsBackground } from "@/Components/ui/stars-background";
import OTP from "./OTP";
import ForgotPassword from "./ForgotPassword";

export default function AuthLayout({ mode: initialMode = "login", email }) {
    const [mode, setMode] = useState(() => {
        return sessionStorage.getItem("authMode") || initialMode;
    });
    useEffect(() => {
        if (initialMode) {
            setMode(initialMode);
            sessionStorage.setItem("authMode", initialMode);
        }
    }, [initialMode]);

    const switchMode = (newMode) => {
        setMode(newMode);
        sessionStorage.setItem("authMode", newMode);
    };

    return (
        <div className="overflow-x-hidden">
            <div>
                <ShootingStars />
                <StarsBackground className="bg-[#030303] -z-40" />
            </div>
            <GlobeDemo />
            <AnimatePresence mode="wait">
                {mode === "login" && (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Login onSwitch={switchMode} />
                    </motion.div>
                )}
                {mode === "signup" && (
                    <motion.div
                        key="signup"
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <SignUp onSwitch={switchMode} />
                    </motion.div>
                )}
                {mode === "otp" && (
                    <motion.div
                        key="otp"
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <OTP onSwitch={switchMode} email={email}/>
                    </motion.div>
                )}
                {mode === "forgot_password" && (
                    <motion.div
                        key="forgot_password"
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ForgotPassword onSwitch={switchMode} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
