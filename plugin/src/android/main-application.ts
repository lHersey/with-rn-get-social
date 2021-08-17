import { ConfigPlugin, WarningAggregator } from '@expo/config-plugins';

import withAndroidMainApplication from './baseAndroidMods/withAndroidMainApplication';

export const withSocialMainApplication: ConfigPlugin = config => {
  return withAndroidMainApplication(config, ({ modResults, ...config }) => {
    if (modResults.language !== 'java') {
      WarningAggregator.addWarningAndroid(
        'withGetSocial',
        `Cannot automatically configure MainApplication if it's not java`,
      );
      return { modResults, ...config };
    }

    modResults.contents = setMainApplicationPackage(modResults.contents);
    modResults.contents = setMainApplicationImport(modResults.contents);

    return { modResults, ...config };
  });
};

const setMainApplicationPackage = (mainApplication: string) => {
  if (mainApplication.includes('packages.add(new RNGetSocialPackage());')) return mainApplication;
  return mainApplication.replace(/(.*)(return\spackages;)/, '$1packages.add(new RNGetSocialPackage());\n$1$2');
};

const setMainApplicationImport = (mainApplication: string) => {
  const pattern = /(import\s(.*);)/;

  if (mainApplication.includes('import im.getsocial.rn.RNGetSocialPackage;')) return mainApplication;
  return mainApplication.replace(pattern, 'import im.getsocial.rn.RNGetSocialPackage;\n$1');
};
