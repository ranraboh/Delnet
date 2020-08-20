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
    the loss value supposed to decrease during training process, however the training loss value is going up. 
    one common reason for it is high and unfit learning-rate value, try to decrease the value and examine whether the model results is getting better or not
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
    optimizer algorithm you have chosen seems reasonable and fits your model since your model
    learns well on your train set,
    trying out different optimizers is essential but it doesn't seem to make a significant change
    """
    ADAM = """
    adam optimizer renowned to be suitable for image classification tasks.
    it is strongly recommended to try this optimizer out,
    perhaps it will enhance your performence and accuracy.
    """
    UNDERFITTING = """
    since you have reach a state of underfitting,
    there is fault in finding minimum state in optimization algorithm.
    it might be parameters for optimization such as learning rate or weight decay
    or in optimization algorithm selection.
    it highly recommended to check out parameters analysis or other critical points mentioned
    before trying to change the optimizer algorithm.  
    """
    MANY_OPTIONS_FAIL = """
    it seems that you have tried several options for optimizer,
    since you haven't reach sufficient results in all of them, it might be not the reason for it.
    """
    SUCCESS = """
    since you acheived high performence,
    it seems that using this optimizer fits your model
    """
    DIFFERENT_OPTIONS = """
    since your model isn't learn well your train set, 
    try out different types of optimizers is an option
    """

class LossTypeFactor(Enum):
    REASONABLE_VALUE = """
    loss function you have chosen seems reasonable and fits your model,
    trying out different loss functions is essential but it doesn't seem to make a significant change
    """
    CROSS_ENTROPY = """
    cross entropy loss function renowned to be suitable for classification tasks.
    it is strongly recommended to try this loss function out,
    perhaps it will enhance your performence and accuracy.
    """
    MANY_OPTIONS_FAIL = """
    it seems that you have tried several options for loss function,
    since you haven't reach sufficient results in all of them, it might be not the reason for it.
    """
    SUCCESS = """
    since you acheived high performence,
    it seems that using this loss function fits your model
    """
    DIFFERENT_OPTIONS = """
    since your model isn't learn well your train set, 
    try out different types of loss is an option
    """

class ProjectStatus(Enum):
    NOT_LEARN = """
    its seems that your model doesn't learn at all,
    The results of the model on the train set confirm that the model performance is equivalent to a 
    uniformly random selection between the labels.
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
    MEDIOCRE = """
    the model performs very well on train set, however it has mediocre results on test set.
    the model ability to generalize and get good predictive performance
    for samples he never exposed before is limited.
    """
    GOOD = """
    the model performs well on test set, however it probably can reach higher accuracy.
    a slight changes in your model or in selected hyper-parameters may make the difference.
    """
    GOOD_EXCELLENT = """
    notice that the model has reach high accuracy rate (above 90%) over test set,
    however, it happend only once in last runs. 
    an extra couple of runs can give us updated additional information to better analyze your model situation.
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
    UNUSED_REASONABLE_VALUE = """
    you havent used dropout module in your model structure,
    it seems reasonable since your model is not in a state of overfitting, 
    """
    REASONABLE_VALUE = """
    since your model is not in a state of overfitting or underfitting, 
    the dropout frequency and constant parameters you have chosen seems reasonable and fits your model,
    be advised, a change in model structure may lead to a different evaluation
    """
    
class ActivationsFactor(Enum):
    NO_ACTIVATIONS = """
    it seems that your model architecture does not include usage of activations functions.
    the model is unable to classify inseperable data and therefore is in state of overfitting
    the model can't efficiently learn complex and flexible seperator that describe well the data.
    integrate activation function modules in your neural network will enhance your model accuracy. 
    """
    GREAT_LACK_OF_ACTIVATIONS = """
    it seems that your model is in underfitting state,
    it may stems from the reason that there is lack in the use of activation fucntions
    in your model architercture. increase the usage of activations provides extra 
    flexibility to the trained model. 
    hence, it is highly recommended to integrate activations more frequently in your neural network structure
    """
    LACK_OF_ACTIVATIONS = """
    it seems that your model is in underfitting state,
    increasing the usage of activations provides extra flexibility to the trained model.
    try to integrate activations functions more frequently in your neural network structure
    """
    REASONABLE_USAGE = """
    it seems that your usage frequency of activations functions is reasonable.
    increase or reduce the quantity of activations modules can improve your results,
    but probably not to a great extent
    """
    OVERUSE_ACTIVATIONS = """
    it seems that you overuse activations functions modules,
    overuse may lead to overfitting and ability to learn too complex and flexible models.
    try to scale down usage of activations function in your model structure
    """
    OVERUSE_RELU = """
    you have used frequently relu activation function, it may lead to dead relu phenomenon.
    that means that the gradient is 0 and the function is unable to learn
    that is, the neural network neurons rarely update during training process.
    try to use leaky relu or prelu instead
    """
    SIGMOID_TANH_USE = """
    you have used frequently sigmoid or hardtanh activations in your model,
    as we observed emprically, using different activations function may lead to slightly higher results
    """
    REASONABLE_TYPE = """
    the type of activations functions you have used seems reasonable.
    trying out different changes in structure is essential and can enhance the model accuracy
    but probably not to a great extent
    """

class ConvolutionFactor(Enum):
    NO_CONVOLUTION = """
    your model structure doesn't include colvolution layers,
    adding convolution modules gives the model the ability to identify or locate local patterns
    in the input image in a manner independent of the position it appeared.
    you should integrate convolution modules in your model architecture
    """
    GREAT_SHORTAGE_CONVOLUTION = """
    your model structure contains few convolution layers and therefore in state of underfitting
    increase the number of convolutions enable the model identify more complex 
    structured local patterns which helps the model to classify more accuratly
    hence, it is highly recommended to rise the usage of convoution modules in your model structure. 
    """
    SHORTAGE_CONVOLUTION = """
    it seems that integrate convolution modules more frequently in your model structure
    can enhance your model performance and accuracy. 
    increasing the number of convolutions enable the model identify more complex 
    structured local patterns which helps the model to classify more accuratly
    """
    REASONABLE_USAGE = """
    it seems that your usage frequency of convolution modules is reasonable.
    increase or reduce the quantity of convolution can improve your results,
    but probably not to a great extent.
    """
    OVERUSED_CONVOLUTION = """
    it seems that your overused convolution modules in your model architecture,
    overusing convolutions may lead to a state of overfitting and gives the model
    since it allows the model to learn more elaborate and flexible functions.
    try to reduce the usage of convoltions layers.
    """

class DatasetProjectVerification(Enum):
    WELL_DESIGNED_DATASET = """
    the fact that there is multiple projects that have reach high accuracy rate in the range of 90% to 100% on 
    eighther train and test set verifies that the dataset is advanced and well-deigned. 
    """
    GOOD_DATASET_MANY_PROJECT = """
    it seems that your dataset is reasonably designed since there are multiple projects that 
    have reached accuracy rate in the range of 80-90%.
    the fact that none of them got spectacular high accuracy (above 90%) is rasing a red flag
    it is worth taking that into consideration, perhaps enrich or redesign of the dataset
    will automatically enhance the models performence.
    """
    GOOD_DATASET_FEW_PROJECT = """
    it seems that your dataset is reasonably designed since there are multiple projects that 
    have reached accuracy rate in the range of 75-90%.
    since there are only few projects using this dataset, it is still unknown 
    if the dataset is advanced enough.
    """
    MEDIOCRE_DATASET_FEW_PROJECT = """
    none of the projects reach accuracy rate higher then 75%
    this fact raising a red flag about the dataset quality, however 
    this dataset is slightly used and only a few projects using it.
    """
    MEDIOCRE_DATASET_MANY_PROJECT = """
    the fact that none of the projects reach accuracy rate higher then 75%
    is raising a red flag about the dataset quality.
    it is worth taking that into consideration, it may indicate that the dataset is poorly deisgned,
    perhaps enrich or redesign of the dataset will automatically enhance the models performence.
    """
    BAD_DATASET_FEW_PROJECT = """
    none of the projects reach accuracy rate higher then 55%
    this fact raising a red flag about the dataset quality, however 
    this dataset is slightly used and only a few projects using it.
    """
    BAD_DATASET_MANY_PROJECT = """
    the fact that none of the projects reach accuracy rate higher then 55%
    is raising a red flag about the dataset quality.
    it is worth taking that into consideration, it may indicate that the dataset is poorly deisgned,
    perhaps enrich or redesign of the dataset will automatically enhance the models performence.
    """
    NONE_PROJECT = """
    this dataset does not used by any project, 
    when used it will give additional information which verify whether the dataset is well or poorly deisgned.
    """

class ParameterConclusion(Enum):
    BLANK = ""
    VERSTILE = """
    you have tried only few values,
    trying out different options is essential for better analysis.
    """ 
    TOO_LOW_VALUES = """
    it seems that the values you have tried for this hyper-parameter is too low,
    try to use higher values.
    """
    TOO_HIGH_VALUES = """
    it seems that the values you have tried for this hyper-parameter is too high,
    try to use lower values.
    """
    REASONABLE = """
    it seems that the hyper-parameters you have set are reasonable and fit your model
    it is essential to try out different options to maximize your performence
    however, it doesn't seem to make a significance impact.
    """

class ModelError(Enum):
    CREATE_MODEL = """
    the application has encountered a problem in create or initialize model instance,
    the error message is: 
    """
    CREATE_MODEL_SUCCESS = """
    the operation of initialize and create the model instance is valid
    and the application encountered no exceptions or errrors. 
    """
    DATASET_EXIST = """
    you have defined and build your dataset as required.
    """
    DATASET_NOT_EXIST = """
    you didn't set or build a dataset for your model,
    dataset is integral part of machine-learning projects and you can't run or train your model
    without declare set of samples for training process.
    """
    ITEMS_EXISTS = """
    the dataset you have set is not empty and has samples to train the model on.
    """
    DATASET_FAIL_ITEMS = """
    set a dataset or build a new one, make sure to insert samples to train your model on.
    """
    DATASET_FAIL_LABELS = """
    select a dataset or build a new one, make sure to define your classes or labels
    for your classification task.
    """
    ITEMS_NOT_EXIST = """
    your defined dataset is empty and has no samples ,
    dataset is integral part of machine-learning projects and you can't run or train your model
    without set of samples for training process.
    """
    LABELS_EXISTS = """
    the dataset you have set has multiple layers for the classification problem as required
    """
    LABELS_NOT_EXIST = """
    your defined dataset have not defined any layers,
    the classification problem is not clear, you have to declare set of classes or labels
    a part of your classification task.
    """
    RUN_DATASET_PROBLEMS = """
    the application cannot run or train your model if you have errors or
    exceptions in design your dataset.
    fix this errors and try again.
    """
    RUN_CREATE_PROBLEMS = """
    the application cannot run or train your model if you have errors or
    exceptions in model initliazation or creation.
    fix this errors and try again
    """
    LABELS_OUTPUT_MATCH = """
    the dimension of your model output match the number of layers you have declared
    in your dataset
    """
    CANT_LABELS_OUTPUT= """
    the application encountered errors or exceptions perior for this test,
    fix this issues and try again.
    """
    RUN_SUCCESS = """
    the application hasn't detech any excpetions or errors during training process,
    the model is able to run successfully.
    """
    RUN_ERROR = """
    the application has encountered an error during training process,
    the error message is: 
    """
    LAYERS_FILE_UNSET = """
    you haven't set an architercture for your project,
    first you need to define your model structure in model layers tab
    and then you can train your customizable model.
    """ 
    IMAGE_SIZE_ERROR = """
    image size that have been set is invalid, it must be an integer positive number.
    you are able to change it through general details tab
    """
    PARTITIONS_ERROR = """
    partitions that have been set is invalid, the values should sum up to 1.
    you are able to change it through general details tab
    """
    KNOWN_MODEL_UNSELECTED = """
    you have chosen well-known model mode project but you didn't select
    specific model yet. 
    """
    GOOD_SETTINGS = """
    the settings you have set are valid and has not exceptions
    """
    NAME_ERROR_CREATION = """
    syntax error - there is a name error detected in model initialization.
    """
    NAME_ERROR_RUN = """
    syntax error - there is a name error detected in model training.
    """
    MODULE_NOT_FOUND = """
    module not found: the import statement has troubles trying to load a module
    you have imported an element that cannot be found.
    """
    TYPE_ERROR = """
    type error - there is a type mismatch between the value the module expect to gain and
    the value that has been assigned.
    """
    UNEXPECTED_KEYWORD = """
    a module in your model implementation have gained an unexpected keyword arguemnt
    named as
    """
    NO_FILES = """
    you haven't upload any code files and implementaton of your model yet.
    upload the files and test your model validity afterward.
    """
    NO_MAIN_FILE = """
    the main code file of your model implementation should be called model.py,
    rename or reupload your file with the aformentioned name.
    """
    MODEL_CLASS_UNDEFINED = """
    your model class should be named as class Model,
    please follow this instruction and reupload your model code files.
    """
    NOT_ENOUGH_SAMPLES = """
    according to the division rule of the dataset into three disjoint sets that you have set,
    the dataset has insufficient number of samples such that one of them is empty set.
    """