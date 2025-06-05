# 색상 관리 시스템 가이드

이 문서는 Tailwind CSS를 사용한 색상 관리 시스템에 대한 가이드입니다.

## 📋 목차

1. [색상 팔레트 구조](#색상-팔레트-구조)
2. [사용 방법](#사용-방법)
3. [컴포넌트 적용](#컴포넌트-적용)
4. [Best Practices](#best-practices)
5. [확장 가이드](#확장-가이드)

## 🎨 색상 팔레트 구조

### Main Colors

- **Orange**: `#EB680E` (235, 104, 14) - 주요 브랜드 색상
- **Orange Light**: `#FFB380` (255, 179, 128) - 밝은 변형

### Gray Scale

- **Black**: `#000000` (0, 0, 0) - 순수 검정
- **Gray 800**: `#8D8D8D` (141, 141, 141) - 중간 회색
- **Gray 300**: `#D2D2D2` (210, 210, 210) - 밝은 회색

### Sub Colors

- **Red**: `#C92121` (201, 33, 33) - 에러/위험
- **Blue**: `#2177C9` (33, 119, 201) - 정보/기본
- **Green**: `#0CA635` (12, 166, 53) - 성공/확인

## 🚀 사용 방법

### 1. Tailwind CSS 클래스 사용

```jsx
// 배경 색상
<div className="bg-brand-orange text-white">
  Primary Background
</div>

// 텍스트 색상
<span className="text-brand-red">
  Error Text
</span>

// 보더 색상
<div className="border border-brand-blue">
  Blue Border
</div>
```

### 2. 색상 상수 사용

```jsx
import { BRAND_COLORS } from "@/constants/colors";

// 인라인 스타일
<div
  style={{
    backgroundColor: BRAND_COLORS.MAIN.ORANGE.DEFAULT,
    color: "white",
  }}
>
  Dynamic Color
</div>;

// CSS-in-JS
const styles = {
  primary: {
    backgroundColor: BRAND_COLORS.MAIN.ORANGE.DEFAULT,
  },
};
```

### 3. 유틸리티 함수 사용

```jsx
import { getColorClasses, getStatusColor } from '@/lib/color-utils';

// 색상 변형 클래스
<Button className={getColorClasses('primary')}>
  Primary Button
</Button>

// 상태 색상 클래스
<Badge className={getStatusColor('active')}>
  Active Status
</Badge>
```

## 🧩 컴포넌트 적용

### 버튼 컴포넌트

```jsx
import { getColorClasses } from '@/lib/color-utils';

const CustomButton = ({ variant = 'primary', children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded ${getColorClasses(variant)}`}
      {...props}
    >
      {children}
    </button>
  );
};

// 사용 예시
<CustomButton variant="success">Success Button</CustomButton>
<CustomButton variant="danger">Danger Button</CustomButton>
```

### 배지 컴포넌트

```jsx
import { BRAND_COLORS } from "@/constants/colors";

const StatusBadge = ({ status, children }) => {
  const colorMap = {
    active: BRAND_COLORS.SUB.GREEN.DEFAULT,
    inactive: BRAND_COLORS.GRAY.GRAY_300.DEFAULT,
    pending: BRAND_COLORS.MAIN.ORANGE_LIGHT.DEFAULT,
    error: BRAND_COLORS.SUB.RED.DEFAULT,
  };

  return (
    <span
      className="px-2 py-1 rounded text-white text-sm"
      style={{ backgroundColor: colorMap[status] }}
    >
      {children}
    </span>
  );
};
```

## ✅ Best Practices

### 1. 일관성 유지

- 동일한 의미의 색상은 항상 같은 색상을 사용
- 상태별 색상 매핑을 일관되게 적용

```jsx
// ✅ 좋은 예
const STATUS_COLORS = {
  success: 'brand-green',
  error: 'brand-red',
  warning: 'brand-orange-light',
  info: 'brand-blue'
};

// ❌ 나쁜 예 - 일관성 없음
<Button className="bg-green-500">Success</Button>
<Badge className="bg-emerald-600">Success</Badge>
```

### 2. 접근성 고려

- 색상 대비비 확인 (WCAG 2.1 AA 기준)
- 색상만으로 정보 전달 금지

```jsx
// ✅ 좋은 예 - 아이콘과 텍스트 함께 사용
<div className="bg-brand-red text-white">
  <AlertIcon /> Error: Something went wrong
</div>

// ❌ 나쁜 예 - 색상만으로 정보 전달
<div className="bg-brand-red text-white">
  Something went wrong
</div>
```

### 3. Dark Mode 대응

```jsx
// tailwind.config.ts에서 dark mode 색상 정의
colors: {
  brand: {
    orange: {
      DEFAULT: "#EB680E",
      dark: "#D45A0B", // 어두운 테마용
    }
  }
}

// 사용 시
<div className="bg-brand-orange dark:bg-brand-orange-dark">
  Content
</div>
```

### 4. 반응형 색상

```jsx
// 화면 크기에 따른 색상 변경
<div className="bg-brand-orange md:bg-brand-blue lg:bg-brand-green">
  Responsive Colors
</div>
```

## 🔧 확장 가이드

### 새로운 색상 추가

1. **색상 상수 업데이트** (`constants/colors.ts`)

```typescript
export const BRAND_COLORS = {
  MAIN: {
    // 기존 색상들...
    PURPLE: {
      DEFAULT: "#8B5CF6",
      RGB: "139, 92, 246",
      HEX: "#8B5CF6",
    },
  },
  // ...
};
```

2. **Tailwind 설정 업데이트** (`tailwind.config.ts`)

```typescript
colors: {
  brand: {
    // 기존 색상들...
    purple: "#8B5CF6",
  }
}
```

3. **유틸리티 함수 업데이트** (`lib/color-utils.ts`)

```typescript
const COLOR_VARIANT_MAP: Record<ColorVariant, string> = {
  // 기존 매핑들...
  purple: BRAND_COLORS.MAIN.PURPLE.DEFAULT,
};
```

### 색상 변형 생성

```typescript
// 자동으로 색상 변형 생성하는 함수
export const generateColorVariants = (baseColor: string) => {
  return {
    50: lighten(baseColor, 0.9),
    100: lighten(baseColor, 0.8),
    200: lighten(baseColor, 0.6),
    // ... 500이 기본 색상
    500: baseColor,
    600: darken(baseColor, 0.1),
    700: darken(baseColor, 0.2),
    800: darken(baseColor, 0.3),
    900: darken(baseColor, 0.4),
  };
};
```

## 📖 참고 자료

- [Tailwind CSS 색상 가이드](https://tailwindcss.com/docs/customizing-colors)
- [색상 접근성 가이드](https://webaim.org/articles/contrast/)
- [색상 팔레트 도구](https://coolors.co/)

## 🤝 기여하기

색상 시스템 개선에 기여하고 싶다면:

1. 새로운 색상 제안 시 사용 사례와 함께 제안
2. 접근성 테스트 결과 포함
3. 기존 색상과의 조화 고려
4. 문서 업데이트 포함

---

이 가이드는 프로젝트의 색상 관리를 체계적으로 하기 위한 것입니다.
질문이나 개선 사항이 있다면 언제든 제안해주세요!
