const { withFrameworkConfig } = require("./framework/common/config")
require("dotenv").config()

module.exports = withFrameworkConfig({
	framework: {
		name: process.env.FRAMEWORK,
	},
	i18n: {
		locales: ["en-US", "es"],
		defaultLocale: "en-US",
	},
	reactStrictMode: true,
})

console.log("⚙️   next.config.js", JSON.stringify(module.exports, null))
