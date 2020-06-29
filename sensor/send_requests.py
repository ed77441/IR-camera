import requests
def send_picture():
    url = 'https://iot02.yuntech-iot.net/upload.php'

    files = {'upimage' : open('test.png', 'rb')}
    try:
        response = requests.post(url, files=files)
    except OSError as e:
        print(e)
        return 1
    print (response)
    return 0

