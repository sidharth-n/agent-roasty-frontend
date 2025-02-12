import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "WHAT CAN AGENT ROASTY DO?",
    answer:
      "Agent Roasty is your community's AI roast master and meme lord. It can generate witty roasts, create custom memes, and keep your community entertained with both text and image-based humor - all while keeping it clean and fun!",
  },
  {
    question: "HOW PRIVATE IS THE AGENT?",
    answer:
      "100% private! Using Venice API and elizaOS framework, all processing happens locally within your community's server. No data is sent to external servers, and the open-source models run entirely in your environment.",
  },
  {
    question: "HOW DO MODERATOR CONTROLS WORK?",
    answer:
      "Community moderators can customize roast intensity, set content filters, blacklist sensitive topics, and control when/where Agent Roasty can post. You have complete control over the agent's behavior in your community.",
  },
  {
    question: "WHAT ABOUT THE MEMES?",
    answer:
      "Agent Roasty uses state-of-the-art image generation to create custom memes relevant to your community's inside jokes and conversations. All image processing is done locally using Venice API's image models.",
  },
  {
    question: "HOW DO I PAY FOR THE AGENT?",
    answer:
      "Agent Roasty accepts crypto payments through safe smart accounts. You can deploy the agent for free and tip/support it using your preferred cryptocurrency. No traditional payment methods needed!",
  },
]

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-[#ff3e3e] rounded-lg overflow-hidden hover:border-[#ff5555] transition-colors"
        >
          <button
            className="w-full px-6 py-4 flex items-center justify-between bg-black/60 text-left"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-xl font-semibold text-white">
              {faq.question}
            </span>
            {openIndex === index ? (
              <ChevronUp className="text-[#ff3e3e]" />
            ) : (
              <ChevronDown className="text-[#ff3e3e]" />
            )}
          </button>

          {openIndex === index && (
            <div className="px-6 py-4 bg-black/40">
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default FAQ
