import React from "react"
import { Wallet, Settings, Bot, Coins } from "lucide-react"

const steps = [
  {
    icon: Wallet,
    title: "CONNECT",
    description: "Login with Safe Smart Account - secure & crypto-native",
  },
  {
    icon: Settings,
    title: "CONFIGURE",
    description:
      "Customize your agent's personality, roast style & knowledge base",
  },
  {
    icon: Bot,
    title: "DEPLOY",
    description:
      "Add to your community for free - works with Discord & Telegram",
  },
  {
    icon: Coins,
    title: "SUSTAIN",
    description:
      "Community tips keep agent running - auto-refunds excess to DAO",
  },
]

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 relative bg-[#0a0a0a]/90">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl title-font text-[#ff3e3e] mb-12 text-center">
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

        <div className="mt-8 p-4 bg-[#ff3e3e]/10 rounded-lg border border-[#ff3e3e]/30 text-center">
          <p className="text-sm font-medium text-gray-300">
            Powered by Safe Global, elizaOS & Venice API
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
