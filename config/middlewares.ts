export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {

      origin: [
        'https://gachiroun.or.kr',
        'https://www.gachiroun.or.kr'
      ],
      // credentials: true, // 필요시 주석 해제
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
