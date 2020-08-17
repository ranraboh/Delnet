import torch.nn as tnn
from backend.train import flatten

class Model(tnn.Module,):
    def __init__(self):
        super(Model, self).__init__()

        # init modules
        print("init layers")
        self.init_layers()
        self.init_activation()

    def init_layers(self):
        self.conv_1 = tnn.Conv2d(in_channels=3, out_channels=20, kernel_size=4, stride=1).cuda()
        self.conv_2 = tnn.Conv2d(in_channels=20, out_channels=1, kernel_size=4, stride=1).cuda()
        self.maxpool = tnn.MaxPool2d(kernel_size=2)

        self.fc_1 = tnn.Linear(in_features=169, out_features=20).cuda()
        self.fc_2 = tnn.Linear(in_features=20, out_features=5).cuda()
        self.flatten = flatten.Flatten().cuda()

    def init_activation(self):
        self.tanh = tnn.Tanh()
        self.relu = tnn.ReLU()
        self.softmax = tnn.Softmax(dim=1)

    def forward(self, *input):
        print("forward")
        print(input[0].shape)
        z1 = self.maxpool(self.conv_1(input[0]))
        print(z1.shape)
        h1 = self.tanh(z1)
        print(h1.shape)
        z2 = self.maxpool(self.conv_2(h1))
        print(z2.shape)
        h2 = self.relu(z2)
        print(h2.shape)
        h3 = self.flatten(h2)
        print(h3.shape)
        h4 = self.fc_1(h3)
        print(h4.shape)
        return self.softmax(self.fc_2(h4))







