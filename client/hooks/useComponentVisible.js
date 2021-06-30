import { useRef, useState, useEffect } from "react"

function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(
        initialIsVisible
    )
    const ref = useRef(null)

    const handleHideDropdown = (event) => {
        if (event.key === "Escape") {
            setIsComponentVisible(false)
        }
    }

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            console.log("OUTSIDE")
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown, true)
        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("keydown", handleHideDropdown, true)
            document.removeEventListener("click", handleClickOutside, true)
        }
    })

    return { ref, isComponentVisible, setIsComponentVisible }
}

export default useComponentVisible
