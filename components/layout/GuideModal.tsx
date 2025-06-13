import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ReactNode } from "react";

interface SmPayGuideModalProps {
  onClose: () => void;
}

const processSteps = [
  {
    label: "대행사 담당자",
    color: "bg-[#34C759]",
    title: "서비스 신청",
    items: [
      "• 광고주가 SM Pay 서비스를 이용 할 수 있도록 대행사 담당자가 신청서를 작성합니다.",
    ],
  },
  {
    label: "취상위 그룹장",
    color: "bg-[#068325]",
    title: "광고주 심사",
    items: [
      "• 신청된 내용을 바탕으로 대행사 내부에서 적합성 여부를 심사합니다.",
    ],
  },
  {
    label: "SM Pay",
    color: "bg-[#FF9500]",
    title: "운영 검토",
    items: [
      "• 대행사가 심사 결과를 기반으로 SM Pay 관리자가 내용을 확인 후 운영 여부를 최종 판단합니다.",
    ],
  },
  {
    label: "대행사 담당자",
    color: "bg-[#34C759]",
    title: "광고주 동의 요청",
    items: [
      "• 검토가 완료되면 대행사 담당자는 광고주에게 동의 및 인증을 요청합니다.",
    ],
  },
  {
    label: "광고주",
    color: "bg-[#007AFF]",
    title: "출금 정보 작성 및 전자 서명 동의",
    items: [
      "• 광고주는 아래 항목을 직접 입력 및 인증해야합니다.",
      "• 개인정보 수집 및 이용 동의",
      "• 충전 및 매출 계좌 정보 입력",
      "• ARS 본인 인증",
    ],
  },
  {
    label: "SM Pay",
    color: "bg-[#FF9500]",
    title: "운영 시작",
    items: ["• 모든 절차가 완료되면 SM Pay 서비스 운영이 시작됩니다."],
  },
];

const SmPayGuideModal = ({ onClose }: SmPayGuideModalProps) => {
  const handleDontShowToday = () => {
    const today = new Date();
    const expiryDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
      0,
      0,
      0
    ).getTime();

    localStorage.setItem("hideGuideModal", expiryDate.toString());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg max-h-[95vh] overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-12">
            SM Pay - 온라인 광고 결제 솔루션
          </h2>

          <br />

          <div className="space-y-8 text-center">
            <div className="space-y-2 font-bold">
              <p className="text-gray-700 leading-relaxed">
                SM PAY는 광고비 선결제 서비스로, SM PAY가 광고비를 선결제하여
                광고를 집행하고, 후불로 자동 납부되는 서비스입니다.
              </p>

              <br />
              <p className="text-gray-700 leading-relaxed">
                광고주는 추가 비용 부담 없이 매출 증대 효과를 기대할 수 있으며,
                <br />
                대행사는 더욱 다양한 전략을 활용해 광고 성과를 극대화하고 취급
                광고액을 확장할 수 있습니다.
              </p>
            </div>

            <div className="flex justify-center">
              <Badge>SM Pay 이용 가이드</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-gray-700 leading-relaxed">
                담당자는 광고주의 광고 성과를 분석하여 자동 선결제의 기준 ROAS와
                충전 금액을 설정할 수 있습니다.
                <br />
                SM Pay 신청시 작성하신 기준 ROAS에 도달하면 광고비를 충전하고,
                기준 ROAS에서 떨어지면 검색하여 효율적인 예산 운영이 가능합니다.
                <br />
                <br />
              </p>
              <p className="text-gray-700 leading-relaxed">
                <span className="border-b text-blue-500 border-blue-500">
                  광고비 선충전은 1일 1회
                </span>{" "}
                이루어지며,
                <span className="border-b text-blue-500 border-blue-500">
                  설정 후 익일부터 선결제가 진행
                </span>
                됩니다.
                <br />
                단, 광고주 매출계좌의 잔액 부족으로 3회 이상 최수 실패 시
                선결제는 일시중지됩니다.
              </p>
            </div>

            <div className="flex justify-center">
              <Badge>SM Pay 신청 절차</Badge>
            </div>

            <div className="flex justify-center items-start px-4 mt-8">
              {processSteps.map((step, index) => (
                <>
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 min-h-[350px]"
                  >
                    <div className="w-[100px] h-[100px] rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      img
                    </div>

                    <div
                      className={`px-6 py-1 text-white ${step.color} w-[160px] rounded-[5px] text-center`}
                    >
                      {step.label}
                    </div>

                    <div className="text-sm font-medium">• {step.title}</div>

                    <div className="text-sm text-center space-y-1 flex-1">
                      <div className="flex gap-2 text-[11px] font-normal">
                        <div className="w-[180px] text-left ">
                          {step.items.map((item, i) => (
                            <p key={i} className="text-gray-600">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < processSteps.length - 1 && (
                    <div className="flex items-center text-gray-300 mx-2 mt-16">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#9BA5B7] rounded-b-lg">
          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox className="bg-white border-gray-300" />
              <span className="text-sm text-[#363C45]">다시 보지 않기</span>
            </label>
            <div className="space-x-2">
              <Button
                className="w-[150px] bg-[#E86F52] hover:bg-[#E86F52]/90 text-white"
                onClick={onClose}
              >
                확인
              </Button>
              <Button
                className="w-[150px] bg-white text-gray-700 hover:bg-gray-50"
                onClick={handleDontShowToday}
              >
                오늘 하루 보지 않기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmPayGuideModal;

const Badge = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center text-white font-medium rounded-[20px] bg-[#545F71] w-[180px] h-[40px]">
      {children}
    </div>
  );
};
