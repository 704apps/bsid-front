import { BreadcrumbPainel } from "@/components/dashboard/breadcrumbPainel";
import NotificationForm from "@/components/newSignature/notificationForm";
import NotificationPreview from "@/components/newSignature/notificationPreview";

const breadCrumbConst = [
  { title: "Painel", link: "/painel" },
  { title: "Nova assinatura", link: "/painel/nova-assinatura" }
]

export default function NewSignature() {
  return (
    <div>
      <BreadcrumbPainel path={breadCrumbConst}/>
      <h1 className="font-bold text-2xl my-4">Crie sua assinatura de áudio</h1>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <NotificationForm />
        </div>
        <div className="w-1/2 pl-4">
          <NotificationPreview />
        </div>
      </div>
    </div>
  )
}
