import { GlobeDemo } from "@/Components/ui/GridGlobe";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { motion } from "framer-motion";

export default function AuthLayout() {
    const [mode, setMode] = useState("login");
    const toggleMode = () => {
        setMode(mode === "login" ? "signup" : "login");
    };

    return (
        <div className="overflow-x-hidden">
            <GlobeDemo />
            <AnimatePresence mode="wait">
                {mode === "login" ? (
                    <motion.div
                        key="login"
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Login onSwitch={toggleMode} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="signup"
                        initial={{ opacity: 0, scale: 0.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 0.4 }}
                    >
                        <SignUp onSwitch={toggleMode} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
