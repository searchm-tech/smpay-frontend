"use client";
import { useEffect, useState } from "react";

import ViewList from "./ViewList";
import ViewWrite from "./ViewWrite";

import GuidSection, { type ViewType } from "../../components/GuideSection";

// list : 등록된 광고주 목록
// create : SM Pay 신청
const SMPayApplyWriteView = () => {
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

      <ViewWrite
        onSubmit={() => {}}
        onCancel={() => setViewType("list")}
        display={viewType === "create"}
      />
    </div>
  );
};

export default SMPayApplyWriteView;

export type ViewProps = {
  onSubmit: () => void;
  onCancel: () => void;
  display: boolean;
};
