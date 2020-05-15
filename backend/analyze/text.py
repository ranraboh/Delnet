from enum import Enum
class EpochFactor(Enum):
    VALUE_TOO_SMALL = """
    number of epochs is too low, couple of extra iterations over
    the train-set might increase your model performance and results
    """
    OVERFITTING = """
    since your model have reached a state of overfitting and number of epochs 
    you have selected is relatively high, it is highly recommended to reduce number of iterations
    """
    OVERFITTING_HR = """
    since your model have reached a state of overfitting, 
    one way to avoid it is to reduce the number of iterations
    """
    EFFECTIVE_TRAINNING_HR = """
    loss value has dropped in stable pace during training process. 
    since the number of epochs you have chosen consider to be relatively low, 
    it is highly recommend to try out larger number of epochs. 
    increasing the quantity of iterations may enhance your model performance and results
    """
    EFFECTIVE_TRAINNING = """
    loss value has dropped in stable pace during training process. 
    increasing the number of iterations may enhance your model performance and results
    """
    EARLY_STOPPING = """
    in later epochs the model loss value slightly dropped, 
    decrease the number of epochs can solve this issue
    """
    EARLY_STOPPING_HR = """
    in later epochs the model loss value had significantly dropped, 
    decrease the number of epochs can solve this issue
    """
    REASONABLE_VALUE = """
    the number of epochs you have chosen seems reasonable and fits your model,
    trying out different values is essential but it doesn't seem to make a significant change
    """

class LearningRateFactor(Enum):
    TRAIN_LOSS_INCREASE = """
    the loss value supposed to decrease during training process, however the training loss value is going up. one common reason for it is high and unfit learning-rate value, try to decrease the value and examine whether the model results is getting better or not
    """
    EFFECTIVE_TRAINNING = """
    loss value has dropped efficiently up to a certain point where the train process 
    is no longer effective. a common reason for it is that too-high learning rate value 
    can make the optimization algorithm to overshoot the minimum.
    it may be the case in your model, try using a smaller value
    """
    LOSS_TAKES_LONG_TO_CONVERGE = """
    it seems that your loss is slowly decreasing. too low learning rate value may 
    cause the optimization algorithm prohibitively long to converge. 
    it may be the case in your model, a larger value may accelerate the training process
    """
    REASONABLE_VALUE = """
    learning rate value you have chosen seems reasonable and fits your model,
    trying out different values is essential but it doesn't seem to make a significant change
    """

class WeightDecayFactor(Enum):
    LOSS_TAKES_LONG_TO_CONVERGE = """
    loss value is dropping too slow, reduction of weight decay value may change the 
    situation by accelerating training process
    """
    REASONABLE_VALUE = """
    weight decay value you have chosen seems reasonable and fits your model,
    trying out different values is essential but it doesn't seem to make a significant change
    """

class BatchSizeFactor(Enum):
    REASONABLE_VALUE = """
    batch size value you have chosen seems reasonable and fits your model,
    trying out different values is essential but it doesn't seem to make a significant change
    """

class OptimizerFactor(Enum):
    REASONABLE_VALUE = """
    batch size value you have chosen seems reasonable and fits your model,
    trying out different optimizers is essential but it doesn't seem to make a significant change
    """

class LossTypeFactor(Enum):
    REASONABLE_VALUE = """
    loss function you have chosen seems reasonable and fits your model,
    trying out different loss functions is essential but it doesn't seem to make a significant change
    """

class ModelObstacle(Enum):
    NOT_LEARN = """
    its seems that your model doesn't learn at all,
    The results of the model on the train set confirm that the model performance is equivalent to a 
    uniformly random selection between the labels
    """
    UNDERFITTING = """
    the model performed poorly on train set, and therefore in state of underfitting, 
    underfitting occurs mainly because the model isn't complex enough to deal 
    with your desired classification task 
    """
    OVERFITTING = """
    the model is in state of overfitting and performs much better on the training set then on the test set
    that is, the model is too closely fit to a limited set of data points and doesn't generalize well.
    his ability to generalize and get good predictive performance
    for samples he never exposed before is limited
    it basically means that the model memorize or fits itself closely to the training set instead of
    comprehend which combinations of features affect on the classification
    """
    GOOD = """
    the model performs well on test set, however it probably can reach higher accuracy.
    a slight changes in your model or in selected hyper-parameters may make the difference.
    """
    EXCELLENT = """
    the model performs very well on eigther train and test set and have reached high accuracy.
    you can deploy and use your superb model 
    however, you can still trying out different techinques to maximize your model performence 
    """

class ModelStructure(Enum):
    MODEL_EXTREMELY_SIMPLE = """
    the model structure is extremely simple to deal with your classification task.
    increasing the number of parameters and layers enlarge the hypothesis space and
    consequently allows the model to learn more elaborate and flexible functions
    redesign your project,try to build a more complex model which contains more layers or larger dimensions
    """
    MODEL_SIMPLE = """
    the model structure is too simple to deal with your classification task.
    increasing the number of parameters and layers enlarge the hypothesis space and
    consequently allows the model to learn more elaborate and flexible functions
    try to build a more complex model which contains more layers or larger dimensions
    """
    PARAMETERS_TOO_SMALL = """
    the model structure is too simple to deal with your classification task.
    increasing the number of parameters enlarge the hypothesis space and
    consequently allows the model to learn more elaborate and flexible functions.
    since the number of layers seems large enough, try use layers with greater dimensions 
    """
    LAYERS_TOO_SMALL = """
    the model structure is too simple to deal with your classification task.
    increasing the number of layers enlarge the hypothesis space and
    consequently allows the model to learn more elaborate and flexible functions.
    it seems that the number of parameters is large compared to the number of modules.
    you might try to redesign your model, increase the number of layers and use modules with smaller dimensions or lower quantity of parameters
    """
    REASONABLE_STRUCTURE = """
    the model structure seems fit and reasonable,
    still, trying out different changes in structure is essential and can enhance the model accuracy
    """

class DropoutFactor(Enum):
    ADD_MODULE = """
    the model is in overfitting state and has large hypothesis space. that means that the model
    can learn too complex and flexible functions, 
    when we add a module of dropout we restrict ourselves to simple subset of hypothesis set functions
    doing so, the model can't cling or fit itself too closely to the train set and
    need to put out efforts to learn and find another way to deal with his task
    """
    REDUCE_DROPOUT_CONSTANT = """
    the model is in overfitting state and has large hypothesis space. that means that the model
    can learn too complex and flexible functions, 
    when we used a module of dropout, we have restricted ourselves to simpler subset of hypothesis set functions
    the limit level is depends on the drop-constant value.
    drop constant determine the probability each neuron includes in the process, graeater
    values cause the hypothesis set to be smaller and includes simpler functions.
    it seems that your dropout constant is too small, try larger value to avoid reach overfitting state
    """
    RISE_DROPOUT_CONSTANT = """
    the model is in underfitting state,
    we have restricted ourselves to a too small and simple subset of hypothesis space.
    the model can't learn a complex and flexible function enough to classify the input.
    therefore, it is highly recommended to decrease dropout constant value
    """
    REASONABLE_VALUE = """
    dropout value you have chosen seems reasonable and fits your model,
    trying out different optimizers is essential but it doesn't seem to make a significant change
    """