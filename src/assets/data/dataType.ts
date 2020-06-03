export type DemoDataWithoutId = {
  provider: Providers;
  providerIcon: string;
  category: string[];
  service: string;
  webLink: string;
  img: string;
  description: string;
  keywords: string[];
  // [key: string]: any;
};

export type DemoData = DemoDataWithoutId & {
  _id: unknown;
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
