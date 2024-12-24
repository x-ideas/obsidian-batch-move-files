import type { Config } from "release-it";

export default {
	git: {
		commitMessage: "chore: release v${version}",
		requireUpstream: false,
	},
	github: {
		release: false,
	},
	npm: {
		publish: false,
	},
} satisfies Config;
