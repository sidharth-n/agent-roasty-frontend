import React, { useState, useEffect, useRef } from "react"
import { Skull, ChevronRight, Star, Users } from "lucide-react"
import Footer from "./components/Footer"
import MusicPlayer from "./components/MusicPlayer"
import RoastNotification from "./components/RoastNotification"
import FAQ from "./components/FAQ"
import WarningSection from "./components/WarningSection"
import HeroAwards from "./components/HeroAwards"
import { BACKGROUND_IMAGES } from "./config/images"
import BackToTop from "./components/BackToTop"
import HowItWorks from "./components/HowItWorks"
import WhatCanItDo from "./components/WhatCanItDo"

import {
  INITIAL_ROAST_COUNT,
  NOTIFICATION_DURATION,
  NOTIFICATION_INTERVAL,
  AUDIO_URL,
} from "./config/constants"
import { getRandomName } from "./utils/names"
import { motion, AnimatePresence } from "framer-motion"

export default function App() {
  const [roastCount, setRoastCount] = useState(1337)
  const [notification, setNotification] = useState<{
    roaster: string
    target: string
  } | null>(null)

  const [showMusicModal, setShowMusicModal] = useState(true)
  const [isMusicEnabled, setIsMusicEnabled] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)
  const [isStatsPanelVisible, setIsStatsPanelVisible] = useState(true)
  const [shouldAutoHide, setShouldAutoHide] = useState(true)
  const notificationSound = useRef<HTMLAudioElement | null>(null)
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShowLoadingScreen(false)
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const musicPreference = localStorage.getItem("musicPreference")
    if (musicPreference === "enabled") {
      setIsMusicEnabled(true)
      setShowMusicModal(false)
    } else if (musicPreference === "disabled") {
      setShowMusicModal(false)
    }
  }, [])

  useEffect(() => {
    if (notificationSound.current) {
      notificationSound.current.muted = !isSoundEnabled
    }
  }, [isSoundEnabled])

  const handleMusicChoice = (choice: boolean) => {
    setIsMusicEnabled(choice)
    setIsSoundEnabled(choice)
    localStorage.setItem("musicPreference", choice ? "enabled" : "disabled")
    setShowMusicModal(false)
  }

  const handleSoundToggle = (enabled: boolean) => {
    setIsSoundEnabled(enabled)
    setIsMusicEnabled(enabled)
    localStorage.setItem("musicPreference", enabled ? "enabled" : "disabled")
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setNotification({
        roaster: getRandomName("roasters"),
        target: getRandomName("targets"),
      })

      setRoastCount(prev => prev + 1)

      if (notificationSound.current && isSoundEnabled) {
        notificationSound.current
          .play()
          .catch(err => console.log("Audio play failed:", err))
      }

      setTimeout(() => setNotification(null), NOTIFICATION_DURATION)
    }, NOTIFICATION_INTERVAL)

    return () => clearInterval(interval)
  }, [isSoundEnabled])

  useEffect(() => {
    if (shouldAutoHide) {
      const timer = setTimeout(() => {
        setIsStatsPanelVisible(false)
        setShouldAutoHide(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [shouldAutoHide])

  useEffect(() => {
    if (isStatsPanelVisible) {
      const timer = setTimeout(() => {
        setIsStatsPanelVisible(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isStatsPanelVisible])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative font-digital">
      <div className="bg-noise"></div>

      {/* Loading Screen */}
      {showLoadingScreen && (
        <motion.div
          className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
          animate={{ opacity: loadingProgress === 100 ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-[#ff3e3e] mb-8 text-center"
          >
            LOADING FRESH ROASTS
          </motion.div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#ff3e3e]"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="mt-4 text-gray-400">
            Preparing Agents... {loadingProgress}%
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section
        className="h-[95vh] relative flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${BACKGROUND_IMAGES.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-scanlines"></div>

        {/* Stats Panel Container */}
        <div className="absolute left-0 top-4 z-30">
          {/* Expand Button - Shows when panel is hidden */}
          {!isStatsPanelVisible && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsStatsPanelVisible(true)}
              className="bg-black/80 p-2 rounded-r-lg border border-[#ff3e3e]/30
                       hover:bg-[#ff3e3e]/10 transition-colors"
            >
              <ChevronRight className="text-[#ff3e3e]" />
            </motion.button>
          )}

          {/* Stats Panel with slower animation */}
          {isStatsPanelVisible && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8,
              }}
              className="bg-black/80 p-4 rounded-r-lg border border-[#ff3e3e]/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <Skull className="text-[#ff3e3e]" />
                <span>Agent Status: ONLINE</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Users className="text-[#ff3e3e]" />
                <span>Communities: {roastCount}</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-[#ff3e3e]" />
                <span>Privacy: MAXIMUM</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="text-center z-10 px-4 relative ">
          {/* Original Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* GTA-style container box */}
            <div
              className="inline-block bg-black/60 backdrop-blur-sm border-2 border-[#ff3e3e]/30 
                            p-4 rounded-lg shadow-2xl relative overflow-hidden
                            scale-90"
            >
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#ff3e3e]/0 via-[#ff3e3e]/10 to-[#ff3e3e]/0 
                              animate-shine"
              ></div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#ff3e3e]"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#ff3e3e]"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#ff3e3e]"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#ff3e3e]"></div>

              {/* Title */}
              <div
                className="text-[#ff3e3e] text-xl md:text-2xl mb-2 font-black tracking-[0.2em] 
                              uppercase pricedown-font text-shadow-red"
              >
                Active Communities
              </div>

              {/* Counter */}
              <motion.div
                key={roastCount}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-6xl font-bold text-white glitch-text shadow-glow 
                          relative font-digital tracking-wider"
              >
                {roastCount.toLocaleString()}
                <span className="absolute -inset-1 bg-[#ff3e3e]/20 blur-lg"></span>
              </motion.div>
            </div>
          </motion.div>

          <h1 className="text-7xl md:text-7xl lg:text-9xl title-font mt-8 mb-8 glitch-effect">
            AGENT
            <span className="block text-[#ff3e3e] relative">
              ROASTY
              <span className="absolute -inset-1 animate-pulse bg-[#ff3e3e]/20 blur-lg"></span>
            </span>
          </h1>

          {/* Original HeroAwards */}
          <HeroAwards />

          {/* Mission Start Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 items-center"
          >
            {/* Original Deploy Button */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-[#ff3e3e] rounded-lg blur-xl"
              />
              <motion.button
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                onClick={() => {
                  document
                    .getElementById("roast-form")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
                className="relative group bg-[#ff3e3e] hover:bg-[#ff5555] 
                          text-white px-8 py-3
                          text-xl font-bold rounded-lg 
                          transform transition-all duration-200 
                          shadow-lg hover:shadow-red-600/50 
                          border-b-4 border-[#cc0000]
                          hover:border-b-2 hover:translate-y-[2px] pricedown-font"
              >
                DEPLOY AGENT
              </motion.button>
            </div>

            {/* Try It Out Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                window.open("https://discord.gg/your-test-server", "_blank")
              }}
              className="text-[#ff3e3e] hover:text-white px-4 py-1.5 
                        text-sm font-semibold rounded-md
                        transform transition-all duration-200
                        flex items-center gap-2
                        border border-[#ff3e3e]/30 hover:bg-[#ff3e3e]/20"
            >
              Try Roasty in Discord
              <ChevronRight size={14} />
            </motion.button>
          </motion.div>

          {/* Partner Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="mt-8 relative overflow-hidden w-full max-w-xl mx-auto"
          >
            <div className="flex items-center justify-center">
              <motion.div
                animate={{
                  x: ["0%", "-50%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex gap-6 whitespace-nowrap"
              >
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <React.Fragment key={i}>
                    <img
                      src="/partner-logos/safe.png"
                      alt="Safe Smart Accounts"
                      className="h-8 opacity-70 hover:opacity-100 transition-opacity rounded-lg border border-[#ff3e3e]/20 hover:border-[#ff3e3e]/40"
                    />
                    <img
                      src="/partner-logos/eliza.avif"
                      alt="elizaOS Framework"
                      className="h-8 opacity-70 hover:opacity-100 transition-opacity rounded-lg border border-[#ff3e3e]/20 hover:border-[#ff3e3e]/40"
                    />
                    <img
                      src="/partner-logos/venice.png"
                      alt="Venice API"
                      className="h-8 opacity-70 hover:opacity-100 transition-opacity rounded-lg border border-[#ff3e3e]/20 hover:border-[#ff3e3e]/40"
                    />
                  </React.Fragment>
                ))}
                {/* Duplicate set for seamless loop */}
                {[1, 2, 3, 4, 5, 6].map((_, i) => (
                  <React.Fragment key={`dup-${i}`}>
                    <img
                      src="/partner-logos/safe.png"
                      alt="Safe Smart Accounts"
                      className="h-8 opacity-70 hover:opacity-100 transition-opacity rounded-lg border border-[#ff3e3e]/20 hover:border-[#ff3e3e]/40"
                    />
                    <img
                      src="/partner-logos/eliza.avif"
                      alt="elizaOS Framework"
                      className="h-8 opacity-70 hover:opacity-100 transition-opacity rounded-lg border border-[#ff3e3e]/20 hover:border-[#ff3e3e]/40"
                    />
                    <img
                      src="/partner-logos/venice.png"
                      alt="Venice API"
                      className="h-8 opacity-70 hover:opacity-100 transition-opacity rounded-lg border border-[#ff3e3e]/20 hover:border-[#ff3e3e]/40"
                    />
                  </React.Fragment>
                ))}
              </motion.div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a] to-transparent z-10"></div>
          </motion.div>
        </div>

        {notification && (
          <RoastNotification
            roaster={notification.roaster}
            target={notification.target}
          />
        )}
      </section>

      {/* What Can It Do Section */}
      <WhatCanItDo />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Roast Form Section */}
      <section
        id="roast-form"
        className="pt-12 pb-16 relative scroll-mt-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${BACKGROUND_IMAGES.form})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* GTA-style Section Header */}
      </section>

      {/* FAQ Section */}
      <section
        className="py-16 relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url(${BACKGROUND_IMAGES.faq})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl title-font text-[#000000] mb-12 text-center">
            FAQ
          </h2>
          <FAQ />
        </div>
      </section>
      <WarningSection />
      <Footer />
      <MusicPlayer
        audioUrl={AUDIO_URL}
        autoPlay={isMusicEnabled}
        onSoundToggle={handleSoundToggle}
      />
      <BackToTop />

      {showMusicModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-[#1a1a1a] p-8 rounded-lg max-w-md mx-4 border border-[#ff3e3e]/20"
          >
            <h2 className="text-xl font-bold mb-4 text-center text-[#ff3e3e]">
              Enable background music?
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => handleMusicChoice(true)}
                className="flex-1 bg-[#991b1b] hover:bg-[#ff5555] text-white px-6 py-3 
                         rounded-lg transform transition-all duration-200 
                         shadow-lg hover:shadow-red-600/50"
              >
                yes
              </button>
              <button
                onClick={() => handleMusicChoice(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 
                         rounded-lg transform transition-all duration-200"
              >
                no
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <audio
        ref={notificationSound}
        src="/notification.mp3"
        muted={!isSoundEnabled}
      />

      {/* Add to your global styles */}
      <style jsx global>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.15;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes shine {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </div>
  )
}
