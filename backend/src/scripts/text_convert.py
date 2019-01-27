import numpy as np
import cv2

from line_segmentation import segment_lines

#from DataLoader import Batch
from Model import Model, DecoderType
from SamplePreprocessor import preprocess

class Batch:
	"batch containing images and ground truth texts"
	def __init__(self, gtTexts, imgs):
		self.imgs = np.stack(imgs, axis=0)
		self.gtTexts = gtTexts

class FilePaths:
	"filenames and paths to data"
	fnCharList = 'model/charList.txt'
	fnAccuracy = 'model/accuracy.txt'
	fnTrain = '../data/'
	fnInfer = '../data/test.png'
	fnCorpus = '../data/corpus.txt'

def infer(model, img):
    batch = Batch(None, [img])
    tup = model.inferBatch(batch, True)
    
    return tup

def word_conv(img, reuse):
    decoderType = DecoderType.BestPath
    model = Model(open(FilePaths.fnCharList).read(), reuse, decoderType, mustRestore=True)
    
    imgSize = (128, 32)
    input_img = preprocess(img, imgSize)
    rec_prob = infer(model, input_img)
    
    return rec_prob[0]