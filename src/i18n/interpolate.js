export function interpolate(template, vars) {
  if (template == null || typeof template !== 'string') return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, name) => {
    const v = vars?.[name];
    return v !== undefined && v !== null ? String(v) : '';
  });
}
