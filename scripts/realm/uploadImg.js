exports = async function(path, fileDataUrl) {
    if (!context.functions.execute("checkIsFrontendAdmin")) {
        return "Unauthorized";
    }
    if (!path || !fileDataUrl) {
        return "path or image missing";
    }
    const parts = fileDataUrl.split(";base64,", 2);
    const base64 = parts[1];
    const blob = BSON.Binary.fromBase64(base64);

    const s3 = context.services.get('AWS').s3("eu-central-1");
    const result = await s3.PutObject({
        "Bucket": "cloudlandscape.info",
        "Key": "img/logos/" + path,
        "Body": blob
    });
    return result;
};
