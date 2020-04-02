const ACCEPTABLE_TYPES = [
  'application/json',
];

const inflateBody = (req) => {
  return new Promise((resolve, reject) => {
    const body = []
    req
      .on('data', chunk => body.push(chunk))
      .on('end', () => {
        const data = Buffer.concat(body).toString();
        resolve(data);
      })
      .on('error', reject);
  });
};

const bodyParser = async (ctx, next) => {
  const isJson = ACCEPTABLE_TYPES.some(contentType => {
    return ctx.request.is(contentType);
  });
  if (isJson) {
    const jsonString = await inflateBody(ctx.req);
    let body;
    try {
      body = jsonString ? JSON.parse(jsonString) : '';
    } catch (err) {
      return ctx.throw(400, 'Invalid json');
    }

    Object.assign(ctx.request, { body });
  }

  return await next();
}

module.exports = bodyParser;
