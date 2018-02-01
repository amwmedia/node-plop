import path from 'path';
import * as fspp from '../fs-promise-proxy';

export const makeDestPath = (data, cfg, plop) =>
	path.resolve(plop.getDestBasePath(), plop.renderString(cfg.path || '', data));

export function* getTemplate(data, cfg, plop) {
	const makeTmplPath = p => path.resolve(plop.getPlopfilePath(), p);

	let { template } = cfg;

	if (cfg.templateFile) {
		const isDynamicTemplatePathAllowed = cfg.type !== 'addMany';
		const templateFile = isDynamicTemplatePathAllowed
			? plop.renderString(cfg.templateFile, data)
			: cfg.templateFile;
		template = yield fspp.readFile(makeTmplPath(templateFile));
	}
	if (template == null) {
		template = '';
	}

	return template;
}

export function* getRenderedTemplate(data, cfg, plop) {
	const template = yield getTemplate(data, cfg, plop);
	return plop.renderString(template, data);
}

export const getRelativeToBasePath = (filePath, plop) =>
	filePath.replace(path.resolve(plop.getDestBasePath()), '');

export const throwStringifiedError = err => {
	if (typeof err === 'string') {
		throw err;
	} else {
		throw err.message || JSON.stringify(err);
	}
};