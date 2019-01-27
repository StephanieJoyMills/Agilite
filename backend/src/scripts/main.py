import cv2
import numpy as np
import sys
import urllib.request
import json
from tensorflow import reset_default_graph, AUTO_REUSE

from line_segmentation import segment_lines
from text_convert import word_conv

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

    def printJson(self):
        category = colour_to_category[self.colour]
        note = NoteSerialize(self.text, category, self.colour, self.order)

        print(json.dumps(note.__dict__) + '*')

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

        # Segment image into individual lines
        lines = segment_lines(contour_subsection)

        # Calculate text for each line
        for line in lines:
            text = word_conv(line.img, AUTO_REUSE)
            line.text = text[0]
            reset_default_graph()

        # Sort by y coordinate and append to note.text
        lines.sort(key=lambda line: line.avg_y)
    
        for line in lines:
            note.text += line.text + " "

        # Preview
#        cv2.imshow(test_window, contour_subsection)
#        cv2.waitKey()

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

            # Dump json to console
            note.printJson()

if __name__ == "__main__":
    # Get image url from command line
    image_url = sys.argv[1]
    main(image_url)
