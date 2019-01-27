import cv2
import numpy as np
import argparse
import urllib.request
import json
from pathlib import Path

colour_to_category = {'Cyan': 'To Do', 'Pink': 'Doing', 'Yellow': 'Done'}

class Note:
    def __init__(self, colour, contour):
        self.colour = colour
        self.contour = contour

        # Extract location data
        x,y,w,h = cv2.boundingRect(self.contour)
        self.column = [x, x+w]
        self.row = [y, y+h]
        self.avg_row = (self.row[0] + self.row[1])/2
        self.avg_column = (self.column[0] + self.column[1])/2

        self.text = ""
        self.order = 0

    def convertToJson(self):
        category = colour_to_category[self.colour]
        note = NoteSerialize(self.text, category, self.colour, self.order)

#        jsonFileName = "%s_%s.json" % (self.colour, self.order)
#        with open(jsonFileName, 'w') as outfile:
#            json.dump(note.__dict__, outfile)
        return json.dump(note.__dict__)

class NoteSerialize:
    def __init__(self, text, category, colour, order):
        self.text = text
        self.category = category
        self.colour = colour
        self.order = order

# These values were obtained from playing with the 
# 'test-thresholding.py' script in this directory
hue_thres = {'Cyan': [60, 110], 'Pink': [130, 180], 'Yellow': [30,80]}
sat_thres = [82, 255]
val_thres = [88, 255]
test_window = "Test Window"

def url_to_image(url):
    imgResp = urllib.request.urlopen(url)
    imgNp = np.array(bytearray(imgResp.read()),dtype=np.uint8)
    img = cv2.imdecode(imgNp, -1)

    return img

def main(image_url):
    # Load image, openCV defaults to BGR
    #img = cv2.imread(image_url)
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
    colour_count_dict = {'Cyan': 0, 'Pink': 0, 'Yellow': 0}

    # Populate a list with Note objects containing the colour and the contour
    # This assumes the post-it notes are a good size in the image!
    notes_list = []
    for colour in ctrs_dict.keys():
        for contour in ctrs_dict[colour]:
            area = cv2.contourArea(contour)
            if area > 10000:
                colour_count_dict[colour] += 1
                notes_list.append(Note(colour, contour))

    # Go through and extract the post it note as its own image from the contour
    for note in notes_list:
        x, y, _, _ = cv2.boundingRect(note.contour)

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

    # Extract out each color into it's own list
    cyan_notes = list(filter(lambda x: x.colour == 'Cyan', notes_list))
    pink_notes = list(filter(lambda x: x.colour == 'Pink', notes_list))
    yellow_notes = list(filter(lambda x: x.colour == 'Yellow', notes_list))

    # Sort each colour for average row value (y value)
    cyan_notes.sort(key = lambda x: x.avg_row)
    pink_notes.sort(key = lambda x: x.avg_row)
    yellow_notes.sort(key = lambda x: x.avg_row)

    all_colour_notes = (cyan_notes, pink_notes, yellow_notes)

    # Go through and assign an order to each note
    for colour_note in all_colour_notes:
        count = 0
        for note in colour_note:
            note.order = count
            count += 1

            # Save to json
            note.convertToJson()

if __name__ == "__main__":
    # Get command line arguments
    PARSER = argparse.ArgumentParser()
    PARSER.add_argument('image_url', type = str, default = None,
                        help = 'image url to load in')
    ARGS = PARSER.parse_args()
    image_url = Path(ARGS.image_url)

#    image_path = Path("Images/oneword_1.jpg")
#    main(str(image_path))
#    url = "https://00e9e64bac8f00d718a7d46bcb62b29ac0cffc27039f5e0097-apidata.googleusercontent.com/download/storage/v1/b/delta-hacks/o/50790792_2247957691927112_3911329130515267584_n.jpg?qk=AD5uMEuEbqv1CBWcgH9L3sWvAUvs323OYgDYAQMSaKHGLOvwT9EkVIDjeWy69C7LGnqSJbgD3mrZmd7Ei8MrKn1XukZoZRGMJB6i4yB7K8BnIciWk2rujgsTJfMIcUxENCKZQPAEMJyXU6unQARrdmB0DaqaQ2vydaaFqYlz4Cz-5XR40Osl4maS11RK_mAuFunFFCHlNEIM-t-9ZeQB3Z-D8MFcQl9Dsfy09IB1D9b76H5dnJKzqysP_B9RxPYZX0IhZ9w1-qPxD2DbUGSdLRQ5huTkB6CkFfmy-0VQ12wXMqHNc9k3cEpny5VRA_mqd7fRfgKMcjWIQ8R3o36tPsAZOSjc57ptfcjEup7BQ0zL-poQKf_ZeK2EBCgYn3PjQour6Mca1UHDjGzzmX6cQegkhtL_rZMy-LrWynCL8yF3ZQQfkDkrQaHYIfsSYIWl06eNmmr63mn2lOJ4EpGSLRhyDWTpTPt2Z7QIpNbALhlmp-OrnEkYuqtwMzgKbACr8Ud7_dPDv76ro_Clhfb2VCnejT5GuIqDcvX9t2brktVeajF-bWkdyNR5vEE3XNd1dPrunsBwsW2XbXaOCLSbf35D2ZHaJDWo-n96mjCCikq_ksEvmRpZ3RSGmthAtMZxLgPHBWy_LHOBr0NEZjViTiGXEoO5K7jSUMWB-LArf3YrLgxj9eYGbRJ7CufdEbvfO9GR6-10RvVGpfQ5-eMKoXaHuMJ-BTG3Tl2SPVzyODEOTLjqAcOvwTq3SUOON41WvOT2g0EJlOl2DKToakuTw2R2UQJbYeiYMVqyTD5kpbYG9jLN2HRfplA"
    main(image_url)
