import type { ISettings } from './types';

/**
 * 默认的配置
 */
const DefaultSetting: ISettings = {
  dist: '',
  includes: '[visible]:true and [draft]:false',
  skipFileWhenExist: true,
};

export { DefaultSetting };
