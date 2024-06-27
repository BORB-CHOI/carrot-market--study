export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다.";
