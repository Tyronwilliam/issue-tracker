export const createURLParams = (
  paramsObject: Record<string, string | null | undefined>
): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(paramsObject)) {
    if (value !== null && value !== undefined) {
      if (value !== null && value !== undefined && value !== "ALL") {
        params.append(key, value);
      }
    }
  }

  return params.toString();
};
