import React from "react"
import { MessageSquare, Image } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: MessageSquare,
    title: "TEXT ROASTS",
    description:
      "Unleash savage AI-powered roasts in your community. Agent Roasty delivers personalized burns, witty comebacks, and hilarious responses that adapt to your community's style.",
    techDetail: "Powered by elizaOS + Venice API",
    bgGradient: "from-[#ff3e3e]/20 via-black to-transparent",
  },
  {
    icon: Image,
    title: "MEME FACTORY",
    description:
      "Generate custom memes on the fly. Turn conversations into viral-worthy content with AI-generated images that perfectly capture your community's inside jokes.",
    techDetail: "Using Venice API Image Models",
    bgGradient: "from-[#ff3e3e]/20 via-black to-transparent",
  },
]

const WhatCanItDo: React.FC = () => {
  return (
    <section className="py-32 relative bg-[#0a0a0a] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#ff3e3e]/5 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#ff3e3e]/5 blur-[120px] animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl title-font text-[#17fa22] mb-24 text-center"
        >
          DUAL THREAT AGENT
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Animated border effect */}
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-[#ff3e3e] to-[#ff3e3e]/50 rounded-lg blur opacity-30 
                            group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
              />

              <div
                className="relative bg-black/90 rounded-lg p-8 border border-[#ff3e3e]/20 
                            hover:border-[#ff3e3e] transition-colors duration-500"
              >
                {/* Feature icon with glow */}
                <div
                  className="w-16 h-16 rounded-full bg-[#ff3e3e]/10 flex items-center justify-center mb-6
                              group-hover:scale-110 transition-transform duration-500"
                >
                  <feature.icon className="text-[#ff3e3e] w-8 h-8 group-hover:animate-pulse" />
                </div>

                {/* Title with hover effect */}
                <h3 className="text-3xl title-font text-white mb-4 group-hover:text-[#ff3e3e] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Tech detail badge */}
                <div className="bg-[#ff3e3e]/10 px-4 py-2 rounded-full inline-block border border-[#ff3e3e]/20">
                  <span className="text-sm text-[#ff3e3e] font-mono">
                    {feature.techDetail}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatCanItDo
