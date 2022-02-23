import Command from "./command";

// Command Invoker

export default class ImageProcessor {
    private commands: Command[];
    
    constructor() {
        this.commands = [];
    }

    public addCommand(command:Command): void {
        if (command != null) {
            this.commands.push(command);
        }
    }

    public async executeCommands(buffer: Buffer): Promise<Buffer> {
        for (const command of this.commands) {
            buffer = await command.execute(buffer);
        }
        return buffer;
    }
}