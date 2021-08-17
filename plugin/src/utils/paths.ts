import fs from 'fs';
import glob from 'glob';
import path from 'path';

import { getLanguage } from './file-type';

export function getProjectFilePath(projectRoot: string, name: string): string {
  const filePathPattern = path.join(projectRoot, `android/app/src/main/java/**/${name}.@(java|kt)`);
  const filePath = glob.sync(filePathPattern)[0];
  if (!filePath) throw new Error(`Project file "${name}" does not exist in android project for root "${projectRoot}"`);
  return filePath;
}

export function getFileInfo(filePath: string) {
  return {
    path: path.normalize(filePath),
    contents: fs.readFileSync(filePath, 'utf8'),
    language: getLanguage(filePath) as any,
  };
}

export async function write(filePath: string, content: string) {
  await fs.promises.writeFile(filePath, content);
}
