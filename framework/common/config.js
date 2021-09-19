const path = require("path")
const merge = require("deepmerge")
const fs = require("fs")
require("dotenv").config()

function withFrameworkConfig(defaultConfig = {}) {
	const framework = process.env.FRAMEWORK

	const frameworkNextConfig = require(path.join("../", framework, "config"))

	const config = merge(defaultConfig, frameworkNextConfig)

	const tsPath = path.join(process.cwd(), "tsconfig.json")
	const tsConfig = require(tsPath)

	tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`]
	tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`]

	fs.writeFileSync(tsPath, JSON.stringify(tsConfig, null, 4))

	return config
}

module.exports = { withFrameworkConfig }
