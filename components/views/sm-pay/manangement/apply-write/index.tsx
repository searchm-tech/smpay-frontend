"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ViewList from "./ViewList";
import ViewWrite from "./ViewWrite";

import GuidSection, { type ViewType } from "../../components/GuideSection";
const SMPayApplyWriteView = () => {
  const router = useRouter();
  const [viewType, setViewType] = useState<ViewType>("guide");

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
        onSubmit={() => setViewType("write")}
        onCancel={() => router.push("/sm-pay/management")}
        display={viewType === "guide"}
      />

      <ViewWrite
        onSubmit={() => {}}
        onCancel={() => setViewType("guide")}
        display={viewType === "write"}
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
