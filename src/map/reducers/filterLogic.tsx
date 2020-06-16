import {
  DemoData,
  DataFilter,
  DataFilter_only_arrays,
  ServiceFeatures,
} from '../../assets/data/dataType';

// Create a list of Unique Values to filter on
export function getToFilterValues(services: DemoData[]): ServiceFeatures {
  const provider = new Set(services.map(service => service.provider));
  const category = new Set(services.flatMap(service => service.category));
  const keywords = new Set(services.flatMap(service => service.keywords));

  return {
    provider: Array.from(provider),
    category: Array.from(category),
    keywords: Array.from(keywords),
  };
}

export function serviceFilter(
  services: DemoData[],
  filterSet: DataFilter
): DemoData[] {
  let filtered = false;

  if (
    !Object.keys(filterSet).some(
      key => filterSet[key as keyof typeof filterSet].length > 0
    )
  ) {
    return services;
  }

  // filter provider
  if (Array.isArray(filterSet.provider) && filterSet.provider.length) {
    filtered = true;
    services = services.filter((s: DemoData) =>
      filterSet.provider.includes(s.provider)
    );
  }

  // //Filter for all array like values
  for (const filter in filterSet) {
    if (
      Array.isArray(filterSet[filter as keyof typeof filterSet]) &&
      filterSet[filter as keyof typeof filterSet].length &&
      filter !== 'fulltext' &&
      Array.isArray(services[0][filter as DataFilter_only_arrays])
    ) {
      filtered = true;
      services = services.filter((s: DemoData) => {
        const serviceValues = s[filter as DataFilter_only_arrays] as string[];
        const filterValues = filterSet[
          filter as keyof typeof filterSet
        ] as string[];

        return filterValues.some(elem => serviceValues.indexOf(elem) > -1);
      });
    }
  }

  if (filterSet.fulltext.length) {
    filtered = true;
    services = services.filter((service: DemoData) => {
      for (const fulltext of filterSet.fulltext) {
        for (const property in service) {
          if (service[property as keyof DemoData]) {
            const content = service[property as keyof DemoData];
            if (
              typeof content === 'string' &&
              content.toLowerCase().includes(fulltext.toLowerCase())
            ) {
              return true;
            }
          }
        }
      }
      return false;
    });
  }
  return filtered ? services : [];
}
