from email.mime import base
from multiprocessing.sharedctypes import Value
import uuid
import requests
import base64

url = "http://localhost:8080/test"

def main():
    requestBody = {
        "image": "",
        "operations": []
     }

    file = input("Enter file name: ")

    with open('out.txt', "w") as f:
        f.write(encode(file))

    requestBody["image"] = encode(file)

    opCount = int(input("How many operations would you like to perform? (6 max): "))

    for i in range(opCount):
        operation = {
            "operation": ""
        }
        inp = input("Enter operation: ")
        operation["operation"] = inp
        param = input("Does this operation have parameters?: ")

        if (param == "yes"):
            operation["parameters"] = {}
        
            cont = "yes"
            while (cont != "no"):
                key = input("Input parameter name: ")
                val = input("Input parameter value: ")
                operation["parameters"][key] = val

                cont = input("Would you like to add more? (yes/no): ")
            

        requestBody["operations"].append(operation)

    r = requests
    response = r.post(url, json = requestBody)

    print("Response Time: " + str((response.elapsed.total_seconds() * 1000).__round__(1)) + "ms")

    json = response.json()

    if ("error" in json):
        print("Error: {}".format(json['error']))
    else:
        imageData = json['data']
        filename = decode(imageData)
        print("Image Transformed: " + filename)


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