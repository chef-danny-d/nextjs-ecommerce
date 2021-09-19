const { withFrameworkConfig } = require("./framework/common/config")
require("dotenv").config()
const path = require("path")

module.exports = withFrameworkConfig({
	framework: {
		name: process.env.FRAMEWORK,
	},
	i18n: {
		locales: ["en-US"],
		defaultLocale: "en-US",
	},
	reactStrictMode: true,
	sassOptions: {
		includePaths: [path.join(__dirname, "assets")],
	},
})

console.log("⚙️   next.config.js", JSON.stringify(module.exports, null))
