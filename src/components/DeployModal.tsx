import React, { useState } from "react"
import { ethers } from "ethers"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

// Contract configs
const SUBSCRIPTION_ADDRESS = "0x9Fe9155f1fecBEca4a789967C3a45ff2Cb5a2617"
const SUBSCRIPTION_ABI = [
  "function subscribe() external payable",
  "event Subscribed(address indexed user, uint256 timestamp)",
]

const SAFE_FACTORY_ADDRESS = "0xB1386a71C2dC83dA35b5764aF29E6326F1079da2"
const SAFE_FACTORY_ABI = [
  "function deployCommunitySafe(address admin) public returns (address)",
  "event SafeDeployed(address indexed admin, address safeAddress)",
]

const AGENT_ROASTY_ADDRESS = "0xe05DCAf9206D125D7887919784756af8e69FaD89"
const BOT_INVITE_LINK =
  "https://discord.com/oauth2/authorize?client_id=1338378821690327105&permissions=75776&integration_type=0&scope=bot+applications.commands"

interface DeployModalProps {
  isOpen: boolean
  onClose: () => void
}

const DeployModal: React.FC<DeployModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<"subscribe" | "createSafe" | "final">(
    "subscribe"
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [safeAddress, setSafeAddress] = useState("")

  const subscribe = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed!")
      return
    }

    try {
      setLoading(true)
      setError("")

      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        SUBSCRIPTION_ADDRESS,
        SUBSCRIPTION_ABI,
        signer
      )

      const tx = await contract.subscribe({
        value: ethers.parseEther("0.005"),
      })
      await tx.wait()
      setStep("createSafe")
    } catch (error) {
      console.error("Subscription error:", error)
      setError("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const deploySafe = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed!")
      return
    }

    try {
      setLoading(true)
      setError("")

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(
        SAFE_FACTORY_ADDRESS,
        SAFE_FACTORY_ABI,
        signer
      )

      const adminAddr = await signer.getAddress()
      const tx = await contract.deployCommunitySafe(adminAddr)
      const receipt = await tx.wait()

      // Get Safe address from event
      for (const log of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(log)
          if (parsedLog.name === "SafeDeployed") {
            setSafeAddress(parsedLog.args.safeAddress)
            break
          }
        } catch (e) {
          // Skip non-matching logs
        }
      }

      setStep("final")
    } catch (error) {
      console.error("Deploy Safe error:", error)
      setError("Failed to deploy Safe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-[#1a1a1a] rounded-lg p-6 max-w-md w-full border border-[#ff3e3e]/20"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            {step === "subscribe" && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-[#ff3e3e]">
                  Subscribe to Agent Roasty
                </h2>
                <p className="text-gray-300 mb-6">
                  Subscribe for 0.005 Sepolia ETH to get access to Agent Roasty
                </p>
                <button
                  onClick={subscribe}
                  disabled={loading}
                  className="w-full bg-[#ff3e3e] hover:bg-[#ff5555] text-white px-6 py-3 
                           rounded-lg transform transition-all duration-200 
                           disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Subscribe Now"}
                </button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            )}

            {step === "createSafe" && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-[#ff3e3e]">
                  Create Community Safe
                </h2>
                <p className="text-gray-300 mb-6">
                  Create a Safe Smart Account to handle payments/tips and
                  conduct contests with agent Roasty. You and Roasty will be the
                  signers of this account.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={deploySafe}
                    disabled={loading}
                    className="flex-1 bg-[#ff3e3e] hover:bg-[#ff5555] text-white px-6 py-3 
                             rounded-lg transform transition-all duration-200 
                             disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Account"}
                  </button>
                  <button
                    onClick={() => setStep("final")}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 
                             rounded-lg transform transition-all duration-200"
                  >
                    Maybe Later
                  </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            )}

            {step === "final" && (
              <div className="text-center">
                {safeAddress ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-[#ff3e3e]">
                      Safe Account Created!
                    </h2>
                    <p className="text-gray-300 mb-4">
                      Please save your Safe Account address:
                      <span className="block font-mono text-sm bg-black/50 p-2 rounded mt-2">
                        {safeAddress}
                      </span>
                    </p>
                    <p className="text-gray-300 mb-6">
                      You and Agent Roasty are now the signers of this account.
                      Make sure to save this address for future reference!
                    </p>
                  </>
                ) : (
                  <h2 className="text-2xl font-bold mb-4 text-[#ff3e3e]">
                    Ready to Deploy!
                  </h2>
                )}
                <a
                  href={BOT_INVITE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#ff3e3e] hover:bg-[#ff5555] text-white px-6 py-3 
                           rounded-lg transform transition-all duration-200 mb-4"
                >
                  Add Bot to Discord
                </a>
                <button
                  onClick={onClose}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 
                           rounded-lg transform transition-all duration-200"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeployModal
