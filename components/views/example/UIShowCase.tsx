"use client";

import React, { Fragment, useState } from "react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BRAND_COLORS, TAILWIND_COLOR_CLASSES } from "@/constants/colors"; // TODO : 사용할 지 안하는지 확인 후 제거
import { getColorClasses, getStatusColor, cn } from "@/lib/color-utils"; // TODO : 사용할 지 안하는지 확인 후 제거
import { Input } from "@/components/ui/input";
import Select from "@/components/composite/select-components";
import { SearchInput } from "@/components/composite/input-components";
import { CalendarPopover } from "@/components/ui/calendar";
import { ConfirmDialog, Modal } from "@/components/composite/modal-components";

const UIShowCase = () => {
  const [searchValue, setSearchValue] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [isOpenNormalModal, setIsOpenNormalModal] = useState(false);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [isOpenConfirmDialogOnlyConfirm, setIsOpenConfirmDialogOnlyConfirm] =
    useState(false);

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
          <Input className="w-[250px]" value="일반 input" />
          <Input className="w-[250px]" value="비활성화 input" disabled />
          <Input className="w-[250px]" value="에러 input (미작업)" />
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
    </div>
  );
};

export default UIShowCase;
