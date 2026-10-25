import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, ShoppingBag, ShieldCheck, Zap } from 'lucide-react'

export default function PageLoader({ show, onFinish }) {
  const [progress, setProgress] = useState(15)
  const [statusText, setStatusText] = useState('Initializing VistaraOne marketplace…')

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflow = ''
      window.scrollTo(0, 0)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  useEffect(() => {
    if (!show) return

    const t1 = setTimeout(() => {
      setProgress(45)
      setStatusText('Connecting to live MongoDB database…')
    }, 250)

    const t2 = setTimeout(() => {
      setProgress(78)
      setStatusText('Loading 500+ products across 10 categories…')
    }, 600)

    const t3 = setTimeout(() => {
      setProgress(100)
      setStatusText('Marketplace ready!')
    }, 950)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="vistara-splash-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.03,
            filter: 'blur(8px)',
            transition: { duration: 0.5, ease: 'easeInOut' },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070b12] text-white selection:bg-lime selection:text-navy"
        >
          {/* Ambient Background Glow Orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.15, 0.28, 0.15],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#B8F36B]/20 via-[#10b981]/15 to-transparent blur-[120px]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,11,18,0.7)_100%)]" />
          </div>

          {/* Central Logo Container */}
          <div className="relative z-10 flex flex-col items-center px-4 text-center">
            {/* Glowing Icon Wrapper */}
            <div className="relative mb-6">
              {/* Spinning Ambient Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                className="absolute -inset-3 rounded-3xl border border-dashed border-[#B8F36B]/30"
              />

              {/* Pulsing Outer Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute -inset-2 rounded-2xl bg-[#B8F36B]/25 blur-lg"
              />

              {/* The "V" Brand Tile */}
              <motion.div
                initial={{ scale: 0.8, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-[#B8F36B] shadow-[0_0_35px_rgba(184,243,107,0.45)]"
              >
                <span className="text-4xl font-black text-[#0b111e] tracking-tighter">V</span>
              </motion.div>
            </div>

            {/* Brand Title */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Vistara<span className="text-[#B8F36B]">One</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-1.5 text-xs font-medium tracking-wide text-slate-400 sm:text-sm"
            >
              One Destination. Everything You Need.
            </motion.p>

            {/* Futuristic Progress Bar */}
            <div className="mt-8 w-72 sm:w-80">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-md">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#B8F36B] via-[#4ade80] to-[#B8F36B] shadow-[0_0_12px_#B8F36B]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>

              {/* Status and Percentage */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <motion.span
                  key={statusText}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="truncate text-slate-300"
                >
                  {statusText}
                </motion.span>
                <span className="font-mono text-[#B8F36B]">{progress}%</span>
              </div>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex items-center gap-5 text-[11px] text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#B8F36B]" />
                <span>Verified Marketplace</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#B8F36B]" />
                <span>Live MongoDB Data</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
