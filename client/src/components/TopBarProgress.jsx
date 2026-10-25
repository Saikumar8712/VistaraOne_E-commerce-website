import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

export default function TopBarProgress() {
  const location = useLocation()
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    setAnimating(true)
    const timer = setTimeout(() => {
      setAnimating(false)
    }, 450)
    return () => clearTimeout(timer)
  }, [location.pathname, location.search])

  return (
    <AnimatePresence>
      {animating && (
        <motion.div
          key="route-progress-bar"
          initial={{ width: '0%', opacity: 1 }}
          animate={{ width: '100%' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed top-0 left-0 right-0 z-[101] h-[3px] bg-gradient-to-r from-lime-400 via-[#B8F36B] to-emerald-400 shadow-[0_0_12px_#B8F36B] pointer-events-none"
        />
      )}
    </AnimatePresence>
  )
}
