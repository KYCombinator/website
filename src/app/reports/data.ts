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
}

export const reports: Report[] = [
    {
    slug: "endeavor-midwest-10-year",
    title: "Unparalleled Endeavor Midwest 10 Year Report",
    description: "A decade of impact and growth in the Midwest entrepreneurial ecosystem",
    status: "Published",
    date: "November 2024",
    badges: ["research", "event"], 
    file: "/reports/Endeavor_10_Year_Impact_Report_20241112.pdf"
    },
  {
    slug: "techstars-roadmap-2019",
    title: "Techstars Roadmap & Assessment Report",
    description: "Strategic assessment and recommendations for Louisville's startup ecosystem",
    status: "Published", 
    date: "March 2019",
    badges: ["research", "survey"],
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
  },
]