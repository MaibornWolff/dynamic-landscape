import {
  DemoData,
  DataFilter,
  DataFilter_only_arrays,
} from '../../assets/data/dataType';

//Create a list of Unique Values to filter on
export function getToFilterValues(services: DemoData[]): any {
  const provider = new Set(services.map((service) => service.provider));
  const category = new Set(services.flatMap((service) => service.category));

  return {
    provider: Array.from(provider),
    category: Array.from(category),
  };
}

export function serviceFilter(
  services: DemoData[],
  filterSet: DataFilter
): DemoData[] {
  let filtered = false;

  //filter provider
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
      Array.isArray(services[0][filter as DataFilter_only_arrays] as any)
    ) {
      filtered = true;
      services = services.filter((s: DemoData) => {
        const serviceValues = s[filter as DataFilter_only_arrays] as Array<
          string
        >;
        const filterValues = filterSet[
          filter as keyof typeof filterSet
        ] as Array<string>;

        return filterValues.some((elem) => serviceValues.indexOf(elem) > -1);
      });
    }
  }

  if (filterSet.fulltext.length) {
    filtered = true;
    console.log('fulltext');
    services = services.filter((service: DemoData) => {
      for (let i = 0; i < filterSet.fulltext.length; i++) {
        for (const property in service) {
          let content = service[property as keyof DemoData];
          if (
            typeof content === 'string' &&
            content.includes(filterSet.fulltext[i])
          ) {
            console.log('accept');
            return true;
          }
        }
      }
      return false;
    });
  }
  console.log(services);
  return filtered ? services : [];
}
