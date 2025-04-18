"use client";
import { useEffect, useState } from "react";

import ViewList from "./ViewList";
import ViewCreate from "./ViewCreate";

import GuidSection, { type ViewType } from "../../components/GuideSection";

const SMPayApplyAdvertisersView = () => {
  const [viewType, setViewType] = useState<ViewType>("list");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [viewType]);

  return (
    <div>
      <GuidSection viewType={viewType} />
      <ViewList
        onSubmit={() => setViewType("create")}
        onCancel={() => {}}
        display={viewType === "list"}
      />

      <ViewCreate
        onSubmit={() => {}}
        onCancel={() => setViewType("list")}
        display={viewType === "create"}
      />
    </div>
  );
};

export default SMPayApplyAdvertisersView;

export type ViewProps = {
  onSubmit: () => void;
  onCancel: () => void;
  display: boolean;
};
