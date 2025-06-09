// components/modals/SmPayGuideModal.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface SmPayGuideModalProps {
  onClose: () => void;
}

const processSteps = [
  {
    label: "대행사",
    color: "bg-[#4CD964]",
    items: ["선결제 충전 규칙 설정", "SM Pay 신청서 작성"],
  },
  {
    label: "광고주",
    color: "bg-[#4A90E2]",
    items: ["출금 정보 작성 및 인증", "정보 활용 동의"],
  },
  {
    label: "대행사",
    color: "bg-[#4CD964]",
    items: ["신청서 제출"],
  },
  {
    label: "SM Pay",
    color: "bg-[#F5A623]",
    items: ["광고주 심사"],
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

      <div className="relative bg-white rounded-lg min-w-[800px] max-h-[95vh] overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-12">
            SM Pay - 온라인 광고 결제 솔루션
          </h2>

          <br />

          <div className="space-y-8">
            <div className="space-y-2">
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
                광고비 선충전은 하루 1회 이루어지며, 설정 후 익일부터 선결제가
                진행됩니다.
                <br />
                단, 광고주 매출계좌의 잔액 부족으로 3회 이상 최수 실패 시
                선결제는 일시중지됩니다.
              </p>
            </div>

            <div className="flex justify-center">
              <Badge>SM Pay 신청 프로세스</Badge>
            </div>

            <div className="flex justify-between items-start px-4 mt-8">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 relative"
                >
                  <div className="w-[120px] h-[120px] rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                    img
                  </div>
                  <div
                    className={`px-6 py-1 rounded-full text-white ${step.color}`}
                  >
                    {step.label}
                  </div>
                  <div className="text-sm text-center space-y-1">
                    {step.items.map((item, i) => (
                      <p key={i} className="text-gray-600">
                        {item}
                      </p>
                    ))}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="absolute -right-8 top-14 text-gray-300">
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
                </div>
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

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center text-white font-medium rounded-[20px] bg-[#545F71] w-[180px] h-[40px]">
      {children}
    </div>
  );
};
