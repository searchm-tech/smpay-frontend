import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorShowcase from "./ColorShowcase";
import ColorTest from "./ColorTest";

const ExampleView = () => {
  return (
    <div>
      <Tabs defaultValue="1">
        <TabsList>
          <TabsTrigger value="1">ColorShowcase</TabsTrigger>
          <TabsTrigger value="2">ColorTest</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <ColorShowcase />
        </TabsContent>
        <TabsContent value="2">
          <ColorTest />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExampleView;
