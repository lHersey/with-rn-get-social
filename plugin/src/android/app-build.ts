import { ConfigPlugin, WarningAggregator, withAppBuildGradle } from '@expo/config-plugins';

import { GetSocialProps } from '../utils/types';

const withSocialAppGraddlePlugin: ConfigPlugin<GetSocialProps> = (config, { appId, hostnames }) => {
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
    modResults.contents = setGradlePlaceholders(modResults.contents, appId, hostnames);
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

export function setGradlePlaceholders(appBuildGradle: string, socialAppId: string, hostnames?: [string, string]) {
  const manifestPattern = /(manifestPlaceholders\s=\s\[)/;
  const socialPlaceholders = getSocialPlaceholder(socialAppId, hostnames);

  if (appBuildGradle.includes(socialPlaceholders)) return appBuildGradle;

  if (!appBuildGradle.match(manifestPattern)) {
    return appBuildGradle.replace(
      /defaultConfig\s?{/,
      `defaultConfig {
          manifestPlaceholders = [${socialPlaceholders}]`,
    );
  }

  return appBuildGradle.replace(manifestPattern, `$1${socialPlaceholders}, `);
}

function getSocialPlaceholder(socialAppId: string, hostnames?: [string, string]) {
  const GET_SOCIAL_SCHEME_KEY = 'getsocial_scheme';
  const GET_SOCIAL_HOSTNAME_0_KEY = 'getsocial_hostName_0';
  const GET_SOCIAL_HOSTNAME_1_KEY = 'getsocial_hostName_1';
  const DEFAULT_HOSTNAME_0 = 'getsocialdemo5.gsc.im';
  const DEFAULT_HOSTNAME_1 = 'getsocialdemo5-gsalt.gsc.im';

  const getSocialSchema = `${GET_SOCIAL_SCHEME_KEY}: "${socialAppId}"`;
  const getSocialFirstHostName = `${GET_SOCIAL_HOSTNAME_0_KEY}:" ${hostnames?.[0] ?? DEFAULT_HOSTNAME_0}"`;
  const getSocialSecondHostName = `${GET_SOCIAL_HOSTNAME_1_KEY}:" ${hostnames?.[1] ?? DEFAULT_HOSTNAME_1}"`;

  return [getSocialSchema, getSocialFirstHostName, getSocialSecondHostName].join();
}

export default withSocialAppGraddlePlugin;
