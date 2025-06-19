import type { AccountInfo, AgreementInfo } from "@/types/vertification";

export const DEFAULT_ACCOUNT_INFO: AccountInfo = {
  bank: "",
  accountNumber: "",
  accountHolder: "",
  isCertified: false,
};

export const DEFAULT_AGREEMENT_INFO: AgreementInfo = {
  agreePrivacy: false,
  agreeService: false,
};

export const TEST_BANK_OPTIONS = [
  { label: "농협", value: "088" },
  { label: "국민", value: "081" },
  { label: "농협", value: "082" },
  { label: "국민", value: "083" },
];

export const dialogContent = {
  private: (
    <div>
      <p>
        본 합의서는 주식회사 써치엠(이하 "써치엠"이라 한다)과 제휴사(이하
        "제휴사"라 한다)는 "영업대행 업무 계약서"의 내용을 확대하여, SM Pay
        솔루션(이하 "SM Pay") 이용과 이와 관련된 개인정보 수집 및 활용에 대하여
        합의합니다.
      </p>
      <br />
      <p>제1조 (본 계약과의 관계)</p>
      <p>
        본 합의서는 본 계약의 일부를 이루며, SM Pay 이용과 개인정보 처리에 관한
        사항을 규정합니다. 본 합의서에서 정하지 않은 사항은 본 계약의 조항에
        따르며, 내용이 충돌될 경우 본 합의서가 우선 적용됩니다.
      </p>
      <br />
      <p>제2조 (자동 출금 동의 및 이행)</p>
      <p>
        제휴사는 써치엠에 제휴사 명의의 은행 계좌에서 본 계약에 따라 제휴사가
        지급해야 하는 선충전 광고비를 자동 출금 방식으로 징수하는 것에
        동의합니다. 제휴사는 이에 필요한 자동 출금 동의서를 작성하여 써치엠에
        제공하고, 출금을 위한 계좌 정보를 최신 상태로 유지합니다. 써치엠은
        별도의 청구 절차 없이 본 계약에 따른 대금(예: 선충전 광고비)을 정해진
        일정에 자동 출금하며, 제휴사는 해당 계좌에 충분한 예금 잔액을 확보할
        책임이 있습니다.
      </p>
    </div>
  ),
  debit: (
    <div>
      <p>
        주식회사 써치엠(이하 "써치엠")과 제휴사(이하 "제휴사")는 아래와 같이
        광고비 자동이체 출금 서비스 이용에 동의하며, 이에 따라 제휴사의 지정
        계좌에서 자동으로 대금이 출금될 수 있도록 승인합니다.
      </p>
      <br />
      <p>1. 출금 동의 내역</p>
      <p>
        {" "}
        | 출금 목적 : 본 계약(영업대행 업무 계약서) 및 합의서에 따른 광고비 자동
        출금
      </p>
      <p>
        {" "}
        | 출금 금액 범위 : 본 SMpay 추가 합의에 따른 제휴사의 모든 지급 의무에
        해당하는 금액
      </p>
      <p> | 출금 기관 : 써치엠이 지정한 금융기관 및 결제 대행사</p>
      <br />
      <p>1. 정보 수집 항목</p>
      <p> 개인정보 수집 및 활용 동의서 제7조 (수집하는 개인정보 항목) 참조.</p>
      <p>
        본 동의서에서 정하지 않은 사항은 "SM Pay 솔루션 이용 추가 합의서 및
        개인정보 수집·활용 동의서"의 조항을 따릅니다.
      </p>
    </div>
  ),
};
