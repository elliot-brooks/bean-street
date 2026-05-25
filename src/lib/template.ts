const templateTokenPattern = /\{([A-Z0-9_]+)\}/g

export const fillTemplate = (
	template: string,
	values: Record<string, string | number>,
): string =>
	template.replace(templateTokenPattern, (_match, token: string) => {
		const replacement = values[token]

		return replacement === undefined ? `{${token}}` : String(replacement)
	})

export const shortBeanName = (value: string): string => value.replace(/\s+Bean$/u, '')
