import isBase64 from 'validator/lib/isBase64';
import ValidationError from './ValidationError';

export default class ImageValidator {
    private mimeTypes: string[] = ["/9j/", "iVBORw0KGgo"]; 

    constructor() {}

    public validate(image: string) {
        if (!isBase64(image)) {
            throw new ValidationError(
                'Image Error',
                'Image string must be base64 encoded.',
                1001
            );
        }

        for (let i of this.mimeTypes) {
            if (image.indexOf(i) === 0) {
                return true;
            }
        }
        throw new ValidationError(
            'Image Error',
            'Invalid file type. Base64 image string must be png or jpg.',
            1002
        );
    }
}
