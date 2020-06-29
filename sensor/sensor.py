import RPi.GPIO as GPIO
import time
import sys
import os

import camera_capture
import send_requests

def main():
    GPIO.setmode(GPIO.BCM)

    PIN_PIR = 18
    STB_TIME = 3

    try:
        GPIO.setup(PIN_PIR, GPIO.IN)
        print()
        for i in range(0, STB_TIME):
            print("Wasitting for PIR to stable, %d sec" %(STB_TIME - i))
            sys.stdout.flush()
            time.sleep(1)

        print()
        print("READY....")
        print()
        
        while True:
            if(GPIO.input(PIN_PIR)):
                print("The PIR sensor has detected something")
                camera_capture.shot()
                if send_requests.send_picture() != 0:
                    break
                try:
                    os.remove("test.png")
                except OSError as e:
                    print(e)
                time.sleep(5)
            else:
                pass

    except KeyboardInterrupt:
        print ("\n Quit!")

if __name__ == "__main__":
    main()
