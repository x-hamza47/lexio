import { useEffect, useRef, useState } from "react"

export default function UseHoldHover(delay = 700) {

    const [isHovered, setIsHovered] = useState(false);
    const timer = useRef();

    const onMouseEnter = () => {
        timer.current = setTimeout(() => setIsHovered(true), delay);
    }
    const onMouseLeave = () => {
        clearTimeout(timer.current);
        setIsHovered(false);
    }

    useEffect(() => {
        return () => clearTimeout(timer.current);
    }, []);
    
  return { isHovered, onMouseEnter, onMouseLeave};
}
