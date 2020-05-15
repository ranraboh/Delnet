import os
import math

# in case there are unexisted directories along path create them 
def create_dirs_along_path(path):
    if not os.path.exists(os.path.dirname(path)):
        try:
            os.makedirs(os.path.dirname(path))
        except OSError as exc: 
            if exc.errno != errno.EEXIST:
                raise

def float_precision(value, precision):
    decimal_digits = math.pow(10, precision)
    return int(value * decimal_digits) / decimal_digits
