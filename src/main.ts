import { MarkdownView, Notice, Plugin, TFile } from "obsidian";
import { moveFiles } from "./api/move-files.js";
import { FolderSuggestModal } from "./target-select-modal/index.js";

// Remember to rename these classes and interfaces!

export default class MoveFiles extends Plugin {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// settings: ISettings;

	async onload() {
		// await this.loadSettings();

		this.registerEvent(
			// add file context menu
			this.app.workspace.on("file-menu", (menu, file) => {
				menu.addItem((item) => {
					item.setIcon("circle-arrow-right");
					item.setTitle("Batch Move");
					item.onClick(async () => {
						// if file is TFile
						if (file instanceof TFile) {
							await this.syncFile(file);
							return;
						}
					});
				});
			}),
		);

		// add editor context menu
		this.registerEvent(
			this.app.workspace.on("editor-menu", (menu, _editor, view) => {
				menu.addItem((item) => {
					item.setIcon("circle-arrow-right");
					item.setTitle("Batch Move");
					item.onClick(async () => {
						// gei current file
						const file = view.file;
						if (file instanceof TFile) {
							await this.syncFile(file);
							return;
						}
					});
				});
			}),
		);

		// add command
		this.addCommand({
			id: "circle-arrow-right",
			name: "Batch Move",
			callback: async () => {
				await this.syncCurrentFile();
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		// this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {}

	syncFile = async (file: TFile) => {
		new FolderSuggestModal(this.app, async (folder) => {
			const statRes = await moveFiles(file, folder, {
				app: this.app,
				skipFileWhenExist: true,
				includeInlinks: true,
			});

			new Notice(
				`Moved: ${statRes.movedCount}, Skiped: ${statRes.skipedCount}, Replaced: ${statRes.replacedCount}`,
			);
		}).open();
	};

	syncCurrentFile = async () => {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			return;
		}
		const file = activeView.file;
		if (!file) {
			new Notice("No active file");
			return;
		}

		await this.syncFile(file);
	};

	async loadSettings() {
		// this.settings = Object.assign({}, DefaultSetting, await this.loadData());
	}

	/**
	 * 保存设置
	 */
	async saveSettings() {
		// await this.saveData(this.settings);
	}

	/**
	 * Expored API
	 */
	api = {};
}
