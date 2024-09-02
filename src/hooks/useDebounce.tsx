'use client'

import { useEffect, useRef } from 'react'

const useDebounce = (callback: () => void, time: number) => {
    const timerRef = useRef(null)

    const debounce = (callback, time) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            callback() 
            timerRef.current = null
        }, time)
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [])


    return debounce
}

export default useDebounce
