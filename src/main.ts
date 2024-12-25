import { MarkdownView, Notice, Plugin, TFile, TFolder } from "obsidian";
import { moveFiles } from "./api/move-files.js";
import { FolderSuggestModal } from "./target-select-modal/index.js";
import { getI18nInst } from "./configs/i18n.js";

export default class MoveFiles extends Plugin {
	async onload() {
		const name = getI18nInst().t("Batch Move");

		this.registerEvent(
			// add file context menu
			this.app.workspace.on("file-menu", (menu, file) => {
				// exclude folder
				if (file instanceof TFolder) {
					return;
				}

				menu.addItem((item) => {
					item.setIcon("circle-arrow-right");
					item.setTitle(name);
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
					item.setTitle(name);
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
			name: name,
			callback: async () => {
				await this.syncCurrentFile();
			},
		});
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
}
