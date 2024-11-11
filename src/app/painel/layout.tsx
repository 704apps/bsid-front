import DashboardHeader from "@/components/dashboard/dashboardHeader"
import Footer from "@/components/footer"

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <DashboardHeader />

      <div className="container mx-auto min-h-[83vh]">
        {children}
      </div>

      <Footer />
    </section>
  )
}