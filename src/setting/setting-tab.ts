import { App, PluginSettingTab, Setting } from 'obsidian';
import type SyncToAstro from '../main.js';

export class SettingTab extends PluginSettingTab {
  plugin: SyncToAstro;

  constructor(app: App, plugin: SyncToAstro) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName('Sync Destination')
      .setDesc('which folder should sync to')
      .addText(text =>
        text
          .setPlaceholder('entry destionation folder path')
          .setValue(this.plugin.settings.dist)
          .onChange(async value => {
            this.plugin.settings.dist = value;
            await this.plugin.saveSettings();
          }),
      );

    // which file should sync
    new Setting(containerEl)
      .setName('Sync Files')
      .setDesc('which file shoud include in sync')
      .addText(text => {
        text
          .setPlaceholder('enter search, for example: tag:xxx or path:xxxx')
          .setValue(this.plugin.settings.includes)
          .onChange(async value => {
            this.plugin.settings.includes = value;
            await this.plugin.saveSettings();
          });
      });
  }
}
