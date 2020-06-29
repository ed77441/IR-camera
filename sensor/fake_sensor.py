import requests
import sys
import time
import random
import datetime

def postImageToServer(cam, img):
	url = 'http://localhost/lib/upload.php'
	now = datetime.datetime.now()

	
	Mpz = '0' if now.month < 10 else ''
	mpz = '0' if now.minute < 10 else ''
	spz = '0' if now.second < 10 else ''

	ym = str(now.year) + '-' + Mpz + str(now.month)
	ms = mpz + str(now.minute) + ':' + spz + str(now.second)
	info = {'cam': cam, 'ym': ym, 
		'day': now.day, 'hour': now.hour, 'ms' : ms}
	files = {'img': img}

	x = requests.post(url, data = info, files=files)
	if x.status_code == 200:
		print('success!', x.text)
	else:
		print('something is wrong! status code =', x.status_code)
	

if __name__ == '__main__' and len(sys.argv) >= 2: 
	camNum = int(sys.argv[1]) - 1
	camNames = ['cam1', 'cam2', 'cam3']
	imgNames = ['cockatiel.png', 'conure.png', 'cockatoo.png']

	while True:
		img = open(imgNames[camNum], 'rb')
		postImageToServer(camNames[camNum], img)
		time.sleep(random.randint(1, 30))

else:
	print('You need to provide a camera number !')

	
