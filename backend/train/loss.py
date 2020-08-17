import torch.nn as tnn

modules = {
    '1': tnn.CrossEntropyLoss,
    '2': tnn.NLLLoss,
    '3': tnn.MSELoss,
    '4': tnn.MultiLabelMarginLoss,
    '5': tnn.L1Loss,
    '6': tnn.MultiLabelSoftMarginLoss
}