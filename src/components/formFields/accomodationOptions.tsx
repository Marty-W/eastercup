import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useI18n } from "locales/client";
import AccomodationTable from "./accomodationTable";

export default function AccomodationOptions() {
  const t = useI18n();
  return (
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
        <AccomodationTable day="wednesday" />
      </TabsContent>
      <TabsContent value="thursday">
        <AccomodationTable day="thursday" />
      </TabsContent>
      <TabsContent value="friday">
        <AccomodationTable day="friday" />
      </TabsContent>
      <TabsContent value="saturday">
        <AccomodationTable day="saturday" />
      </TabsContent>
    </Tabs>
  );
}
