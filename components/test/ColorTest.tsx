import React from "react";
import { Button } from "@/components/ui/button";

const ColorTest = () => {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">색상 테스트</h1>

      {/* Primary Button 테스트 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          Primary Button (기본 브랜드 오렌지)
        </h2>
        <Button>기본 버튼</Button>
        <p className="text-sm text-gray-600">
          배경: #EB680E, 텍스트: 흰색이어야 함
        </p>
      </div>

      {/* 커스텀 브랜드 색상 테스트 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">브랜드 색상 테스트</h2>
        <div className="flex gap-2">
          <div className="bg-brand-orange text-white px-4 py-2 rounded">
            Orange #EB680E
          </div>
          <div className="bg-brand-orange-light text-black px-4 py-2 rounded">
            Orange Light #FFB380
          </div>
        </div>
      </div>

      {/* Sub 색상 테스트 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Sub 색상 테스트</h2>
        <div className="flex gap-2">
          <div className="bg-brand-red text-white px-4 py-2 rounded">
            Red #C92121
          </div>
          <div className="bg-brand-blue text-white px-4 py-2 rounded">
            Blue #2177C9
          </div>
          <div className="bg-brand-green text-white px-4 py-2 rounded">
            Green #0CA635
          </div>
        </div>
      </div>

      {/* Gray 스케일 테스트 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Gray 스케일 테스트</h2>
        <div className="flex gap-2">
          <div className="bg-neutral-black text-white px-4 py-2 rounded">
            Black #000000
          </div>
          <div className="bg-neutral-800 text-white px-4 py-2 rounded">
            Gray 800 #8D8D8D
          </div>
          <div className="bg-neutral-300 text-black px-4 py-2 rounded">
            Gray 300 #D2D2D2
          </div>
        </div>
      </div>

      {/* CSS 변수 직접 테스트 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">CSS 변수 직접 사용</h2>
        <div
          className="px-4 py-2 rounded text-white"
          style={{ backgroundColor: "hsl(var(--brand-orange))" }}
        >
          CSS 변수로 오렌지 배경
        </div>
      </div>

      {/* 접근성 체크용 */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">접근성 확인</h2>
        <div className="bg-brand-orange text-white px-4 py-2 rounded">
          오렌지 배경 + 흰색 텍스트 (대비율 확인)
        </div>
        <div className="bg-white text-brand-orange border border-brand-orange px-4 py-2 rounded">
          흰색 배경 + 오렌지 텍스트
        </div>
      </div>
    </div>
  );
};

export default ColorTest;
