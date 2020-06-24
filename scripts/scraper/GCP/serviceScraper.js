const axios = require('axios');
const cheerio = require('cheerio');
const Realm = require('realm');

const baseURL = 'https://cloud.google.com';

const {
  Stitch,
  ServerApiKeyCredential,
  RemoteMongoClient,
} = require('mongodb-stitch-server-sdk');

const DATABASE = 'DynamicLandscape';
const COLLECTION = 'Services';

const client = Stitch.initializeDefaultAppClient('dynamiclandscape-kaewj');
const db = client
  .getServiceClient(RemoteMongoClient.factory, 'DynamicLandscape_Service')
  .db(DATABASE);

const credential = new ServerApiKeyCredential(
  'c1b3C2hiAl422vh0PEH3PNr2q6nq57mXRZzE0XPOpvT9PnvwaTp7BbnxsbtOkrhm' //admin!!!
);

init = async function () {
  const currentServicesAuth = await client.auth.loginWithCredential(credential);

  // await db.collection(COLLECTION).deleteMany({test: true});
  const currentServices = await db.collection(COLLECTION).find({}).toArray();

  let services = await fetch();

  const newServices = services.filter(service => {
    return (
      currentServices.filter(currentService => {
        return (
          currentService.service === service.service ||
          // && currentService.status !== 'review'
          currentService.webLink === service.webLink
        );
      }).length === 0
    );
  });

  console.log(services.length);
  console.log(newServices.length);
  if (newServices.length > 0) {
    try {
      const write = await db.collection(COLLECTION).insertMany(newServices);
      console.log(write);
    } catch (error) {
      console.log(error);
    }
  }
  client.close();
};

getHTML = async url => {
  const response = await axios({
    url: url,
    method: 'get',
  });
  return response.data;
};

fetch = async () => {
  const body = await getHTML(baseURL + '/products');
  const services = [];
  const $ = cheerio.load(body);
  const productsHTML = $('.cloud-product-card__headline');

  productsHTML.each(function () {
    const category = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .parent()
      .attr('data-cloud-main-text');

    if (category !== 'Featured') {
      const name = $(this).text().trim();
      services.push({
        service: name,
        webLink:
          $(this).attr('href').substr(0, 4) === 'http'
            ? $(this).attr('href')
            : baseURL + $(this).attr('href'),
        category: [category || 'undefined'],
        provider: 'Google',
        img: `/img/logos/Google/${category}/${name}.svg`,
        status: 'review',
        test: true,
      });
    }
  });

  let request = [];
  for (const service of services) {
    request.push(
      new Promise(async (res, reject) => {
        axios({
          url: service.webLink,
          method: 'get',
        })
          .then(response => {
            const $ = cheerio.load(response.data);
            service.description =
              $("meta[name='description']").attr('content') || '';
            console.log(service.service, 'done');
            res(response.data);
          })
          .catch(e => {
            console.log(e);
            reject(false);
          });
      })
    );
  }
  await Promise.all(request);
  return services;
};

init();
