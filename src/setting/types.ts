export interface ISettings {
	/**
	 * destination
	 */
	dist: string;
	/**
	 * include files
	 * @default [visible]:true and [draft]:false
	 */
	includes: string;

	/**
	 * skip file when exist
	 * @default true
	 */
	skipFileWhenExist: boolean;
}
