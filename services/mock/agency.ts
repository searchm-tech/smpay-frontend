// services/mock/agency.ts

import { AgencyData } from "@/services/agency";

function randomString(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function randomOwner() {
  const firstNames = [
    "홍",
    "김",
    "이",
    "박",
    "최",
    "정",
    "강",
    "조",
    "윤",
    "장",
  ];
  const lastNames = [
    "길동",
    "철수",
    "영희",
    "민수",
    "지훈",
    "수진",
    "지영",
    "현우",
    "서연",
    "도윤",
  ];
  return (
    firstNames[Math.floor(Math.random() * firstNames.length)] +
    lastNames[Math.floor(Math.random() * lastNames.length)]
  );
}

function randomDate() {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString().slice(0, 10);
}

function randomEmailDomain() {
  const domains = ["company.com", "agency.co.kr", "bizmail.net", "corp.com"];
  return domains[Math.floor(Math.random() * domains.length)];
}

function randomPhone() {
  return `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;
}

function randomEmail(name: string, domain: string) {
  return `${name.toLowerCase()}@${domain}`;
}

export const agencyData: AgencyData[] = Array.from({ length: 100 }, (_, i) => {
  const owner = randomOwner();
  const domain = randomEmailDomain();
  return {
    id: (i + 1).toString(),
    agency: `에이전시${randomString(2)}`,
    code: `AG${1000 + i}`,
    owner,
    bussiness_num: `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
    company_email_domain: domain,
    invoice_manager: randomOwner(),
    invoice_manager_contact: randomPhone(),
    invoice_manager_email: randomEmail(owner, domain),
    status: Math.random() > 0.5,
    date: randomDate(),
  };
});
