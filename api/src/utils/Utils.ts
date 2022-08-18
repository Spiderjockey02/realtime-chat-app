import { readdirSync, statSync } from 'fs';
import { join, parse, sep } from 'path';

export class Utils {
	public static generateRoutes(directory: string, prefix: string) {
		const results: FileOptions[] = [];
		for(const path of this.searchDirectory(directory)) {
			const { dir, name } = parse(path);
			const basePath = directory.split(sep).pop() as string;
			const directoryRoute = dir.substring(dir.indexOf(basePath)).replace(basePath, prefix.startsWith('/') ? prefix : `/${prefix}`);
			const { result: dynamicDirRoute } = this.validateDynamicRoute(directoryRoute);
			const { result: dynamicFileRoute } = this.validateDynamicRoute(name, true);
			results.push({ path, route: `${dynamicDirRoute}${dynamicFileRoute}` });

		}
		return results;
	}
	private static validateDynamicRoute(context: string, isFile = false, seperator = '/') {
		const dynamicRouteValidator = /(?<=\[).+?(?=\])/gi;
		const validate = (dynamicRouteValidator.exec(context));
		if(!validate) return { result: isFile ? `${seperator}${context}` : context };
		return { result: context.replace(`[${validate[0]}]`, isFile ? `${seperator}:${validate[0]}` : `:${validate[0]}`) };
	}

	public static searchDirectory(directory: string, files: string[] = []) {
		for(const file of readdirSync(directory)) {
			const path = join(directory, file);
			const is = statSync(path);
			if(is.isFile()) files.push(path);
			if(is.isDirectory()) files = files.concat(this.searchDirectory(path));
		}
		return files;
	}
}

interface FileOptions {
	path: string,
	route: string,
}