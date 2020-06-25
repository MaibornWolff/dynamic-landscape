const axios = require('axios');
const cheerio = require('cheerio');

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

init = async function () {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Enter the Stich Admin API-KEY? ', async key => {
    console.log('Key:', key);
    rl.close();

    const credential = new ServerApiKeyCredential(key);

    const currentServicesAuth = await client.auth.loginWithCredential(
      credential
    );

    const currentServices = await db.collection(COLLECTION).find({}).toArray();

    let services = await fetch();

    const newServices = services.filter(service => {
      return (
        currentServices.filter(currentService => {
          return (
            currentService.service === service.service ||
            currentService.webLink === service.webLink
          );
        }).length === 0
      );
    });

    console.log('Found Services', services.length);
    console.log('New Services to insert', newServices.length);
    if (newServices.length > 0) {
      try {
        const write = await db.collection(COLLECTION).insertMany(newServices);
        console.log(write);
      } catch (error) {
        console.log(error);
      }
    }
    client.close();
  });
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
