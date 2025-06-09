import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND_COLORS, TAILWIND_COLOR_CLASSES } from "@/constants/colors";
import { getColorClasses, getStatusColor, cn } from "@/lib/color-utils";

const ColorShowcase = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">색상 팔레트 시스템</h1>
        <p className="text-gray-600">
          브랜드 색상을 체계적으로 관리하는 방법을 보여주는 예시입니다.
        </p>
      </div>

      {/* 버튼 테스트 하는 곳 */}
      <Card>
        <CardHeader>
          <CardTitle>
            버튼 색상 테스트 (버튼을 코드를 작성해서 테스트 해보세요.)
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button className="w-[250px]">일반 버튼</Button>
          <Button className="w-[250px]" variant="outline">
            라인 버튼
          </Button>
          <Button className="w-[250px]" variant="brandOutline">
            브랜드 라인 버튼
          </Button>
        </CardContent>
      </Card>

      {/* Main Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Main Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="bg-brand-orange h-20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-white font-medium">Orange #EB680E</span>
                <span className="text-white font-medium">(HSL 24 88% 49%)</span>
                <span className="text-white font-medium">
                  bg-primary / bg-brand-orange
                </span>
              </div>
              <p className="text-sm text-gray-600">Primary Brand Color</p>
            </div>
            <div className="space-y-2">
              <div className="bg-brand-orange-light h-20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-gray-800 font-medium">
                  Orange Light #FFB380
                </span>

                <span className="text-gray-800 font-medium">
                  bg-brand-orange-light
                </span>
              </div>
              <p className="text-sm text-gray-600">Light Variant</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gray Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Gray Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="bg-neutral-black h-20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-white font-medium">Black #000000</span>
                <span className="text-white font-medium">bg-neutral-black</span>
              </div>
              <p className="text-sm text-gray-600">Pure Black</p>
            </div>
            <div className="space-y-2">
              <div className="bg-neutral-800 h-20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-white font-medium">Gray #8D8D8D</span>
                <span className="text-white font-medium">bg-neutral-800</span>
              </div>
              <p className="text-sm text-gray-600">Medium Gray</p>
            </div>
            <div className="space-y-2">
              <div className="bg-neutral-300 h-20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-gray-800 font-medium">
                  Light Gray #D2D2D2
                </span>
                <span className="text-gray-800 font-medium">
                  bg-neutral-300
                </span>
              </div>
              <p className="text-sm text-gray-600">Light Gray</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sub Colors */}
      <Card>
        <CardHeader>
          <CardTitle>Sub Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="bg-brand-red h-20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-white font-medium">Red #C92121</span>
                <span className="text-white font-medium">bg-brand-red</span>
              </div>
              <p className="text-sm text-gray-600">Error/Danger</p>
            </div>
            <div className="space-y-2">
              <div className="bg-brand-blue h-20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-white font-medium">Blue #2177C9</span>
                <span className="text-white font-medium">bg-brand-blue</span>
              </div>
              <p className="text-sm text-gray-600">Info/Primary</p>
            </div>
            <div className="space-y-2">
              <div className="bg-brand-green h-20 rounded-lg flex flex-col items-center justify-center">
                <span className="text-white font-medium">Green #0CA635</span>
                <span className="text-white font-medium">bg-brand-green</span>
              </div>
              <p className="text-sm text-gray-600">Success</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button getColorClasses Examples */}
      <Card>
        <CardHeader>
          <CardTitle>버튼 컴포넌트 예시 - getColorClasses(임시)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button className={getColorClasses("primary")}>
                getColorClasses primary Button
              </Button>
              <Button className={getColorClasses("success")}>
                getColorClassessuccess Button
              </Button>
              <Button className={getColorClasses("danger")}>
                getColorClasses danger Button
              </Button>
              <Button className={getColorClasses("info")}>
                getColorClasses info Button
              </Button>
              <Button className={getColorClasses("warning")}>
                getColorClasses warning Button
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button getColorClasses Examples */}
      <Card>
        <CardHeader>
          <CardTitle>버튼 컴포넌트 예시 - className(임시)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className={cn(
                  "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                )}
              >
                Outline Primary
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                )}
              >
                Outline Success
              </Button>
              <Button
                variant="outline"
                className={cn(
                  "border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                )}
              >
                Outline Danger
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Examples */}
      <Card>
        <CardHeader>
          <CardTitle>상태 배지 예시 (재작업 필요)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge label="Active" color={BRAND_COLORS.SUB.GREEN.DEFAULT} />
            <Badge
              label="Inactive"
              color={BRAND_COLORS.GRAY.GRAY_300.DEFAULT}
            />
            <Badge
              label="Pending"
              color={BRAND_COLORS.MAIN.ORANGE_LIGHT.DEFAULT}
            />
            <Badge label="Completed" color={BRAND_COLORS.SUB.BLUE.DEFAULT} />
            <Badge label="Error" color={BRAND_COLORS.SUB.RED.DEFAULT} />
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>사용 방법</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">1. Tailwind 클래스 사용</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {`<div className="bg-brand-orange text-white p-4">
  Orange Background
</div>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. 색상 상수 사용</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {`import { BRAND_COLORS } from '@/constants/colors';

<div style={{ backgroundColor: BRAND_COLORS.MAIN.ORANGE.DEFAULT }}>
  Dynamic Color
</div>`}
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. 유틸리티 함수 사용</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {`import { getColorClasses } from '@/lib/color-utils';

<Button className={getColorClasses('primary')}>
  Primary Button
</Button>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ColorShowcase;
