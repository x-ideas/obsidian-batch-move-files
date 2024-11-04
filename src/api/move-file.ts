import type { App, TFile } from 'obsidian';
import { existsSync } from 'fs';
import { getDistFilePath } from './get-dist';

/**
 * option for function moveFiles
 */
export interface IMoveFileToAstroOpt {
  /**
   * obsidian app instance
   */
  app: App;

  /**
   * when the dist folder has same file, how to deal with it
   *
   * true: skip
   * false: replace
   *
   * @default true
   */
  skipFileWhenExist?: boolean;

  shouldModifyLink?: boolean;
}

export interface IMoveObFileToAstroFileResult {
  /** is moved to dist */
  moved?: boolean;
  /** is not moved to dist */
  skiped?: boolean;
  /** is moved and replace dist file */
  replaced?: boolean;

  /**
   * inlink files in the ob file
   */
  inlinkFiles?: Set<TFile>;
}

/**
 * move obsidian file to distFolder(only file，not include relative files)
 */
export async function moveObFileToAstroFile(
  file: TFile,
  distFolder: string,
  opt: IMoveFileToAstroOpt,
): Promise<IMoveObFileToAstroFileResult> {
  const { app, skipFileWhenExist = true } = opt;

  // find file inlinks
  const fileCache = app.metadataCache.getFileCache(file);

  const inlinkFiles = new Set<TFile>();
  if (fileCache && fileCache.links) {
    fileCache.links.forEach(link => {
      // get link file
      const inlinkFile = app.metadataCache.getFirstLinkpathDest(
        link.link,
        file.path,
      );
      if (inlinkFile) {
        inlinkFiles.add(inlinkFile);
      }
    });
  }

  const distPath = getDistFilePath(file, distFolder);

  // use node fs api to judge whether the file exists
  const isExist = existsSync(distPath);
  if (isExist && skipFileWhenExist) {
    return { skiped: true };
  }

  // move file
  await app.fileManager.renameFile(file, distPath);

  return {
    moved: true,
    replaced: isExist,

    inlinkFiles,
  };
}
