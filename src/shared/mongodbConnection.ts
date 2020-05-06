import {DemoData} from '../assets/data/dataType';
import {
  Stitch,
  RemoteMongoClient,
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

export default async function fetchAllServices() {
  try {
    return JSON.parse(sessionStorage.serviceContent);
  } catch (error) {
    console.log(error);
    console.log('Fetching Data');
    let returnDoc = [] as DemoData[];
    await client.auth
      .loginWithCredential(credential)
      .then(() => db.collection(COLLECTION).find({}).toArray())
      .then((docs: any) => {
        console.log('[MongoDB Stitch] Connected to Stitch');
        returnDoc = docs;
        sessionStorage.serviceContent = JSON.stringify(docs);
      })
      .catch((err: any) => {
        console.error(err);
      });
    return returnDoc;
  }
}
