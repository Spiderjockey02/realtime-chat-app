import { readdirSync, statSync } from 'fs';
import { join, parse, sep } from 'path';

export class Utils {
	public static generateRoutes(directory: string, prefix: string, seperator = '/') {
		const results: FileOptions[] = [];
		for(const path of this.searchDirectory(directory)) {
			const { dir, name } = parse(file);
			const basePath = directory.split(sep).pop() as string;
			const dirIndex = dir.indexOf(basePath);
			const routePath = dir.slice(dirIndex).split(sep).join(seperator).toString().replace(basePath, prefix.startsWith(seperator) ? prefix : `${seperator}${prefix}`);
			if(routePath.includes('[') && routePath.includes(']')) results.push({ path, route: `${routePath.replace('[', ':').replace(']', '')}${seperator}${name}` });
			else results.push({ path, route: `${routePath}${seperator}${name}` });
		}
		return results;
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