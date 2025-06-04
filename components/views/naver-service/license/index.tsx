import { useSession } from "next-auth/react";

import { Separator } from "@/components/ui/separator";
import { LabelBullet } from "@/components/composite/label-bullet";

import FormSection from "./FormSection";
import { CreateGuideSection } from "../GuideSection";

import type { TLicenseInfo } from "../";

type Props = {
  licenseInfo: TLicenseInfo | null;
  refetch: () => void;
};

const LicenseView = ({ licenseInfo, refetch }: Props) => {
  const { data: session } = useSession();

  return (
    <div className="p-4">
      <LabelBullet className="text-base mb-2">API 라이선스 정보</LabelBullet>

      <FormSection
        licenseInfo={licenseInfo}
        refetch={refetch}
        user={session?.user}
      />

      <Separator className="my-4 mt-12 mx-auto" variant="dotted" />
      <CreateGuideSection />
    </div>
  );
};

export default LicenseView;
