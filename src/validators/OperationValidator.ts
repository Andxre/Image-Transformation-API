export default class OperationValidator {

    private operationMap: Map<string, Set<string>>;

    constructor() {
        this.operationMap = new Map<string, Set<string>>();

        this.operationMap.set("grayscale", new Set<string>());
        this.operationMap.set("thumbnail", new Set<string>());
        this.operationMap.set("flip", new Set<string>(["vertical"]));
        this.operationMap.set("rotate", new Set<string>(["angle"]));
        this.operationMap.set("resize", new Set<string>(["width", "height"]));
        
    }

    validate(object: any) {
        if (this.isOperationValid(object.operation)) {
            if (this.requiresParameters(object.operation)) {
                if (this.containsParameters(object) && this.validateParameters(object)) { 
                    return true;
                } else {
                    let operations = "{" + Array.from(this.operationMap.get(object.operation)).join(', ') + "}";
                    throw new Error('Parameters for ' + object.operation + ' are ' + operations);
                }
            } else {
                if (this.containsParameters(object)) {
                    throw new Error('Operation ' + object.operation + ' requires no parameters')
                } 
                return true;
            }
        } 
        throw new Error('Operation ' + object.operation + ' is not valid.')
    } 

    private isOperationValid(operation: string) {
        return this.operationMap.has(operation);
    }

    private requiresParameters(operation: string) {
        return this.operationMap.get(operation).size > 0;
    }

    private containsParameters(object: any) {
        return "parameters" in object;

    }

    private validateParameters(object: any) {
        const providedParameters = Object.keys(object.parameters)
        const requiredParameters = this.operationMap.get(object.operation);

        if (providedParameters.length != requiredParameters.size) {
            return false;
        }

        for (let i = 0; i < providedParameters.length; i++) {
            if (!(requiredParameters.has(providedParameters[i]))) {
                return false;
            }
        }
        return true;
    }
}

// Singleton Instance
export let operationValidator = new OperationValidator();