import React from "react"
import { ShieldAlert } from "lucide-react"

const WarningSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#0a0a0a]/90">
      <div className="max-w-3xl mx-auto px-4">
        <div className="border-2 border-[#ff3e3e] rounded-lg p-8 bg-black/50 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4">
            <ShieldAlert size={32} className="text-[#ff3e3e]" />
            <h2 className="text-3xl title-font text-[#f7d5d5]">
              PRIVACY & SAFETY FIRST
            </h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p className="text-xl leading-relaxed">
              Agent Roasty is built with privacy and community safety in mind.
              All processing happens locally using Venice API.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No data sent to external servers - complete privacy</li>
              <li>Open source models for transparency</li>
              <li>Community moderator controls included</li>
              <li>Safe-filters for appropriate content</li>
              <li>Customizable roast intensity per community</li>
            </ul>
            <p className="text-lg italic mt-4">
              Deploy with confidence: Your community's data stays within your
              community.
            </p>
            <div className="mt-6 p-4 bg-[#ff3e3e]/10 rounded-lg border border-[#ff3e3e]/30">
              <p className="text-sm font-medium">
                Powered by elizaOS agent framework and{" "}
                <a href="https://venice.ai/home" className="text-[#ff3e3e]">
                  Venice API
                </a>{" "}
                for secure, private, and ethical AI interactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WarningSection
