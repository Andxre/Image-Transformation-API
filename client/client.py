import uuid
import requests
import base64

# API Endpoint
url = "http://localhost:8080/transform"
# Set of Parameters that should be casted to int 
intParams = {"angle", "width", "height"}
# Map of Operations and their parameters
operations = {
    "thumbnail": [],
    "grayscale": [],
    "flip": ["orientation: string - Allowed Values {vertical, horiontal}"],
    "rotate": ["angle: int"],
    "resize": ["width: int", "height: int"]
}

def main():
    requestBody = {
        "image": "",
        "operations": []
     }

    file = input("Enter file name: ")
    try:
        requestBody["image"] = encode(file)
    except Exception:
        print("Invalid Image! Make sure the image is located in the same folder.")
        return

    opCount = 999
    while (opCount > 6):
        opCount = int(input("How many operations would you like to perform? (6 max): "))
    
    print()
    for _ in range(opCount):
        operation = {
            "operation": ""
        }
        print("------------------------------------------------------------------")
        print("Operations: " + str(list(operations.keys())))
        inp = input("Enter operation: ")
        if (inp not in operations): raise Exception("Invalid Operation")
        operation["operation"] = inp

        if (len(operations[inp]) != 0):
            operation["parameters"] = {}
            for i in range(len(operations[inp])):
                parameter, info = operations[inp][i].split(':')
                print("Type: " + info)
                val = input(parameter + ": ")
                if (parameter in intParams): val = int(val)
                operation["parameters"][parameter] = val

        requestBody["operations"].append(operation)

    r = requests
    response = r.post(url, json = requestBody)

    json = response.json()

    if ("error" in json):
        print("Error: {}".format(json['error']))
    else:
        imageData = json['data']
        filename = decode(imageData)
        print("\nImage Transformed: " + filename)


def encode(path):
    data = open(path, "rb").read()
    encodedString = base64.b64encode(data)
    return encodedString.decode('utf-8')

def decode(imageData):
    filename = str(uuid.uuid4()) + ".jpg"
    with open(filename, "wb") as fh:
        fh.write(base64.b64decode(imageData))
    return filename

if __name__ == "__main__":
    main()


