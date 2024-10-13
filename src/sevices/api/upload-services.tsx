import * as axios from '../axios-instance/axios-host1';
import { URL } from '../constURL/constURL';

export default class UploadService {
  async UploadImage(fileImage: File | null | undefined): Promise<string> {
    if (!fileImage) {
      return '';
    }
    let formData = new FormData();
    formData.append('file', fileImage);
    // let res = await axios.POST(URL.UPLOAD.UPLOAD_IMAGE, formData);
    // if (res.isSucceeded) {
    //   return res.data;
    // }
    return 'no-image.png';
  }
}
