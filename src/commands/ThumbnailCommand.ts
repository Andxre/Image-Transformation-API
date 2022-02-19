import ResizeCommand from "./ResizeCommand";

export default class ThumbnailCommand extends ResizeCommand {
    
    constructor() {
        super(100, 100)
    }
}