export type DemoData = {
  provider: Providers;
  providerIcon: string;
  category: Array<string>;
  service: string;
  webLink: string;
  img: string;
  description: string;
  keywords: Array<string>;
  // [key: string]: any;
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
