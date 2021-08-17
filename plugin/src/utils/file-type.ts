import path from 'path';

export function getLanguage(filePath: string): 'java' | 'groovy' | 'kt' {
  const extension = path.extname(filePath);
  switch (extension) {
    case '.java':
      return 'java';
    case '.kts':
    case '.kt':
      return 'kt';
    case '.groovy':
    case '.gradle':
      return 'groovy';
    default:
      throw new Error(`Unexpected Android file extension: ${extension}`);
  }
}
