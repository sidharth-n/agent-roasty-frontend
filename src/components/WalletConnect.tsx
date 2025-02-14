import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import { motion } from "framer-motion"
import Safe, { EthAdapter } from "@safe-global/protocol-kit"

// Sepolia network config
const SEPOLIA_CONFIG = {
  chainId: "0xaa36a7",
  name: "Sepolia",
  rpcUrl: "https://rpc.sepolia.org",
  blockExplorer: "https://sepolia.etherscan.io",
}

const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState("")
  const [safeAddress, setSafeAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [networkOk, setNetworkOk] = useState(false)

  // Check if we're on Sepolia
  async function checkNetwork() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" })
    return chainId === SEPOLIA_CONFIG.chainId
  }

  // Switch to Sepolia
  async function switchToSepolia() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CONFIG.chainId }],
      })
    } catch (error: any) {
      // If Sepolia is not added to MetaMask
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: SEPOLIA_CONFIG.chainId,
              chainName: SEPOLIA_CONFIG.name,
              nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
              rpcUrls: [SEPOLIA_CONFIG.rpcUrl],
              blockExplorerUrls: [SEPOLIA_CONFIG.blockExplorer],
            },
          ],
        })
      }
    }
  }

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask to use this app")
      return
    }

    try {
      setLoading(true)

      // First connect MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      setAccount(accounts[0])

      // Make sure we're on Sepolia
      if (!(await checkNetwork())) {
        await switchToSepolia()
      }
      setNetworkOk(true)

      // Now setup Safe
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // Create ethAdapter
      const ethAdapter = new EthAdapter({
        ethers,
        signerOrProvider: signer,
      })

      // Initialize Safe
      const safeSdk = await Safe.create({ ethAdapter })

      // Get Safe address
      const safeAddress = await safeSdk.getAddress()
      setSafeAddress(safeAddress)
      console.log("Safe ready at:", safeAddress)
    } catch (error) {
      console.error("Connection error:", error)
      alert("Failed to connect. Make sure you're on Sepolia network!")
    } finally {
      setLoading(false)
    }
  }

  // Watch for network changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", async () => {
        setNetworkOk(await checkNetwork())
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
        : !networkOk && account
        ? "Switch to Sepolia"
        : safeAddress
        ? `Safe Ready: ${safeAddress.slice(0, 6)}...${safeAddress.slice(-4)}`
        : "DEPLOY AGENT"}
    </motion.button>
  )
}

export default WalletConnect
