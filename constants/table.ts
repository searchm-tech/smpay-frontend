const defaultTableParams = {
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {},
};

const ACTIVE_STATUS = [
  { label: "활성", value: "active" },
  { label: "비활성", value: "inactive" },
];

export { defaultTableParams, ACTIVE_STATUS };
