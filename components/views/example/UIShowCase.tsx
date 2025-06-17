"use client";

import React, { Fragment, useState } from "react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Table from "@/components/composite/table";
import Select from "@/components/composite/select-components";
import { SearchInput } from "@/components/composite/input-components";
import { CalendarPopover } from "@/components/ui/calendar";
import { ConfirmDialog, Modal } from "@/components/composite/modal-components";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// import { BRAND_COLORS, TAILWIND_COLOR_CLASSES } from "@/constants/colors"; // TODO : 사용할 지 안하는지 확인 후 제거
// import { getColorClasses, getStatusColor, cn } from "@/lib/color-utils"; // TODO : 사용할 지 안하는지 확인 후 제거

import type { TableProps } from "antd";

const UIShowCase = () => {
  const [searchValue, setSearchValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [isOpenNormalModal, setIsOpenNormalModal] = useState(false);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isOpenConfirmDialogOnlyConfirm, setIsOpenConfirmDialogOnlyConfirm] =
    useState(false);

  const [tableParams, setTableParams] = useState({
    pageSize: 10,
    current: 1,
    total: dataSource.length,
  });

  const columns: TableProps<TestType>["columns"] = [
    {
      title: "CUSTOMER ID",
      dataIndex: "customerId",
      align: "center",
      sorter: (a, b) => a.customerId.localeCompare(b.customerId),
    },
    {
      title: "로그인 ID",
      dataIndex: "loginId",
      align: "center",
      sorter: (a, b) => a.loginId.localeCompare(b.loginId),
    },
    {
      title: "광고주명",
      dataIndex: "advertiserName",
      align: "center",
      sorter: (a, b) => a.advertiserName.localeCompare(b.advertiserName),
    },
    {
      title: "최종 수정 일시",
      dataIndex: "updatedAt",
      align: "center",
      sorter: (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">UI 컴포넌트</h1>
        <p className="text-gray-600">버튼, 스위치, 인풋 ... 등</p>
      </div>

      {/* 버튼 하는 곳 */}
      <Card>
        <CardHeader>
          <CardTitle>버튼</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button className="w-[250px]">일반 버튼</Button>
          <Button className="w-[250px]" variant="outline">
            outline 버튼
          </Button>
          <Button className="w-[250px]" variant="brandOutline">
            brandOutline 라인 버튼
          </Button>
        </CardContent>
      </Card>

      {/* Input  */}
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input className="w-[250px]" placeholder="일반 input" />
          <Input className="w-[250px]" placeholder="비활성화 input" disabled />
          <Input className="w-[250px]" placeholder="에러 input (미작업)" />
        </CardContent>
      </Card>

      {/* Search Input */}
      <Card>
        <CardHeader>
          <CardTitle>Search Input</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <SearchInput
            className="w-[250px]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Input</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Textarea
            className="w-[250px]"
            rows={8}
            value={textareaValue}
            onChange={(e) => setTextareaValue(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Select */}
      <Card>
        <CardHeader>
          <CardTitle>Select</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Select
            className="w-[250px]"
            options={[
              { label: "option1", value: "option1" },
              { label: "option2", value: "option2" },
            ]}
          />
        </CardContent>
      </Card>

      {/* DatePicker */}
      <Card>
        <CardHeader>
          <CardTitle>DatePicker</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <CalendarPopover
            date={date}
            onChange={(data) => {
              console.log("data", data);
              setDate(data);
            }}
            customText={
              date ? format(date, "yyyy-MM-dd") : "날짜를 선택해주세요"
            }
          />
        </CardContent>
      </Card>

      {/* Modal */}
      <Card>
        <CardHeader>
          <CardTitle>Modal</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Fragment>
            <Button onClick={() => setIsOpenNormalModal(true)}>
              일반 모달
            </Button>
            <Modal
              open={isOpenNormalModal}
              onClose={() => setIsOpenNormalModal(false)}
              title="모달 제목"
            >
              <div>
                <div>모달 내용</div>
                <div>모달 내용</div>
              </div>
            </Modal>
          </Fragment>

          <Fragment>
            <Button onClick={() => setIsOpenConfirmDialog(true)}>
              다이얼로그
            </Button>
            <ConfirmDialog
              open={isOpenConfirmDialog}
              content="다이얼로 내용"
              onConfirm={() => setIsOpenConfirmDialog(false)}
              onClose={() => setIsOpenConfirmDialog(false)}
            />
          </Fragment>

          <Fragment>
            <Button onClick={() => setIsOpenConfirmDialogOnlyConfirm(true)}>
              확인만 있는 다이얼로그 [cancelDisabled]
            </Button>
            <ConfirmDialog
              open={isOpenConfirmDialogOnlyConfirm}
              content="확인만 있는 다이얼로그 내용"
              onConfirm={() => setIsOpenConfirmDialogOnlyConfirm(false)}
              cancelDisabled
            />
          </Fragment>
        </CardContent>
      </Card>

      {/* Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Control</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-28">
          <div className="flex items-center gap-2">
            <span>Switch</span>
            <Switch />
            <Switch checked={true} />
          </div>

          <div className="flex items-center gap-2">
            <span>Checkbox</span>
            <Checkbox />
            <Checkbox checked={true} />
          </div>

          <div className="flex items-center gap-2">
            <span>Radio</span>
            <RadioGroup value="1" className="flex items-center gap-2">
              <RadioGroupItem value="1" />
              <RadioGroupItem value="2" />
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Table (Antd UI)</CardTitle>
        </CardHeader>
        <CardContent className="px-4 w-full">
          <Table<TestType>
            dataSource={dataSource}
            columns={columns}
            pagination={{
              pageSize: tableParams.pageSize,
              current: tableParams.current,
              total: tableParams.total,
            }}
            onChange={(pagination) => {
              setTableParams({
                ...tableParams,
                ...pagination,
              });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UIShowCase;

const dataSource: TestType[] = Array.from({
  length: 100,
}).map((_, i) => ({
  id: i + 1,
  name: `광고주 ${i + 1}`,
  customerId: `CUST_${(i + 1).toString().padStart(5, "0")}`,
  loginId: `user_${(i + 1).toString().padStart(3, "0")}`,
  advertiserName: `광고주 ${i + 1}`,
  updatedAt: new Date().toISOString().slice(0, 10),
  businessName: `사업자명 ${i + 1}`,
  businessNumber: `${(123 + i).toString().padStart(3, "0")}-${(88 + i)
    .toString()
    .padStart(2, "0")}-${(12345 + i).toString().padStart(5, "0")}`,
  businessOwnerName: `대표자${i + 1}`,
  businessOwnerPhone: `010-${Math.floor(1000 + i)
    .toString()
    .padStart(4, "0")}-${Math.floor(1000 + i * 2)
    .toString()
    .padStart(4, "0")}`,
  businessOwnerEmail: `owner${i + 1}@business${i + 1}.com`,
}));

export interface TestType {
  id: number;
  name: string;
  customerId: string;
  loginId: string;
  advertiserName: string;
  updatedAt: string;
  businessName: string;
  businessNumber: string;
  businessOwnerName: string;
  businessOwnerPhone: string;
  businessOwnerEmail: string;
}
