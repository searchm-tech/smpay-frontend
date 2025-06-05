/**
 * 브랜드 색상 팔레트
 * 디자인 시스템에서 정의된 메인, 그레이, 서브 색상을 관리합니다.
 */

// Main Colors
export const MAIN_COLORS = {
  ORANGE: {
    DEFAULT: "#EB680E",
    RGB: "235, 104, 14",
    HEX: "#EB680E",
  },
  ORANGE_LIGHT: {
    DEFAULT: "#FFB380",
    RGB: "255, 179, 128",
    HEX: "#FFB380",
  },
} as const;

// Gray Scale
export const GRAY_COLORS = {
  BLACK: {
    DEFAULT: "#000000",
    RGB: "0, 0, 0",
    HEX: "#000000",
  },
  GRAY_800: {
    DEFAULT: "#8D8D8D",
    RGB: "141, 141, 141",
    HEX: "#8D8D8D",
  },
  GRAY_300: {
    DEFAULT: "#D2D2D2",
    RGB: "210, 210, 210",
    HEX: "#D2D2D2",
  },
} as const;

// Sub Colors
export const SUB_COLORS = {
  RED: {
    DEFAULT: "#C92121",
    RGB: "201, 33, 33",
    HEX: "#C92121",
  },
  BLUE: {
    DEFAULT: "#2177C9",
    RGB: "33, 119, 201",
    HEX: "#2177C9",
  },
  GREEN: {
    DEFAULT: "#0CA635",
    RGB: "12, 166, 53",
    HEX: "#0CA635",
  },
} as const;

// 통합 색상 팔레트
export const BRAND_COLORS = {
  MAIN: MAIN_COLORS,
  GRAY: GRAY_COLORS,
  SUB: SUB_COLORS,
} as const;

// Tailwind CSS 클래스명 매핑
export const TAILWIND_COLOR_CLASSES = {
  // 브랜드 오렌지
  BRAND_ORANGE: "bg-brand-orange text-white",
  BRAND_ORANGE_LIGHT: "bg-brand-orange-light text-gray-800",

  // 서브 컬러
  BRAND_RED: "bg-brand-red text-white",
  BRAND_BLUE: "bg-brand-blue text-white",
  BRAND_GREEN: "bg-brand-green text-white",

  // 그레이 스케일
  NEUTRAL_BLACK: "bg-neutral-black text-white",
  NEUTRAL_800: "bg-neutral-800 text-white",
  NEUTRAL_300: "bg-neutral-300 text-gray-800",
} as const;

// 색상 유틸리티 함수
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // HEX 색상을 rgba로 변환
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// 색상 타입 정의
export type MainColorKey = keyof typeof MAIN_COLORS;
export type GrayColorKey = keyof typeof GRAY_COLORS;
export type SubColorKey = keyof typeof SUB_COLORS;
export type BrandColorKey = keyof typeof BRAND_COLORS;
