from torch import optim

modules = {
    '1': optim.Adam,
    '2': optim.SGD,
    '3': optim.Adagrad,
    '4': optim.RMSprop,
    '5': optim.Adadelta,
    '6': optim.Adamax,
}