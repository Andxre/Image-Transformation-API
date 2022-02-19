export default interface Command {
    execute(buffer: Buffer): Promise<Buffer>;
}