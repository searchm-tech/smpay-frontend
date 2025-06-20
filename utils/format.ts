import dayjs from "dayjs";

export const formatBusinessNumber = (value: string) => {
  // 숫자만 추출
  const numbers = value.replace(/\D/g, "");

  // 길이에 따라 하이픈 추가
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 5) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(
      5,
      10
    )}`;
  }
};

export const formatPhoneNumber = (value: string) => {
  if (!value) {
    return "";
  }
  const numbers = value.replace(/\D/g, "");
  const { length } = numbers;

  if (length < 4) {
    return numbers;
  }

  if (numbers.startsWith("02")) {
    if (length < 6) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    } else if (length < 10) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 5)}-${numbers.slice(
        5
      )}`;
    }
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(
      6,
      10
    )}`;
  }

  if (length < 8) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else if (length < 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
    7,
    11
  )}`;
};

export function formatDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
