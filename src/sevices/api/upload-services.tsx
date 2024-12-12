import * as axios from '../axios-instance/axios-host1';
import { URL } from '../constURL/constURL';

export default class UploadService {
  async UploadImage(fileImage: File | null | undefined): Promise<string> {
    if (!fileImage) {
      return '';
    }
    let formData = new FormData();
    formData.append('file', fileImage);

    try {
      let res = await axios.POST(URL.UPLOAD.UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.isSucceeded) {
        console.log(res.data);
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
    return 'no-image.png';
  }
}
