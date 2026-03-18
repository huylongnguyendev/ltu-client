export const noSpaceRegex = /^\S*$/;
export const noSpaceMesssage = "White space is not allowed";
export const noHtmlRegex = /^[^<>]*$/;
export const noHtmlMessage = `Special characters " < " or " > " are not allowed`;
export const noNumberRegex = /^[^0-9]*$/;
export const noNumberMessage = "Number is not allowed";
export const noSpecialCharRegex = /^[\p{L}\p{N}\s]*$/u;
export const noSpecialCharMessage = "Special characters are not allowed";

export const letterRegex = /[A-Za-z]/;
export const letterLowerRegex = /[a-z]/;
export const letterUpperRegex = /[A-Z]/;
export const numberRegex = /\d/;
export const specialCharRegex = /[!@#$%^&*(),.?":{}|]/;