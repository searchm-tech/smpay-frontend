// components/modals/SmPayGuideModal.tsx
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface SmPayGuideModalProps {
  onClose: () => void;
}

const processSteps = [
  {
    label: '대행사',
    color: 'bg-green-500',
    items: ['선결제 충전 규칙 설정', 'SM Pay 신청서 작성'],
  },
  {
    label: '광고주',
    color: 'bg-blue-500',
    items: ['출금 정보 작성 및 인증', '정보 활용 동의'],
  },
  {
    label: '대행사',
    color: 'bg-green-500',
    items: ['신청서 제출'],
  },
  {
    label: 'SM Pay',
    color: 'bg-orange-500',
    items: ['광고주 심사'],
  },
];

const SmPayGuideModal = ({ onClose }: SmPayGuideModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white min-w-[800px] max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-center">SM Pay - 온라인 광고 결제 솔루션</h2>
        </div>

        <div className="px-6 py-3 space-y-6">
          <p className="text-gray-700">
            SM PAY는 광고비 선결제 서비스로, SM PAY가 광고비를 선결제하여 광고를 집행하고, 후불로
            자동 납부되는 서비스입니다.
          </p>
          <p className="text-gray-700">
            광고주는 추가 비용 부담 없이 매출 증대 효과를 기대할 수 있으며,
            <br />
            대행사는 더욱 다양한 전략을 활용해 광고 성과를 극대화하고 취급 광고액을 확장할 수
            있습니다.
          </p>

          {/* SM Pay 이용 가이드 버튼 */}
          <Badge>SM Pay 이용 가이드</Badge>

          {/* ROAS 설명 */}
          <p className="text-gray-700">
            담당자는 광고주의 광고 성과를 분석하여 자동 선결제의 기준 ROAS와 충전 금액을 설정할 수
            있습니다.
            <br />
            SM Pay 신청시 작성하신 기준 ROAS에 도달하면 광고비를 충전하고, 기준 ROAS에서 떨어지면
            검색하여 효율적인 예산 운영이 가능합니다.
          </p>

          <p className="text-gray-700">
            광고비 선충전은 하루 1회 이루어지며, 설정 후 익일부터 선결제가 진행됩니다.
            <br />
            단, 광고주 매출계좌의 잔액 부족으로 3회 이상 최수 실패 시 선결제는 일시중지됩니다.
          </p>

          {/* SM Pay 신청 프로세스 버튼 */}
          <Badge>SM Pay 신청 프로세스</Badge>

          {/* 프로세스 단계 */}
          <div className="flex justify-between items-start mt-8 px-4">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-4 relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <span>img</span>
                </div>
                <div className={`px-4 py-1 rounded-full text-white ${step.color}`}>
                  {step.label}
                </div>
                <ul className="text-sm text-center space-y-1">
                  {step.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                {index < processSteps.length - 1 && (
                  <svg
                    className="absolute -right-8 top-12 w-6 h-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-[#9BA5B7]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer">
              <Checkbox className="bg-white" />
              <span className="text-sm text-[#363C45]">다시 보지 않기</span>
            </div>
            <div className="space-x-2">
              <Button className="w-[150px]" onClick={onClose}>
                확인
              </Button>

              <Button className="w-[150px]" onClick={onClose} variant="cancel">
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
    <div className="flex justify-center items-center text-white font-medium mx-auto rounded-[20px] bg-[#545F71] w-[180px] h-[40px]">
      {children}
    </div>
  );
};
