import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { motion } from "framer-motion"

const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this app")
      return
    }

    try {
      setLoading(true)
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setAccount(accounts[0])
    } catch (error) {
      console.error("Connection error:", error)
      alert("Failed to connect wallet")
    } finally {
      setLoading(false)
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setAccount("")
        } else {
          setAccount(accounts[0])
        }
      })
    }
  }, [])

  return (
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
      onClick={connectWallet}
      className="relative group bg-[#ff3e3e] hover:bg-[#ff5555] 
                text-white px-8 py-3
                text-xl font-bold rounded-lg 
                transform transition-all duration-200 
                shadow-lg hover:shadow-red-600/50 
                border-b-4 border-[#cc0000]
                hover:border-b-2 hover:translate-y-[2px] pricedown-font"
      disabled={loading}
    >
      {loading
        ? "Connecting..."
        : account
        ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
        : "DEPLOY AGENT"}
    </motion.button>
  )
}

export default WalletConnect
