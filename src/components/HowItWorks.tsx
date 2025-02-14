import React from "react"
import { CreditCard, Wallet, Bot, Coins } from "lucide-react"

const steps = [
  {
    icon: CreditCard,
    title: "SUBSCRIBE",
    description:
      "Subscribe to Agent Roasty for 0.005 Sepolia ETH monthly. Get access to premium roasting capabilities.",
  },
  {
    icon: Wallet,
    title: "SETUP SAFE (OPTIONAL)",
    description:
      "Create a Community Safe Account - you and Agent Roasty will be the signers. Perfect for managing tips and running contests.",
  },
  {
    icon: Bot,
    title: "DEPLOY",
    description:
      "Add Agent Roasty to your Discord server and let the roast show begin! Works instantly after subscription.",
  },
  {
    icon: Coins,
    title: "ENGAGE",
    description:
      "Community members can tip the agent, participate in roast contests, and more using the Safe Account.",
  },
]

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 relative bg-[#0a0a0a]/90">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl title-font text-[#000000] mb-12 text-center">
          HOW IT WORKS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="border border-[#ff3e3e]/30 rounded-lg p-6 bg-black/50 backdrop-blur-sm
                         hover:border-[#ff3e3e] transition-colors group"
            >
              <div className="flex items-center gap-4 mb-3">
                <step.icon className="text-[#ff3e3e] w-8 h-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl title-font text-white">{step.title}</h3>
              </div>
              <p className="text-gray-300 text-lg">{step.description}</p>
            </div>
          ))}
        </div>

        {/*  <div className="mt-8 p-4 bg-[#ff3e3e]/10 rounded-lg border border-[#ff3e3e]/30 text-center">
          <p className="text-sm font-medium text-gray-300">
            Powered by Safe Global, elizaOS & Venice API
          </p>
        </div> */}
      </div>
    </section>
  )
}

export default HowItWorks
