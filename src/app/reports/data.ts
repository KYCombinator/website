import { ReportComponentKey } from './components'

export type BadgeType = {
  label: string
  color: string
}

export const badges: Record<string, BadgeType> = {
  research: {
    label: "Research",
    color: "bg-blue-100 text-blue-800"
  },
  event: {
    label: "Event Report", 
    color: "bg-green-100 text-green-800"
  },
  survey: {
    label: "Survey",
    color: "bg-purple-100 text-purple-800"
  },
  KYCombinator: {
    label: "KYCombinator",
    color: "bg-purple-700 text-white"
  },
  newspaper: {
    label: "Newspaper",
    color: "bg-gray-100 text-gray-800"
  }
}

export interface Report {
  slug: string
  title: string
  description: string
  status: "Coming Soon" | "Published"
  date: string
  badges: (keyof typeof badges)[]
  file?: string
  componentKey?: ReportComponentKey
}

export const reports: Report[] = [
    {
        slug: "kycombinator-demographics-2024",
        title: "KYCombinator Community Demographics Report",
        description: "Analysis of Kentucky's tech workforce demographics, education levels, and geographic distribution",
        status: "Published",
        date: "March 2024",
        badges: ["research", "KYCombinator"],
        componentKey: "kycombinator-demographic"
    },
    {
        slug: "nytimes-ai-geography",
        title: "How A.I. Could Reshape America's Economic Geography",
        description: "Analysis of how AI adoption could benefit midsize cities in the Midwest, Mid-Atlantic and South regions",
        status: "Published",
        date: "December 28, 2024",
        badges: ["research", "newspaper"],
        file: "/reports/NYTimes AI reshaping America.pdf",
        componentKey: "nytimes-ai-geography"
    },
    {
    slug: "endeavor-midwest-10-year",
    title: "Unparalleled Endeavor Midwest 10 Year Report",
    description: "A decade of impact and growth in the Midwest entrepreneurial ecosystem",
    status: "Published",
    date: "November 2024",
    badges: ["research"], 
    file: "/reports/Endeavor_10_Year_Impact_Report_20241112.pdf"
    },
  {
    slug: "techstars-roadmap-2019",
    title: "Techstars Roadmap & Assessment Report",
    description: "Strategic assessment and recommendations for Louisville's startup ecosystem",
    status: "Published", 
    date: "March 2019",
    badges: ["research"],
    file: "/reports/techstars_20190301.pdf"
  },
  {
    slug: "endeavor-cities-2019",
    title: "How Cities Can Identify High-Impact Businesses",
    description: "Endeavor's research on identifying businesses that drive local economic growth",
    status: "Published",
    date: "September 2019", 
    badges: ["research"],
    file: "/reports/Endeavor_20190927.pdf"
  }
]