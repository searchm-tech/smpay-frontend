export type TAgency = {
  agentId: number;
  name: string;
  uniqueCode: string;
  representativeName: string;
  businessRegistrationNumber: string;
  status: "NORMAL" | "STOP"; // NORMAL : 활성화 STOP : 비활성화  - member와 동일
  domainName: string;
};
