import * as esbuild from "esbuild";

const esbuildTransform = (code: string) => {
	return esbuild.transform(code, {
		loader: "tsx",
		format: "esm",
	});
};

export default esbuildTransform;
