import type { Config } from "release-it";

export default {
	git: {
		commitMessage: "chore: release v${version}",
	},
	github: {
		release: true,
	},
	npm: {
		publish: false,
	},
} satisfies Config;
