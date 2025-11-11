"use client"

import { useEffect, useRef, useState } from "react"

// Returns a progress value in [0, 1] based on window scroll distance
export function useScrollProgress(normalizeByViewportFraction = 0.6) {
	const [progress, setProgress] = useState(0)
	const rafIdRef = useRef<number | null>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (rafIdRef.current != null) return
			rafIdRef.current = requestAnimationFrame(() => {
				rafIdRef.current = null
				const viewport = window.innerHeight || 1
				const denom = Math.max(1, viewport * normalizeByViewportFraction)
				const p = Math.min(1, Math.max(0, window.scrollY / denom))
				setProgress(p)
			})
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		// Initialize once
		handleScroll()
		return () => {
			window.removeEventListener("scroll", handleScroll)
			if (rafIdRef.current != null) {
				cancelAnimationFrame(rafIdRef.current)
			}
		}
	}, [normalizeByViewportFraction])

	return progress
}


