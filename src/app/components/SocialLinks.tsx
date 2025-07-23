import { Slack, Github, Linkedin, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SocialLinks = () => {
  return (
    <div className="flex gap-4 justify-center">
    <Link
      href="https://join.slack.com/t/kycombinator/shared_invite/zt-2viueybdu-QNv80gAKk~sJZ9paWebGVQ"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-primary-500 text-primary-on-500 p-3 rounded-md hover-primary-700 transition"
    >
      <Slack className="w-6 h-6" />
    </Link>
    <Link
      href="https://github.com/KYCombinator"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#24292e] text-white p-3 rounded-md hover:bg-[#2f363d] transition"
    >
      <Github className="w-6 h-6" />
    </Link>
    <Link
      href="https://www.linkedin.com/company/kycombinator/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#0A66C2] text-white p-3 rounded-md hover:bg-[#004182] transition"
    >
      <Linkedin className="w-6 h-6" />
    </Link>
    <Link
      href="https://x.com/kycombinator"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-black text-white p-3 rounded-md hover:bg-gray-900 transition"
    >
      <X className="w-6 h-6" />
    </Link>
  </div>
  )
}

export default SocialLinks