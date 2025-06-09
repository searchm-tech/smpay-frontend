import { BRAND_COLORS, TAILWIND_COLOR_CLASSES } from "@/constants/colors";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 조합하고 병합하는 유틸리티 함수
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 색상 타입 정의
 */
export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";
export type ColorSize = "sm" | "md" | "lg";

/**
 * 브랜드 색상 매핑
 */
const COLOR_VARIANT_MAP: Record<ColorVariant, string> = {
  primary: BRAND_COLORS.MAIN.ORANGE.DEFAULT,
  secondary: BRAND_COLORS.GRAY.GRAY_800.DEFAULT,
  success: BRAND_COLORS.SUB.GREEN.DEFAULT,
  warning: BRAND_COLORS.MAIN.ORANGE_LIGHT.DEFAULT,
  danger: BRAND_COLORS.SUB.RED.DEFAULT,
  info: BRAND_COLORS.SUB.BLUE.DEFAULT,
};

/**
 * 색상 변형에 따른 Tailwind 클래스 반환
 */
export const getColorClasses = (
  variant: ColorVariant,
  type: "background" | "text" | "border" = "background"
): string => {
  const colorMap = {
    primary: {
      background: "bg-brand-orange hover:bg-brand-orange/90",
      text: "text-brand-orange",
      border: "border-brand-orange",
    },
    secondary: {
      background: "bg-neutral-800 hover:bg-neutral-800/90",
      text: "text-neutral-800",
      border: "border-neutral-800",
    },
    success: {
      background: "bg-brand-green hover:bg-brand-green/90",
      text: "text-brand-green",
      border: "border-brand-green",
    },
    warning: {
      background: "bg-brand-orange-light hover:bg-brand-orange-light/90",
      text: "text-brand-orange-light",
      border: "border-brand-orange-light",
    },
    danger: {
      background: "bg-brand-red hover:bg-brand-red/90",
      text: "text-brand-red",
      border: "border-brand-red",
    },
    info: {
      background: "bg-brand-blue hover:bg-brand-blue/90",
      text: "text-brand-blue",
      border: "border-brand-blue",
    },
  };

  return colorMap[variant][type];
};

/**
 * 상태에 따른 색상 클래스 반환
 */
export const getStatusColor = (
  status: "active" | "inactive" | "pending" | "completed" | "error"
): string => {
  const statusColorMap = {
    active: "bg-brand-green text-white",
    inactive: "bg-neutral-300 text-neutral-800",
    pending: "bg-brand-orange-light text-white",
    completed: "bg-brand-blue text-white",
    error: "bg-brand-red text-white",
  };

  return statusColorMap[status];
};

/**
 * HEX 색상을 RGB로 변환
 */
export const hexToRgb = (
  hex: string
): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * RGB 색상을 HEX로 변환
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
};

/**
 * 색상의 밝기 계산 (0-255)
 */
export const getBrightness = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  // 인간의 눈이 인지하는 밝기 계산 공식
  return Math.round(rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114);
};

/**
 * 색상이 어두운지 밝은지 판단
 */
export const isDarkColor = (hex: string): boolean => {
  return getBrightness(hex) < 128;
};

/**
 * 색상에 따른 텍스트 색상 반환
 */
export const getContrastTextColor = (
  backgroundColor: string
): "text-white" | "text-black" => {
  return isDarkColor(backgroundColor) ? "text-white" : "text-black";
};

/**
 * 색상 팔레트를 객체로 반환하는 함수
 */
export const getColorPalette = () => BRAND_COLORS;

/**
 * 사전 정의된 Tailwind 색상 클래스 반환
 */
export const getTailwindColorClasses = () => TAILWIND_COLOR_CLASSES;
