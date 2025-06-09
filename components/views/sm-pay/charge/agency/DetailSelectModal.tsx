// components/views/sm-pay/charge/agency/FilterSection.tsx
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  type ModalProps,
  Modal,
} from "@/components/composite/modal-components";

const DetailSelectModal = ({
  open = false,
  onClose,
  onConfirm,
}: ModalProps) => {
  // 각 섹션의 검색어 상태
  const [agencySearch, setAgencySearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [advertiserSearch, setAdvertiserSearch] = useState("");

  // 목데이터 (실제 데이터로 교체 필요)
  const agencyOptions = ["부서 1", "부서 2", "부서 3", "부서 4", "부서 5"];
  const groupOptions = [
    "그룹원 1",
    "그룹원 2",
    "그룹원 3",
    "그룹원 4",
    "그룹원 5",
  ];
  const advertiserOptions = [
    "광고주 1",
    "광고주 2",
    "광고주 3",
    "광고주 4",
    "광고주 5",
  ];

  return (
    <Modal
      title="광고주 세부선택"
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <div className="bg-white rounded-lg">
        <div className="flex gap-6">
          {/* 부서 선택 */}
          <div className="flex-1">
            <div className="mb-4">
              <Input
                placeholder="부서를 선택하세요."
                value={agencySearch}
                onChange={(e) => setAgencySearch(e.target.value)}
                className="mb-2"
              />
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {agencyOptions.map((option) => (
                  <div key={option} className="flex items-center gap-4">
                    <Checkbox>{option}</Checkbox>
                    <span className="text-sm text-gray-500">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 그룹원 선택 */}
          <div className="flex-1">
            <div className="mb-4">
              <Input
                placeholder="그룹원을 선택하세요."
                value={groupSearch}
                onChange={(e) => setGroupSearch(e.target.value)}
                className="mb-2"
              />
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {groupOptions.map((option) => (
                  <div key={option} className="flex items-center gap-4">
                    <Checkbox>{option}</Checkbox>
                    <span className="text-sm text-gray-500">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 광고주 선택 */}
          <div className="flex-1">
            <div className="mb-4">
              <Input
                placeholder="광고주를 선택하세요."
                value={advertiserSearch}
                onChange={(e) => setAdvertiserSearch(e.target.value)}
                className="mb-2"
              />
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {advertiserOptions.map((option) => (
                  <div key={option} className="flex items-center gap-4">
                    <Checkbox>{option}</Checkbox>
                    <span className="text-sm text-gray-500">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailSelectModal;
