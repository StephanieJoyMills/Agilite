import cv2
import numpy as np
import argparse
import sys
import urllib.request
from pathlib import Path

class Note:
    def __init__(self, colour, contour):
        self.colour = colour
        self.contour = contour;
        self.text = ""

        self.row = []
        self.column = []

    def convertToAPI(self):
        # Calculate average row and average column
        avg_row = (self.row[0] + self.row[1])/2
        avg_column = (self.column[0] + self.column[1])/2

        return NoteAPI(self.colour, self.text, avg_row, avg_column)

class NoteAPI:
    def __init__(self, colour, text, avg_row, avg_column):
        self.colour = colour
        self.text = ""
        self.avg_row = avg_row
        self.avg_column = avg_column

# These values were obtained from playing with the 
# 'test-thresholding.py' script in this directory
hue_thres = {'Cyan': [60, 110], 'Pink': [130, 180], 'Yellow': [30,80]}
sat_thres = [82, 255]
val_thres = [88, 255]
test_window = "Test Window";

def url_to_image(url):
    imgResp = urllib.request.urlopen(url)
    imgNp = np.array(bytearray(imgResp.read()),dtype=np.uint8)
    img = cv2.imdecode(imgNp,-1)  
    
    return img

def main(image_url):
    # Load image, openCV defaults to BGR
    #img = cv2.imread(image_path)
    img = url_to_image(image_url)
    
    # Convert to HSV for thresholding
    img_HSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Threshold each colour 
    cyan_threshold = cv2.inRange(img_HSV, 
                                 (hue_thres['Cyan'][0], sat_thres[0], val_thres[0]), 
                                 (hue_thres['Cyan'][1], sat_thres[1], val_thres[1])) 
    
    pink_threshold = cv2.inRange(img_HSV, 
                                 (hue_thres['Pink'][0], sat_thres[0], val_thres[0]), 
                                 (hue_thres['Pink'][1], sat_thres[1], val_thres[1]))
    
    yellow_threshold = cv2.inRange(img_HSV, 
                                   (hue_thres['Yellow'][0], sat_thres[0], val_thres[0]), 
                                   (hue_thres['Yellow'][1], sat_thres[1], val_thres[1])) 
    threshold_dict = {'Cyan': cyan_threshold,
                      'Pink': pink_threshold,
                      'Yellow': yellow_threshold}

    # Find contours in each threshold
    _, cyan_ctrs, _ = cv2.findContours(cyan_threshold.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    _, pink_ctrs, _ = cv2.findContours(pink_threshold.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    _, yellow_ctrs, _ = cv2.findContours(yellow_threshold.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    ctrs_dict = {'Cyan': cyan_ctrs, 'Pink': pink_ctrs, 'Yellow': yellow_ctrs}

    # Populate a list with Note objects containing the colour and the contour
    # This assumes the post-it notes are a good size in the image!
    notes_list = []
    for colour in ctrs_dict.keys():
        for contour in ctrs_dict[colour]:
            area = cv2.contourArea(contour)
            if area > 10000:
                notes_list.append(Note(colour, contour))


    # Go through and extract the post it note as its own image from the contour
    for note in notes_list:
        x,y,w,h = cv2.boundingRect(note.contour)
        # Indexing starts from top left of image ?
        note.column = [x, x+w]
        note.row = [y, y+h]

        # Crop out bounding box from original image
        contour_subsection = threshold_dict[note.colour][note.row[0]:note.row[1], note.column[0]:note.column[1]]

        # Upate contour row and columns to be relative to cropped image
        for row in range (note.contour.shape[0]):
            for column in range (note.contour.shape[1]):
                note.contour[row][column][0] -= x
                note.contour[row][column][1] -= y

        # Fill edges of bounding box (Contour filling)

        # First, get a filled contour
        contour_invert = np.zeros(contour_subsection.shape)
        cv2.fillPoly(contour_invert, pts = [note.contour], color=(255))

        # Invert the filled contour
        contour_invert = contour_invert/(255)
        contour_invert = contour_invert.astype(np.uint8)
        contour_invert = contour_invert * 255
        contour_invert = cv2.bitwise_not(contour_invert)

        # Add inverted filled contour onto our original image to fill
        # in edges of the image
        contour_subsection += contour_invert

        # Median blur to smooth out some noise
        contour_subsection = cv2.medianBlur(contour_subsection, 5)

        cv2.imshow(test_window, contour_subsection)
        
        cv2.waitKey()

if __name__ == "__main__":
    # Get command line arguments
#    PARSER = argparse.ArgumentParser()
#    PARSER.add_argument('image_path', type = str, default = None,
#                        help = 'path to image from current directory')
#    ARGS = PARSER.parse_args()
#    image_path = Path(ARGS.image_path)
#
#    # Check to make sure image path exists
#    if not image_path.exists():
#        print("Image path %s does not exist!" % image_path)
#        sys.exit(1)

    #main(str(image_path))
    url = "https://00e9e64bac8f00d718a7d46bcb62b29ac0cffc27039f5e0097-apidata.googleusercontent.com/download/storage/v1/b/delta-hacks/o/50790792_2247957691927112_3911329130515267584_n.jpg?qk=AD5uMEuEbqv1CBWcgH9L3sWvAUvs323OYgDYAQMSaKHGLOvwT9EkVIDjeWy69C7LGnqSJbgD3mrZmd7Ei8MrKn1XukZoZRGMJB6i4yB7K8BnIciWk2rujgsTJfMIcUxENCKZQPAEMJyXU6unQARrdmB0DaqaQ2vydaaFqYlz4Cz-5XR40Osl4maS11RK_mAuFunFFCHlNEIM-t-9ZeQB3Z-D8MFcQl9Dsfy09IB1D9b76H5dnJKzqysP_B9RxPYZX0IhZ9w1-qPxD2DbUGSdLRQ5huTkB6CkFfmy-0VQ12wXMqHNc9k3cEpny5VRA_mqd7fRfgKMcjWIQ8R3o36tPsAZOSjc57ptfcjEup7BQ0zL-poQKf_ZeK2EBCgYn3PjQour6Mca1UHDjGzzmX6cQegkhtL_rZMy-LrWynCL8yF3ZQQfkDkrQaHYIfsSYIWl06eNmmr63mn2lOJ4EpGSLRhyDWTpTPt2Z7QIpNbALhlmp-OrnEkYuqtwMzgKbACr8Ud7_dPDv76ro_Clhfb2VCnejT5GuIqDcvX9t2brktVeajF-bWkdyNR5vEE3XNd1dPrunsBwsW2XbXaOCLSbf35D2ZHaJDWo-n96mjCCikq_ksEvmRpZ3RSGmthAtMZxLgPHBWy_LHOBr0NEZjViTiGXEoO5K7jSUMWB-LArf3YrLgxj9eYGbRJ7CufdEbvfO9GR6-10RvVGpfQ5-eMKoXaHuMJ-BTG3Tl2SPVzyODEOTLjqAcOvwTq3SUOON41WvOT2g0EJlOl2DKToakuTw2R2UQJbYeiYMVqyTD5kpbYG9jLN2HRfplA"
    main(url)
    