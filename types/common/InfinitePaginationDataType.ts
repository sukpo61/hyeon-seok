type InfinitePaginationDataType<K extends string, T> = {
  [key in K]: T[];
} & {
  pageInfo: {
    lastPartyId: number;
    hasNext: boolean;
  };
};
