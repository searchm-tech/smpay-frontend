"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ViewList from "./ViewList";
import ViewWrite from "./ViewWrite";

import GuidSection, { type ViewType } from "../../components/GuideSection";

const SMPayApplyWriteView = () => {
  const router = useRouter();
  const [selectedAdNum, setSelectedAdNum] = useState<number | null>(null);
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
        onSubmit={(value: number) => {
          setSelectedAdNum(value);
          setViewType("write");
        }}
        onCancel={() => router.push("/sm-pay/management")}
        display={viewType === "guide"}
      />

      <ViewWrite
        onSubmit={() => setViewType("guide")}
        onCancel={() => setViewType("guide")}
        display={viewType === "write"}
        selectedAdNum={selectedAdNum}
      />
    </div>
  );
};

export default SMPayApplyWriteView;

export type ViewProps = {
  onCancel: () => void;
  display: boolean;
};
