import type { TFile } from 'obsidian';
import { moveObFileToAstroFile, type IMoveFileToAstroOpt } from './move-file';

/**
 * option for function moveFiles
 */
export interface ISyncFileToAstroOpt extends IMoveFileToAstroOpt {
  /**
   * whether include inlinks in the astro file
   *
   * @default false
   */
  includeInlinks?: boolean;
}

interface ISyncFileToAstroResult {
  movedCount: number;
  skipedCount: number;
  replacedCount: number;
}

/**
 * move obsidian markdown file and relative files to destination folder
 * @params {TFile} obsidian file
 * @params {string} destination folder
 */
export async function moveFiles(
  file: TFile,
  distFolder: string,
  opt: ISyncFileToAstroOpt,
): Promise<ISyncFileToAstroResult> {
  if (!opt.includeInlinks) {
    const res = await moveObFileToAstroFile(file, distFolder, opt);
    return {
      movedCount: res.moved ? 1 : 0,
      skipedCount: res.skiped ? 1 : 0,
      replacedCount: res.replaced ? 1 : 0,
    };
  }

  return await syncFileToAstroImpl(file, distFolder, opt);
}

async function syncFileToAstroImpl(
  file: TFile,
  distFolder: string,
  opt: ISyncFileToAstroOpt,
) {
  const dealFiles = new Set<TFile>();
  const res: ISyncFileToAstroResult = {
    movedCount: 0,
    skipedCount: 0,
    replacedCount: 0,
  };

  const fileToMoves: TFile[] = [file];
  while (fileToMoves.length > 0) {
    const file = fileToMoves.pop();
    if (!file || dealFiles.has(file)) {
      continue;
    }

    const fileMoveRes = await moveObFileToAstroFile(file, distFolder, opt);
    dealFiles.add(file);

    res.movedCount += fileMoveRes.moved ? 1 : 0;
    res.skipedCount += fileMoveRes.skiped ? 1 : 0;
    res.replacedCount += fileMoveRes.replaced ? 1 : 0;

    if (fileMoveRes.inlinkFiles) {
      for (const inlinkFile of fileMoveRes.inlinkFiles) {
        if (!dealFiles.has(inlinkFile)) {
          fileToMoves.push(inlinkFile);
        }
      }
    }
  }

  return res;
}
