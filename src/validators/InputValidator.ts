export default class InputValidator {

    private regexValidators: RegExp[];

    constructor() {
        const flipRegex = new RegExp('^flip\\s(horizontal|vertical)$'); 
        const rotateRegex = new RegExp('^rotate\\s(left|right|-?\\d{1,3})$');
        const resizeRegex = new RegExp('^resize\\s\\d{1,4}\\s\\d{1,4}$');
        const grayscaleRegex = new RegExp('^grayscale$');
        const thumbnailRegex = new RegExp('^thumbnail$');
        this.regexValidators = [flipRegex, rotateRegex, resizeRegex, grayscaleRegex, thumbnailRegex];
    }

    validate(input: string) {
        for (let i = 0; i < this.regexValidators.length; i++) {
            if (this.regexValidators[i].test(input)) {
                return true;
            }
        }
        return false;
    }
}