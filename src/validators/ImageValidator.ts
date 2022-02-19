import isBase64 from 'validator/lib/isBase64';

export default class ImageValidator {
    private mimeTypes: string[] = ["/9j/", "iVBORw0KGgo"]; 

    constructor() {}

    public validate(image: string) {
        if (!isBase64(image)) {
            throw new Error('Image string must be base64 encoded.')
        }

        for (let i of this.mimeTypes) {
            if (image.indexOf(i) === 0) {
                return true;
            }
        }
        throw new Error('Invalid file type. Base64 image string must be png or jpg.')
    }
}
