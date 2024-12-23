import { type App, SuggestModal, TFolder } from "obsidian";

export class FolderSuggestModal extends SuggestModal<string> {
	private folders: TFolder[];
	private onSelect: (folder: string) => void;

	constructor(app: App, onSelect: (folder: string) => void) {
		super(app);

		this.setPlaceholder("Select a folder");
		this.setInstructions([
			{ command: "↑↓", purpose: "Navigate" },
			{ command: "↵", purpose: "Choose" },
			{ command: "Esc", purpose: "Cancel" },
		]);

		this.onSelect = onSelect;

		this.folders = [];

		// 获取所有文件夹
		for (const file of app.vault.getAllLoadedFiles()) {
			if (file instanceof TFolder) {
				this.folders.push(file);
			}
		}
	}

	getSuggestions(query: string) {
		return this.folders
			.filter((folder) => folder.path.includes(query))
			.map((folder) => folder.path);
	}

	renderSuggestion(value: string, el: HTMLElement): void {
		el.setText(value);
	}

	onChooseSuggestion(item: string, _evt: MouseEvent | KeyboardEvent): void {
		this.close();
		this.onSelect(item);
	}
}
