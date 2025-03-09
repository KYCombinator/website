import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { notFound } from "next/navigation"
import { reports, badges } from "../data"
import { Download } from "lucide-react"
import { reportComponents } from "../components"

export function generateStaticParams() {
  return reports.map((report) => ({
    slug: report.slug,
  }))
}

export function generateMetadata({ params }) {
  const report = reports.find((r) => r.slug === params.slug)
  
  if (!report) {
    return {
      title: 'Report Not Found | KYCombinator',
    }
  }

  return {
    title: `${report.title} | KYCombinator`,
    description: report.description,
  }
}

export default function ReportPage({ params }) {
  const report = reports.find((r) => r.slug === params.slug)

  if (!report) {
    notFound()
  }

  const ReportComponent = report.componentKey ? reportComponents[report.componentKey] : null

  return (
    <main className="container py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-2">
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
          <span className="text-sm text-muted-foreground">{report.date}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          {report.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {report.description}
        </p>
      </div>

      {report.status === "Coming Soon" ? (
        <Card className="p-6 bg-muted">
          <p className="text-center text-muted-foreground">
            This report is coming soon. Check back later!
          </p>
        </Card>
      ) : (
        <>
          {report.file && (
            <div className="mb-8">
              <a
                href={report.file}
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition"
              >
                <Download className="w-4 h-4" />
                Download Report
              </a>
            </div>
          )}
          <div className="prose dark:prose-invert max-w-none">
            {ReportComponent ? (
              <ReportComponent />
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Static content for this report will be added soon.</p>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  )
}