export default class UploadService {
  async UploadImage(fileImage: File | null | undefined): Promise<string> {
    // Implement image upload logic here
    if (fileImage) {
      return 'image_url';
    }
    return '';
  }
}
