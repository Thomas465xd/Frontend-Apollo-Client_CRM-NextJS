import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends("next/core-web-vitals", "next/typescript"),

	// Adding custom rules for no-unused-vars and no-undef
	{
		rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            
            "no-undef": "warn",
            "no-console": "warn",
            "no-debugger": "warn",
            "no-alert": "warn",
		},
	},
];

export default eslintConfig;
