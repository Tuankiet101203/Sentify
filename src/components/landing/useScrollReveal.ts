import { useEffect, useRef, useState } from 'react'

type ScrollRevealOptions = {
  threshold?: number
  rootMargin?: string
}

export function useScrollReveal({
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
}: ScrollRevealOptions = {}) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setIsRevealed(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextReveal = entry.isIntersecting && entry.intersectionRatio >= threshold
        setIsRevealed(nextReveal)
      },
      { threshold: [0, threshold], rootMargin },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return { sectionRef, isRevealed }
}
