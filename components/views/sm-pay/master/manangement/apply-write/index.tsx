"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ViewList from "./ViewList";
import ViewWrite from "./ViewWrite";

import GuidSection, { type ViewType } from "../../../components/GuideSection";

const SMPayMasterApplyWriteView = () => {
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

      {viewType === "guide" && (
        <ViewList
          onSubmit={(value: number) => {
            setSelectedAdNum(value);
            setViewType("write");
          }}
          onCancel={() => router.push("/sm-pay/master/management")}
        />
      )}

      {viewType === "write" && (
        <ViewWrite
          onSubmit={() => setViewType("guide")}
          onCancel={() => setViewType("guide")}
          selectedAdNum={selectedAdNum}
        />
      )}
    </div>
  );
};

export default SMPayMasterApplyWriteView;

export type ViewProps = {
  onCancel: () => void;
};
