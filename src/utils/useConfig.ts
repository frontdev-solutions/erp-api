export const useConfig = () => {
  const dev = process.env.NODE_ENV || 'production';

  const isDev = dev === 'development';
  const isProd = dev === 'production';

  // const switchWhen = (thing) => {
  //   if (isDev) return thing.staging;
  //   if (isProd) return thing.production;
  // };

  return {
    dev,
    isDev,
    isProd,
    // switchWhen
  };
};
