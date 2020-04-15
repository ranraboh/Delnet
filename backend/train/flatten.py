import torch.nn as tnn

class Flatten(tnn.Module):
    def forward(self, x):
        out = x.view(x.size()[0], -1)
        return out