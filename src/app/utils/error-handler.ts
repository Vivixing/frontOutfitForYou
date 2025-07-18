export function procesarErrorHttp(error: any): string {
  // Si el error viene en array
  if (Array.isArray(error?.error?.detail)) {
    return error.error.detail
      .map((d: any) => `${d?.msg || 'Campo inválido'} (${d?.loc?.join('.') || 'desconocido'})`)
      .join('\n');
  }

    // Si estás usando un formato personalizado desde el backend
  if (Array.isArray(error?.error?.errors)) {
    return error.error.errors
      .map((d: any) => `${d?.mensaje || 'Campo inválido'} (${d?.campo || 'desconocido'})`)
      .join('\n');
  }

  // Si el error es un string plano
  if (typeof error?.error?.detail === 'string') {
    return error.error.detail;
  }

  return 'Error desconocido al procesar la solicitud';
}
