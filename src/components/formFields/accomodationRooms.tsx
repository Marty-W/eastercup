import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useI18n } from "locales/client";
import AccomodationRoomTable from "./accomodationRoomTable";

export default function AccomodationRooms() {
  const t = useI18n();
  return (
    <div>
      <Tabs defaultValue="wednesday">
        <TabsList className="w-full overflow-x-auto">
          <TabsTrigger value="wednesday" className="flex-1">
            {t("common.wednesday")}
          </TabsTrigger>
          <TabsTrigger value="thursday" className="flex-1">
            {t("common.thursday")}
          </TabsTrigger>
          <TabsTrigger value="friday" className="flex-1">
            {t("common.friday")}
          </TabsTrigger>
          <TabsTrigger value="saturday" className="flex-1">
            {t("common.saturday")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="wednesday">
          <AccomodationRoomTable day="wednesday" />
        </TabsContent>
        <TabsContent value="thursday">
          <AccomodationRoomTable day="thursday" />
        </TabsContent>
        <TabsContent value="friday">
          <AccomodationRoomTable day="friday" />
        </TabsContent>
        <TabsContent value="saturday">
          <AccomodationRoomTable day="saturday" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
