import { useEffect } from "react";

export default function useClickOutside(ref, handler) {
    
        useEffect(() => {
            function handleClick(e) {
                if (ref.current && !ref.current.contains(e.target)) {
                    handler(); 
                }
            }
            document.addEventListener("mousedown", handleClick);
            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
        }, [ref, handler]);
    
}
