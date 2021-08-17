import { ConfigPlugin, WarningAggregator, withAppBuildGradle } from '@expo/config-plugins';

import { GetSocialProps } from '../utils/types';

const withSocialAppGraddlePlugin: ConfigPlugin<GetSocialProps> = (config, { appId }) => {
  return withAppBuildGradle(config, ({ modResults, ...config }) => {
    if (modResults.language !== 'groovy') {
      WarningAggregator.addWarningAndroid(
        'withGetSocial',
        `Cannot automatically configure app build.gradle if it's not groovy`,
      );
      return { modResults, ...config };
    }

    modResults.contents = setApplySocialPlugin(modResults.contents);
    modResults.contents = setSocialPluginConfig(modResults.contents, appId);
    return { modResults, ...config };
  });
};

export const setApplySocialPlugin = (appBuildGradle: string) => {
  const pattern = new RegExp(`apply\\s+plugin:\\s+['"]im.getsocial['"]`);
  if (appBuildGradle.match(pattern)) return appBuildGradle;

  return appBuildGradle.replace(
    /(apply\splugin:\s['"]com\.android\.application['"])/,
    `$1\napply plugin: "im.getsocial"`,
  );
};

export const setSocialPluginConfig = (appBuildGradle: string, socialAppId: string) => {
  const pattern = /(getsocial(\s{\n?.*?)(appId\s['"].*['"]))/g;
  if (appBuildGradle.match(pattern)) return appBuildGradle;

  return appBuildGradle.replace(/(android\s\{)/g, `$1\n    getsocial { appId "${socialAppId}" }`);
};

export default withSocialAppGraddlePlugin;
