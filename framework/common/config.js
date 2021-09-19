const path = require("path")
const merge = require("deepmerge")
const fs = require("fs")
require("dotenv").config()

const ALLOWED_FW = ["shopify", "bigcommerce", "shopify_local"]
const FALLBACK_FW = "shopify"

function withFrameworkConfig(defaultConfig = {}) {
	let framework = process.env.FRAMEWORK

	if (!framework) {
		throw new Error(
			"❌ Please provide a valid api framework to integrate. Take a look at the .env file and make sure you have a framework specified."
		)
	}

	if (framework === "shopify_local") {
		framework = FALLBACK_FW
	}

	if (!ALLOWED_FW.includes(framework)) {
		throw new Error(
			`❌ The api framework ${framework} cannot be found, please use one of ${ALLOWED_FW.join(
				", "
			)}`
		)
	}

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
