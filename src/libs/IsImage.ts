export function isImageURL(url: string): boolean {
  // Получить расширение файла из URL
  const fileExtension = url.split('.').pop()?.toLowerCase();

  // Проверить, является ли расширение изображением
  const imageExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  return !!fileExtension && imageExtensions.includes(fileExtension);
}
