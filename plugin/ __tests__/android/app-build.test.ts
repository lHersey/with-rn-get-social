import fs from 'fs/promises';
import path from 'path';

import * as AppBuild from '../../src/android/app-build';

describe('[Android] app build.gradle test', () => {
  it('applies changes to app build.grade', async () => {
    let appBuildGradle = await fs.readFile(path.resolve(__dirname, '../fixtures/app.build.gradle'), {
      encoding: 'utf-8',
    });

    appBuildGradle = AppBuild.setApplySocialPlugin(appBuildGradle);
    appBuildGradle = AppBuild.setSocialPluginConfig(appBuildGradle, 'MY_APP_ID_KEY');

    expect(appBuildGradle).toMatchSnapshot();
  });
});
