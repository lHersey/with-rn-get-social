import { ConfigPlugin, withPlugins } from '@expo/config-plugins';

import withSocialAppGraddlePlugin from './android/app-build';
import withSocialProjectGraddlePlugin from './android/project-build';
import { GetSocialProps } from './utils/types';

const withGetSocial: ConfigPlugin<GetSocialProps> = (config, { appId, hostnames }) => {
  return withPlugins(config, [withSocialProjectGraddlePlugin, [withSocialAppGraddlePlugin, { appId, hostnames }]]);
};

export default withGetSocial;
