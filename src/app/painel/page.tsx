import { BreadcrumbPainel } from "@/components/dashboard/breadcrumbPainel";
// import { ChartAccessByCity } from "@/components/dashboard/chartAccessByCity";
import ChartInteractions from "@/components/dashboard/chartInteractions";
import ChartSignaturesReaded from "@/components/dashboard/chartSignaturesReaded";
import HeatmapEngagement from "@/components/dashboard/heatmapEngagement";
import NotificationCard from "@/components/dashboard/notification";
import ResumeSignatureCard from "@/components/dashboard/resumeSignatureCard";
import SignatureReadersTable from "@/components/dashboard/signatureReadersTable";
import SignaturesList from "@/components/dashboard/signatures";
// import { useAuth } from "@/context/authContext";

export default function Painel() {
  // const { user } = useAuth();

  return (
    <div>
      <BreadcrumbPainel path={[{ title: "Painel", link: "/painel" }]} />
      <div className="grid grid-cols-[300px_1fr] gap-6 py-6">
        <SignaturesList />
        <div className="grid grid-rows-[auto_auto_auto_auto_auto] gap-6">
          <ResumeSignatureCard />
          <div className="grid grid-cols-2 gap-6">
            <ChartSignaturesReaded />
            <NotificationCard />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <HeatmapEngagement />
            {/* <ChartAccessByCity /> */}
            <ChartInteractions />
          </div>
          <SignatureReadersTable />
        </div>
      </div>
    </div>
  );
}
