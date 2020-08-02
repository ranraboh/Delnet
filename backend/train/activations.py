import torch.nn as tnn

def ObtainActivationModules():
    return activations

activations = {
    'Relu': tnn.ReLU(),
    'LeakyRelu': tnn.LeakyReLU(),
    'Sigmoid': tnn.Sigmoid(),
    'Softmax': tnn.Softmax(dim=1),
    'Tanh': tnn.Tanh(),
    'Hardtanh': tnn.Hardtanh()
}