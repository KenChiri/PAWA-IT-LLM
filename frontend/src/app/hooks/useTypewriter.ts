import { useState, useEffect } from "react";

export const useTypewriter = (text: string, speed: number = 150) => {
    const [displayedText, setDisplayedText] = useState("");
    
    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
        if (index < text.length) {
            setDisplayedText((prev) => prev + text[index]);
            index++;
        } else {
            clearInterval(typingInterval);
        }
        }, speed);
    
        return () => clearInterval(typingInterval);
    }, [text, speed]);
    
    return displayedText;
}