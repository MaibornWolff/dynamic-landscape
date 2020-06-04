import {DemoData, DemoDataWithoutId} from '../assets/data/dataType';
import {
  RemoteMongoClient,
  Stitch,
  UserApiKeyCredential,
} from 'mongodb-stitch-browser-sdk';

const DATABASE = 'DynamicLandscape';
const COLLECTION = 'Services';

const client = Stitch.initializeDefaultAppClient('dynamiclandscape-kaewj');
const db = client
  .getServiceClient(RemoteMongoClient.factory, 'DynamicLandscape_Service')
  .db(DATABASE);

const credential = new UserApiKeyCredential(
  '7jcwcGl6aSKf0oSXiW8Wb8AbLZwFkr2YHSrHcSVnDWEhXektnxJ8TipzrkDucVbj'
);

export default async function fetchAllServices(force = false) {
  const cache = sessionStorage.getItem('serviceContent');
  const createdBy = Number(sessionStorage.getItem('createdBy'));
  if (cache && !force && createdBy && createdBy + 86400000 > Date.now()) {
    return JSON.parse(cache);
  } else {
    let returnDoc = [] as DemoData[];
    await client.auth
      .loginWithCredential(credential)
      .then(() => db.collection<DemoData>(COLLECTION).find({}).toArray())
      .then((docs: DemoData[]) => {
        console.log('[MongoDB Stitch] Connected to Stitch');
        returnDoc = docs;
        sessionStorage.setItem('serviceContent', JSON.stringify(returnDoc));
        sessionStorage.setItem('createdBy', Date.now().toString());
      })
      .catch((err: Error) => {
        console.error(err);
      });
    return returnDoc;
  }
}

export async function checkAdminCredentials(credentials: string) {
  return await client.auth
    .loginWithCredential(new UserApiKeyCredential(credentials))
    .then(() => client.callFunction('checkIsFrontendAdmin', []))
    .catch((err: Error) => {
      if (err.message === 'invalid API key') return false;
      console.error(err);
      return false;
    });
}

export async function addNewService(
  credentials: string,
  service: DemoDataWithoutId
) {
  return await client.auth
    .loginWithCredential(new UserApiKeyCredential(credentials))
    .then(() =>
      db.collection<DemoDataWithoutId>(COLLECTION).insertOne(service)
    );
}

export async function deleteService(credentials: string, service: DemoData) {
  return await client.auth
    .loginWithCredential(new UserApiKeyCredential(credentials))
    .then(() =>
      db
        .collection<DemoData>(COLLECTION)
        .deleteOne({_id: {$oid: (service._id as string | object).toString()}})
    );
}

export async function updateService(credentials: string, service: DemoData) {
  const {_id: id, ...serviceWithoutId} = service;
  return await client.auth
    .loginWithCredential(new UserApiKeyCredential(credentials))
    .then(() =>
      db
        .collection<DemoData>(COLLECTION)
        .findOneAndReplace(
          {_id: {$oid: (id as string | object).toString()}},
          serviceWithoutId
        )
    );
}
