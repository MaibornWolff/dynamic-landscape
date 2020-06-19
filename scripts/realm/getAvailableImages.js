exports = async function() {
    if (!context.functions.execute("checkIsFrontendAdmin")) {
        return "Unauthorized";
    }
    const s3 = context.services.get('AWS').s3("eu-central-1");
    return await s3.ListObjectsV2({
        "Bucket": "cloudlandscape.info",
        "Prefix": "img/logos/"
    });
};
