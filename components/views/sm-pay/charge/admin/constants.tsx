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
  repaymentStatus: 'success' | 'failed';
  repaymentDate: string | null;
}

export const MOCK_DATA: TransactionData[] = Array.from({ length: 30 }, (_, i) => ({
  id: (i + 1).toString(), // Add this line
  key: (i + 1).toString(),
  agency: '대행사명',
  group: '그룹원명',
  advertiser: `광고주명${Math.floor(i / 5) + 1}`,
  date: '2025-03-19 00:35:02',
  txId: '12345678',
  txType: i % 2 === 0 ? '충전' : '회수',
  bank: '우리은행',
  account: '1002-02-123456',
  depositor: '주식회사 써치엠',
  amount: 100000,
  diffAmount: i % 2 === 0 ? 10000 : -5000,
  diffRate: i % 2 === 0 ? 10 : -5,
  diffDate: '2025-03-19 00:35:02',
  repaymentStatus: i % 2 === 0 ? 'success' : 'failed',
  repaymentDate: i % 2 === 0 ? '2025-03-19 00:35:02' : null,
}));
