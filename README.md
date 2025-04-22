# SM-pay Frontend

## 기술 스택

### core

- Nextjs 14, React 18
- Typescript

### state

- React-query [-]
- Zustand

### styles & ui

- tailwinds

### ui 라이브러리

- shadcn-ui
- antd-ui(일부만 : Description, Table)

### ui 라이브러리 이슈

0. 최대한 shadcn 위주로 작업as하는게 목표. tailwinds 방식이 요새 선호하는 추세

1. Table

- antd ui table

2. Description

- shadcn은 이런 형태가 없으므로 antd 로 사용중

4. Form

- shadcn으로 Form 사용하기로 결정.

## 기획안 및 피그마

[피그마](https://www.figma.com/design/RxwP19dL9bvFhMJpZ5FzSW/SMPay-Planning?node-id=31-3468&p=f)
[정책안](https://searchm-atlab.atlassian.net/wiki/spaces/SMPay/pages/13336707/2.)

## 빌드 및 실행

### 빌드

```bash

npm run build
```

### 로컬 실행

```bash
npm run dev
```

### 운영 실행

```bash
npm run start
```

## 프로젝트 구조

```bash
root
├── app/                    # Next.js 14 app directory
│   └── layout.tsx         # 루트 레이아웃
│
├── components/            # 컴포넌트 디렉토리
│   ├── ui/               # 순수 shadcn-ui 컴포넌트
│   ├── layout/           # 전체 레이아웃 구성 컴포넌트
│   ├── composite/        # 조합형 UI (shadcn, antd 기반)
│   ├── common/           # 기타 공통 컴포넌트
│   └── views/            # 클라이언트 view 컴포넌트
│
├── lib/                  # 유틸리티 함수 및 설정
│   ├── utils.ts
│   └── constants.ts
│
├── hooks/               # 커스텀 훅
│   └── use-*.ts
│
├── store/              # Zustand 스토어
│   └── *.store.ts
│
├── types/              # TypeScript 타입 정의 - 추가 예정
    └── *.d.ts

```

## 페이지 구조

```bash

0. sign-in # 로그인 화면
1. sm-pay
   - charge # 충전 회수 관리
     ├──
   - judement # SM Pay 심사
     ├── / : # SM Pay 심사 메인 페이지(심사 요청 목록)
     ├── detail : # SM Pay 심사 요청 상세
   - management # SM Pay 관리
     ├── apply-detail : # 신청 상세
     ├── apply-submit : # 신청서 제출
     ├── apply-write : # 신청서 작성
     ├── / : # SM Pay 메인 페이지 (SM Pay 목록 페이지)
```
