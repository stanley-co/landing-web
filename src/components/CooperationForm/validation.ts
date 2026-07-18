const PHONE_PATTERN = /^(?=(?:\D*\d){7,15}\D*$)\+?[0-9 ()-]+$/;

export const isValidPhone = (value: string) => PHONE_PATTERN.test(value.trim());
