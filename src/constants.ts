export const LINE_ENDINGS = {
    LF: "\n",
    CR: "\r",
    CRLF: "\r\n",
} as const;

export const DIFF_TYPES = {
  ADDITION: "addition",
  DELETION: "deletion",
  MODIFICATION: "modification",
  UNCHANGED: "unchanged",
} as const;
