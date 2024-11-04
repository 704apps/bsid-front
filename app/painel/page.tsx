// Painel.js

'use client'

import ChartInteractions from "@/components/dashboard/chartInteractions";
import ChartSignaturesReaded from "@/components/dashboard/chartSignaturesReaded";
import HeatmapEngagement from "@/components/dashboard/heatmapEngagement";
import NotificationCard from "@/components/dashboard/notification";
import SignatureReadersTable from "@/components/dashboard/signatureReadersTable";
import SignaturesList from "@/components/dashboard/signatures";
import Footer from "@/components/footer";
// import { useAuth } from "@/context/authContext";

export default function Painel() {
  // const { user } = useAuth();

  return (
    <div>
      <div className="grid grid-cols-[300px_1fr] gap-6 p-6">
        <SignaturesList />
        <div className="grid grid-rows-[auto_auto_auto_auto_auto] gap-6">
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            Componente div apenas com um texto
          </div>
          <div className="grid grid-cols-2 gap-6">
            <ChartSignaturesReaded />
            <NotificationCard />
          </div>
          <HeatmapEngagement />
          <SignatureReadersTable />
          <ChartInteractions />
        </div>
      </div>

      <Footer />
    </div>
  );
}
