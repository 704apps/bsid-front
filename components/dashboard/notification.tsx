import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const NotificationCard = () => {
  const notificationImageUrl = "https://picsum.photos/48/48"; // URL for notification image
  const bannerImageUrl = "https://picsum.photos/500/300"; // URL for banner image

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Image
            src={notificationImageUrl}
            alt="Notification"
            width={180} // Added width property
            height={180} // Added height property
            className="rounded-full mr-3"
          />
          <div>
            <span>Título da Notificação</span>
            <p className="text-sm text-muted-foreground">
              Esta é uma descrição da notificação. Aqui você pode adicionar mais detalhes sobre o que está acontecendo.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={bannerImageUrl}
          alt="Banner"
          width={500} // Added width property
          height={300} // Added height property
          className="mt-4 w-full h-auto"
        />
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
