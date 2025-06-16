import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorShowcase from "./ColorShowcase";
import ColorTest from "./ColorTest";
import UIShowCase from "./UIShowCase";

const ExampleView = () => {
  return (
    <div>
      <Tabs defaultValue="1">
        <TabsList>
          <TabsTrigger value="1">UIShowCase</TabsTrigger>
          <TabsTrigger value="2">ColorShowcase</TabsTrigger>
          <TabsTrigger value="3">ColorTest</TabsTrigger>
        </TabsList>
        <TabsContent value="1">
          <UIShowCase />
        </TabsContent>
        <TabsContent value="2">
          <ColorShowcase />
        </TabsContent>
        <TabsContent value="3">
          <ColorTest />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExampleView;
