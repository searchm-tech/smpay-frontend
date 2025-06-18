import type { TableParamsAdvertiser } from "./advertiser";

export const DEFAULT_LICENSE_INFO = {
  customerId: "",
  accessKey: "",
  secretKey: "",
};

export const dialogContent = {
  "success-create": (
    <div className="text-center">
      <p>등록이 성공적으로 완료되었습니다.</p>
      <p>광고주를 등록해주세요.</p>
    </div>
  ),

  "check-update": (
    <div className="text-center">
      <p>API 라이선스를 수정하면,</p>
      <p>이 계정에 등록된 광고주 정보가 초기화됩니다.</p>
      <br />
      <p>동기화에는 최대 1시간이 소요될 수 있습니다.</p>
      <p>계속하시겠습니까?</p>
    </div>
  ),

  "check-delete": (
    <div className="text-center">
      <p>API 라이선스를 삭제하면,</p>
      <p>이 계정에 등록된 광고주 정보가 초기화됩니다.</p>
      <br />
      <p>동기화에는 최대 1시간이 소요될 수 있습니다.</p>
      <p>계속하시겠습니까?</p>
    </div>
  ),

  "success-delete": (
    <div className="text-center">
      <p>삭제가 성공적으로 완료되었습니다.</p>
    </div>
  ),

  "no-license": <p className="text-center">라이선스를 먼저 등록해주세요.</p>,

  "success-sync": (
    <div className="text-center">
      <p>등록되었습니다.</p>
      <p>광고주 등록 후 1시간 이내에 광고 데이터 동기화가 완료됩니다.</p>
    </div>
  ),
};

export const syncTypeMap = {
  SYNC: "동기화",
  UNSYNC: "비동기화",
  FAIL: "동기화 실패",
};

export const defaultTableParams: TableParamsAdvertiser = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {},
  sortField: "ADVERTISER_REGISTER_TIME_DESC",
  sortOrder: "ascend",
  keyword: "",
};
