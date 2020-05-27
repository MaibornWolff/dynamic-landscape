export type DemoDataWithoutId = {
  provider: Providers;
  providerIcon: string;
  category: Array<string>;
  service: string;
  webLink: string;
  img: string;
  description: string;
  keywords: Array<string>;
};

export type DemoData = DemoDataWithoutId & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _id: any;
};

export type Providers = string;

export type ServiceFeatures = {
  provider: Providers[];
  category: string[];
  keywords: string[];
};

export type DataFilter = ServiceFeatures & {
  fulltext: string[];
};

export type DataFilter_only_arrays = Exclude<keyof DataFilter, 'fulltext'>;
