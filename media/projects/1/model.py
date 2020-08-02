import torch.nn as tnn
import torch

class Model(tnn.Module,):
    def __init__(self):
        super(Model, self).__init__()

        # init modules
        self.init_layers()
        self.init_activation()

    def init_layers(self):
        self.conv_1 = tnn.Conv2d(in_channels=3, out_channels=20, kernel_size=4, stride=1).cuda()
        self.conv_2 = tnn.Conv2d(in_channels=20, out_channels=1, kernel_size=4, stride=1).cuda()
        self.maxpool = tnn.MaxPool2d(kernel_size=3)

        self.fc_1 = tnn.Linear(in_features=169, out_features=20).cuda()
        self.fc_2 = tnn.Linear(in_features=20, out_features=2).cuda()

    def init_activation(self):
        self.tanh = tnn.Tanh()
        self.relu = tnn.ReLU()
        self.softmax = tnn.Softmax(dim=1)

    def forward(self, *input):
        z1 = self.maxpool(self.conv_1(input[0]))
        h1 = self.tanh(z1)
        z2 = self.maxpool(self.conv_2(h1))
        h2 = self.relu(z2)
        h3 = h2.view(h2.size()[0], -1)
        h4 = self.fc_1(h3)
        return self.softmax(self.fc_2(h4))







