# Image Processor API

## Installation
```bash
npm install
```

## Run
```bash
npm start
```

## Client (Python)
Server must be running before running the client.

### Prerequisites
- Requests

### What it does?
The python client takes care of encoding and decoding the base64 image string. Ensure that the target image file is in the same directory as `client.py`


### Usage

```
cd client

pip install -r requirements.txt

python client.py

```

### Sample Output
```bash
Enter file name: x.jpg
How many operations would you like to perform? (6 max): 2

------------------------------------------------------------------
Operations: ['thumbnail', 'grayscale', 'flip', 'rotate', 'resize']
Enter operation: thumbnail
------------------------------------------------------------------
Operations: ['thumbnail', 'grayscale', 'flip', 'rotate', 'resize']
Enter operation: flip
Type:  string - Allowed Values {vertical, horiontal}
orientation: vertical

Image Transformed: 7b6f5d3e-0aea-4c64-bbb0-6a732908e18e.jpg
```