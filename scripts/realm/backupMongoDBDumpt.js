exports = async function () {
  if (!context.functions.execute('checkIsFrontendAdmin')) {
    return 'Unauthorized';
  }

  const mongodb = context.services.get('DynamicLandscape_Service');
  const collection = mongodb.db('DynamicLandscape').collection('Services');
  const timestemp = new Date().toISOString().split('T')[0];

  const json = await collection
    .find()
    .sort({provider: 1})
    .toArray()
    .then(items => {
      console.log(
        `${timestemp}: Successfully found ${items.length} documents.`
      );
      return items;
    });

  const s3 = context.services.get('AWS').s3('eu-central-1');
  const result = await s3.PutObject({
    Bucket: 'cloudlandscape.info',
    Key: `backup/serviceBackup_${timestemp}.json`,
    Body: JSON.stringify(json),
    ContentType: 'application/json',
  });
  return json.length;
};
