"use client";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorShowcase from "./ColorShowcase";
import ColorTest from "./ColorTest";
import UIShowCase from "./UIShowCase";
import NavShowCase from "./NavShowCase";

const ExampleView = () => {
  const [value, setValue] = useState("1");
  return (
    <div>
      <Tabs value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="1">UIShowCase</TabsTrigger>
          <TabsTrigger value="2">ColorShowcase</TabsTrigger>
          <TabsTrigger value="3">ColorTest</TabsTrigger>
          <TabsTrigger value="4">NavShowCase</TabsTrigger>
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
        <TabsContent value="4">
          <div className="h-[100vh] mb-10">
            <NavShowCase onClose={() => setValue("1")} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExampleView;
