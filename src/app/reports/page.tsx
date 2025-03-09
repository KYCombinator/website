import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { reports, badges } from "./data"

export default function ReportsPage() {
  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          Reports & Analytics
        </h1>
        <p className="text-xl text-muted-foreground">
          Data-driven insights into Kentucky&apos;s tech community
        </p>
        <p className="mt-4 text-sm italic text-muted-foreground bg-gray-50 border border-gray-200 rounded-lg p-4">
          All information provided is for educational and research purposes only. Reports may contain copyrighted material used under fair use for educational purposes.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {reports.map((report) => (
          report.status === "Coming Soon" ? (
            <Card 
              key={report.title} 
              className="p-6 hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-purple-200"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2 flex-wrap">
                      {report.badges.map((badge) => (
                        <Badge 
                          key={badge} 
                          variant="outline" 
                          className={`${badges[badge].color} shadow-sm`}
                        >
                          {badges[badge].label}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-500">{report.date}</span>
                  </div>
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {report.title}
                  </h2>
                  <p className="text-gray-600">{report.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Badge 
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    {report.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ) : (
            <Link href={`/reports/${report.slug}`} key={report.title}>
              <Card 
                className="p-6 hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:border-purple-200 cursor-pointer"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-2 flex-wrap">
                        {report.badges.map((badge) => (
                          <Badge 
                            key={badge} 
                            variant="outline" 
                            className={`${badges[badge].color} shadow-sm`}
                          >
                            {badges[badge].label}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-500">{report.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-purple-700 transition-colors">
                      {report.title}
                    </h2>
                    <p className="text-gray-600">{report.description}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center text-purple-600 font-medium">
                      View Report
                      <span className="ml-1">→</span>
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          )
        ))}
      </div>

      <div className="mt-12 p-8 border rounded-lg bg-gradient-to-br from-purple-50 to-white border-purple-100 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Looking for Custom Reports?</h2>
        <p className="text-gray-600 mb-4">
          Need specific data or insights about Kentucky&apos;s tech ecosystem? 
          We&apos;re happy to help with custom analytics and reports.
        </p>
      </div>
    </main>
  )
} 