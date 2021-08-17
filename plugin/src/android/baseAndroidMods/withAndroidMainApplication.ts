import { ConfigPlugin, Mod, withBaseMod } from '@expo/config-plugins';

import { getProjectFilePath, getFileInfo, write } from '../../utils/paths';
import { ApplicationProjectFile } from '../../utils/types';

const withAndroidMainApplication: ConfigPlugin<Mod<ApplicationProjectFile>> = (config, action) => {
  return withBaseMod<ApplicationProjectFile>(config, {
    platform: 'android',
    mod: 'mainApplication',
    isProvider: true,
    action: async config => {
      try {
        const filePath = getProjectFilePath(config.modRequest.projectRoot, 'MainApplication');
        const modResults = getFileInfo(filePath);

        const result = await action({ ...config, modResults });

        await write(filePath, result.modResults.contents);

        return config;
      } catch (error) {
        error.message = `[android.withAndroidMainApplication]: ${error.message}`;
        throw error;
      }
    },
  });
};

export default withAndroidMainApplication;
