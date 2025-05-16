export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TUser = {
  userId: number;
  agentId: number;
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  status: "NORMAL";
  type: "ADVERTISER";
  password: string;
};

export type ApiResponse<T> = {
  result: T;
  message: string;
  status: number;
};
