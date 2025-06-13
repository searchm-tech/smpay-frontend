export interface TransactionData {
  id: string;
  key: string;
  agency: string;
  group: string;
  advertiser: string;
  date: string;
  txId: string;
  txType: string;
  bank: string;
  account: string;
  depositor: string;
  amount: number;
  diffAmount: number;
  diffRate: number;
  repaymentStatus: "success" | "failed";
  repaymentDate: string | null;
}

export const MOCK_DATA: TransactionData[] = Array.from(
  { length: 30 },
  (_, i) => ({
    id: (i + 1).toString(), // Add this line
    key: (i + 1).toString(),
    agency: "대행사명",
    group: "그룹원명",
    advertiser: `광고주명${Math.floor(i / 5) + 1}`,
    date: "2025-03-19 00:35:02",
    txId: "12345678",
    txType: i % 2 === 0 ? "충전" : "회수",
    bank: "우리은행",
    account: "1002-02-123456",
    depositor: "주식회사 써치엠",
    amount: 100000,
    diffAmount: i % 2 === 0 ? 10000 : -5000,
    diffRate: i % 2 === 0 ? 10 : -5,
    diffDate: "2025-03-19 00:35:02",
    repaymentStatus: i % 2 === 0 ? "success" : "failed",
    repaymentDate: i % 2 === 0 ? "2025-03-19 00:35:02" : null,
  })
);

export interface ChargeData {
  manager: string;
  customer: string;
  advertiser: string;
  date: string;
  dealNo: string;
  dealType: string;
  bank: string;
  accountNumber: string;
}

// 테이블 컬럼 타입
export interface ChargeTableRow {
  id: number; // 고유 ID
  manager: string; // 담당자
  customerId: string; // CUSTOMER ID
  advertiser: string; // 광고주
  date: string; // 거래일자
  dealNo: string; // 거래번호
  dealType: string; // 거래유형
  bank: string; // 은행
  accountNumber: string; // 계좌번호
  accountHolder: string; // 예금주
  amount: number; // 금액
  prevAmount: number; // 이전대비 변화액
  prevRate: number; // 이전대비 변화율
  statusDate: string; // 상황일
  situation: string; // 상황여부
}

