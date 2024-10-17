import type { App, TFile } from 'obsidian';
import { mkdir, writeFile } from 'fs/promises';

/**
 * option for function syncFileToAstro
 */
export interface ISyncFileToAstroOpt {
  /**
   * obsidian app instance
   */
  app: App;

  /**
   * whether include inlinks in the astro file
   *
   * @default false
   */
  includeInlinks?: boolean;
}

/**
 * sync obsidian markdown file and relative files to destination folder
 * @params {TFile} obsidian file
 * @params {string} destination folder
 */
export async function syncFileToAstro(
  file: TFile,
  distFolder: string,
  opt: ISyncFileToAstroOpt,
) {
  await syncFileToAstroImpl(file, distFolder, opt);
}

async function syncFileToAstroImpl(
  file: TFile,
  distFolder: string,
  opt: ISyncFileToAstroOpt,
) {
  const { includeInlinks = false } = opt;

  // get file inlinks and outlinks
  const metaCache = opt.app.metadataCache.getFileCache(file);

  const inlinks = metaCache && includeInlinks ? metaCache.links : [];

  await moveObFileToAstroFile(file, distFolder, opt);

  for (const inlink of inlinks ?? []) {
    const inlinkFile = opt.app.metadataCache.getFirstLinkpathDest(
      inlink.link,
      file.path,
    );
    if (inlinkFile) {
      await syncFileToAstroImpl(inlinkFile, distFolder, opt);
    }
  }
}

/**
 * move obsidian file to astro file(only file，not include relative files)
 * image link in ob file will be replaced with standard astro image link(relative path)
 * [[image.png]] -> ![image.png](relative path/to/image.png)
 */
export async function moveObFileToAstroFile(
  file: TFile,
  distFolder: string,
  opt: ISyncFileToAstroOpt,
) {
  const { app } = opt;
  const { vault } = app;

  const content = await vault.read(file);

  // replace image link
  const newContent = content.replace(/\[\[(.+?)\]\]/g, (_, p1) => {
    return `![${p1}](${p1})`;
  });

  // file write
  const distPath = `${distFolder}/${file.name}.md`;
  await mkdir(distFolder, { recursive: true });
  await writeFile(distPath, newContent);
}
