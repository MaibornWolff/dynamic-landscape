exports = async function (sourceCategory, targetCategory) {
    if (!context.functions.execute('checkIsFrontendAdmin')) {
        return 'Unauthorized';
    }

    const mongodb = context.services.get('DynamicLandscape_Service');
    const collection = mongodb.db('DynamicLandscape').collection('Services');

    const result = await collection.updateMany(
        { category: sourceCategory },
        { $set: { 'category.$': targetCategory }}
    );

    return result.modifiedCount;
};
