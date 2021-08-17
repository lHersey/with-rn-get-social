import { ExportedConfigWithProps } from '@expo/config-plugins';

export type GetSocialProps = {
  appId: string;
  hostnames: [string, string]
};

export type ProjectFile<L extends string = string> = {
  path: string;
  language: L;
  contents: string;
};

export type OptionalPromise<T> = T | Promise<T>;
export type Mod<T = any> = (config: ExportedConfigWithProps<T>) => OptionalPromise<ExportedConfigWithProps<T>>;

export type ApplicationProjectFile = ProjectFile<'java' | 'kt'>;
export type GradleProjectFile = ProjectFile<'groovy' | 'kt'>;
