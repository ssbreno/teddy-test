import crypto from "crypto";

export const generateId = (length = 6) => {
  return crypto.randomBytes(length).toString("hex");
};