// 목데이터 30개
export const chargeTableMockData: ChargeTableRow[] = [
  // 홍길동 4개
  {
    id: 1,
    manager: "홍길동",
    customerId: "CUST0001",
    advertiser: "광고주A",
    date: "2024-03-01 10:00:00",
    dealNo: "T20240301001",
    dealType: "충전",
    bank: "국민은행",
    accountNumber: "123-45-67890",
    accountHolder: "홍길동",
    amount: 1000000,
    prevAmount: 50000,
    prevRate: 5.2,
    statusDate: "2024-03-01",
    situation: "정상",
  },
  {
    id: 2,
    manager: "홍길동",
    customerId: "CUST0002",
    advertiser: "광고주B",
    date: "2024-03-01 10:10:00",
    dealNo: "T20240301002",
    dealType: "환불",
    bank: "신한은행",
    accountNumber: "234-56-78901",
    accountHolder: "홍길동",
    amount: 900000,
    prevAmount: -20000,
    prevRate: -2.2,
    statusDate: "2024-03-01",
    situation: "정상",
  },
  {
    id: 3,
    manager: "홍길동",
    customerId: "CUST0003",
    advertiser: "광고주C",
    date: "2024-03-01 10:20:00",
    dealNo: "T20240301003",
    dealType: "충전",
    bank: "우리은행",
    accountNumber: "345-67-89012",
    accountHolder: "홍길동",
    amount: 800000,
    prevAmount: 30000,
    prevRate: 3.8,
    statusDate: "2024-03-01",
    situation: "정상",
  },
  {
    id: 4,
    manager: "홍길동",
    customerId: "CUST0004",
    advertiser: "광고주D",
    date: "2024-03-01 10:30:00",
    dealNo: "T20240301004",
    dealType: "환불",
    bank: "하나은행",
    accountNumber: "456-78-90123",
    accountHolder: "홍길동",
    amount: 700000,
    prevAmount: -10000,
    prevRate: -1.4,
    statusDate: "2024-03-01",
    situation: "정상",
  },
  // 이영희 3개
  {
    id: 5,
    manager: "이영희",
    customerId: "CUST0005",
    advertiser: "광고주E",
    date: "2024-03-01 11:00:00",
    dealNo: "T20240301005",
    dealType: "충전",
    bank: "농협",
    accountNumber: "567-89-01234",
    accountHolder: "이영희",
    amount: 1200000,
    prevAmount: 60000,
    prevRate: 5.3,
    statusDate: "2024-03-01",
    situation: "정상",
  },
  {
    id: 6,
    manager: "이영희",
    customerId: "CUST0006",
    advertiser: "광고주F",
    date: "2024-03-01 11:10:00",
    dealNo: "T20240301006",
    dealType: "환불",
    bank: "기업은행",
    accountNumber: "678-90-12345",
    accountHolder: "이영희",
    amount: 300000,
    prevAmount: -15000,
    prevRate: -4.7,
    statusDate: "2024-03-01",
    situation: "정상",
  },
  {
    id: 7,
    manager: "이영희",
    customerId: "CUST0007",
    advertiser: "광고주G",
    date: "2024-03-01 11:20:00",
    dealNo: "T20240301007",
    dealType: "충전",
    bank: "국민은행",
    accountNumber: "789-01-23456",
    accountHolder: "이영희",
    amount: 950000,
    prevAmount: 40000,
    prevRate: 4.4,
    statusDate: "2024-03-01",
    situation: "실패",
  },
  // 김철수 3개
  {
    id: 8,
    manager: "김철수",
    customerId: "CUST0008",
    advertiser: "광고주H",
    date: "2024-03-01 11:30:00",
    dealNo: "T20240301008",
    dealType: "환불",
    bank: "신한은행",
    accountNumber: "890-12-34567",
    accountHolder: "김철수",
    amount: 400000,
    prevAmount: -12000,
    prevRate: -2.9,
    statusDate: "2024-03-01",
    situation: "미회수",
  },
  {
    id: 9,
    manager: "김철수",
    customerId: "CUST0009",
    advertiser: "광고주I",
    date: "2024-03-01 11:40:00",
    dealNo: "T20240301009",
    dealType: "충전",
    bank: "우리은행",
    accountNumber: "901-23-45678",
    accountHolder: "김철수",
    amount: 1100000,
    prevAmount: 55000,
    prevRate: 5.0,
    statusDate: "2024-03-01",
    situation: "정상",
  },
  {
    id: 10,
    manager: "김철수",
    customerId: "CUST0010",
    advertiser: "광고주J",
    date: "2024-03-01 11:50:00",
    dealNo: "T20240301010",
    dealType: "환불",
    bank: "하나은행",
    accountNumber: "012-34-56789",
    accountHolder: "김철수",
    amount: 600000,
    prevAmount: -25000,
    prevRate: -4.0,
    statusDate: "2024-03-01",
    situation: "정상",
  },
  // ... (이하 기존 데이터도 같은 방식으로 manager별 연속 배치)
];

export function calcRowSpan<T>(data: T[], key: keyof T): number[] {
  const rowSpanArr = Array(data.length).fill(1);
  let prevValue: any = null;
  let startIdx = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i][key] !== prevValue) {
      if (i - startIdx > 1) {
        rowSpanArr[startIdx] = i - startIdx;
        for (let j = startIdx + 1; j < i; j++) {
          rowSpanArr[j] = 0;
        }
      }
      prevValue = data[i][key];
      startIdx = i;
    }
  }
  if (data.length - startIdx > 1) {
    rowSpanArr[startIdx] = data.length - startIdx;
    for (let j = startIdx + 1; j < data.length; j++) {
      rowSpanArr[j] = 0;
    }
  }
  return rowSpanArr;
}
