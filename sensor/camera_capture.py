from picamera import PiCamera
import time

def shot():
    with PiCamera() as camera:
        camera.resolution = (480,360)
        #camera.saturation = 80 # 设置图像视频的饱和度
        #camera.brightness = 50 # 设置图像的亮度(50表示白平衡的状态)
        #camera.shutter_speed = 6000000 # 相机快门速度
        #camera.iso = 800 # ISO标准实际上就是来自胶片工业的标准称谓，ISO是衡量胶片对光线敏感程度的标准。如50 ISO, 64 ISO, 100 ISO表示在曝光感应速度上要比高数值的来得慢，高数值ISO是指超过200以上的标准，如200 ISO, 400 ISO
        #camera.sharpness = 0 #设置图像的锐度值，默认是0，取值范围是-100~100之间
        #camera.framrate = 32 #这里可能用的Fraction是一个分数模块来存储分数1/6，保证分数运算的精度(记得调用模块：from fractions import Fraction) 
        #camera.hflip = Ture # 是否进行水平翻转 
        camera.vflip = True #是否进行垂直翻转 
        #camera.rotation = 0 #是否对图像进行旋转 
        #a_gain = camera.analog_gain #这个值表示摄像头传感器件到数字装换之前的模拟信号的增益，格式是Fraction的格式 一般似乎也用不上
        #d_gain = camera.digital_gain #这个值表示摄像头的数字增益大小 一般似乎也用不上
        #camera.led = False #值为False那么led为关灯的状态，True为开灯的状态
        timehour = int(time.localtime(time.time())[3])
        if timehour>5 and timehour<17:
            camera.shutter_speed = 8000
            camera.saturation = 40
            camera.brightness = 50
        else:
            camera.shutter_speed = 100000
        camera.capture("test.png")
