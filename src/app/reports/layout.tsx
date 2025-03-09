export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col container mx-auto">
      {children}
    </div>
  )
}
