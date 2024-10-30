import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useI18n } from "locales/client";
import AccomodationCategoryTable from "./accomodationCategoryTable";

export default function AccomodationCategories() {
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
        <AccomodationCategoryTable day="wednesday" />
      </TabsContent>
      <TabsContent value="thursday">
        <AccomodationCategoryTable day="thursday" />
      </TabsContent>
      <TabsContent value="friday">
        <AccomodationCategoryTable day="friday" />
      </TabsContent>
      <TabsContent value="saturday">
        <AccomodationCategoryTable day="saturday" />
      </TabsContent>
    </Tabs>
  );
}
