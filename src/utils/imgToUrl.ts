import { HttpStatus, HttpException } from '@nestjs/common';

export const imgToUrl = async (img: any) => {
  const KEYBB: string = 'dde7c8307d66b5eff422baf53acdb36f';
  const url: string = 'https://api.imgbb.com/1/upload';

  // profile_img.mimetype,
  const image = new Blob([img.buffer], { type: img.mimetype });

  try {
    const Data = new FormData();
    Data.append('key', KEYBB);
    Data.append('image', image, img.originalname);

    const res = await fetch(url, {
      method: 'POST',
      body: Data,
    });
    const r = await res.json();
    return r['data']['url'];
  } catch (error) {
    return 'No convertible!';
  }
};
