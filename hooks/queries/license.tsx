import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  deleteAgentsUserLicense,
  postAgentsUserLicense,
} from "@/services/license";

import type {
  TRequestLicenseCreate,
  TRequestLicenseDelete,
} from "@/types/api/license";

// 마케터 API 라이선스 등록 + 수정 (SAG008) mutate
export const useMuateCreateLicense = (
  options?: UseMutationOptions<null, Error, TRequestLicenseCreate>
) => {
  return useMutation<null, Error, TRequestLicenseCreate>({
    mutationFn: (data: TRequestLicenseCreate) => postAgentsUserLicense(data),
    ...options,
  });
};

// 마케터 API 라이선스 삭제 (SAG011) mutate
export const useMuateDeleteLicense = (
  options?: UseMutationOptions<null, Error, TRequestLicenseDelete>
) => {
  return useMutation<null, Error, TRequestLicenseDelete>({
    mutationFn: (data: TRequestLicenseDelete) => deleteAgentsUserLicense(data),
    ...options,
  });
};
