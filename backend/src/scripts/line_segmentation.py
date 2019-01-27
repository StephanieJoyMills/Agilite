import numpy as np
import cv2
from matplotlib import pyplot as plt

class Line:
    def __init__(self, image, y):
        self.img = image
        self.avg_y = y
        self.text = ""
        self.prob = 0.0

def segment_lines(bw_img):
    """Calculates bounding boxes for all lines of text inside of image
    """
    
    # Invert binary so text is 1s  
    bw_inv = cv2.bitwise_not(bw_img)
    
    # dilate to glue individual lines together
    kernel = np.ones((5,50), np.uint8) #for post-its
    dilated_img = cv2.dilate(bw_inv, kernel, iterations=1)
    
    # Get contours and sort by bounding box length
    _, ctrs, _ = cv2.findContours(dilated_img.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    #sorted_ctrs = sorted(ctrs, key=lambda ctr: cv2.boundingRect(ctr)[1])
    
    lines = []
    for ctr in ctrs:
        # Get bounding box
        x, y, w, h = cv2.boundingRect(ctr)
        if w * h > 5000:
            # Getting line image
            line_img = bw_img[y:y+h, x:x+w]
            lines.append(Line(line_img, y-w/2)) # append line object
    
    return lines
    
    
    