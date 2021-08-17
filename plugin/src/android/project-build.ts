import { ConfigPlugin, WarningAggregator, withProjectBuildGradle } from '@expo/config-plugins';

const withSocialProjectGraddlePlugin: ConfigPlugin = config => {
  return withProjectBuildGradle(config, ({ modResults, ...config }) => {
    if (modResults.language !== 'groovy') {
      WarningAggregator.addWarningAndroid(
        'withGetSocial',
        `Cannot automatically configure project build.gradle if it's not groovy`,
      );
      return { modResults, ...config };
    }

    modResults.contents = setMavenRepository(modResults.contents);
    modResults.contents = setDependencies(modResults.contents);
    return { modResults, ...config };
  });
};

const setMavenRepository = (projectBuildGradle: string) => {
  if (projectBuildGradle.includes('https://plugins.gradle.org/m2/')) return projectBuildGradle;

  return projectBuildGradle.replace(
    /repositories\s?{/,
    `repositories {
        maven { url "https://plugins.gradle.org/m2/" }
    `,
  );
};

const setDependencies = (projectBuildGradle: string) => {
  if (projectBuildGradle.includes('im.getsocial:plugin-v7')) return projectBuildGradle;

  return projectBuildGradle.replace(
    /dependencies\s?{/,
    `dependencies {
        classpath "im.getsocial:plugin-v7:1.0.9"
    `,
  );
};

export { setMavenRepository, setDependencies };
export default withSocialProjectGraddlePlugin;
