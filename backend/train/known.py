import torchvision
import torchvision.models as models
import torch
import torch.nn

def ObtainKnownModel(name, labels_quantity):
    model = k_models[name]().cuda()
    print (name)
    if name == 'VGG' or name == "Alex Net":
        model.classifier[6] = torch.nn.Linear(4096, labels_quantity) .cuda()
    elif name == 'Squeeze Net':
        model.classifier[1] = torch.nn.Conv2d(512, labels_quantity, kernel_size=(1,1), stride=(1,1)).cuda()
    elif name == 'Inception':
        model.AuxLogits.fc = torch.nn.Linear(768, labels_quantity).cuda()    
        model.fc = torch.nn.Linear(2048, labels_quantity).cuda()
    elif name == "Alex Net" or name == "Res Net":    
        num_features = model.fc.in_features
        model.fc = torch.nn.Linear(num_features, labels_quantity).cuda()
    return model

k_models = {
    'Res Net': torchvision.models.resnet18,
    'Alex Net': torchvision.models.AlexNet,
    'Squeeze Net': torchvision.models.squeezenet1_0,
    'GoggLeNet': torchvision.models.googlenet,
    'Inception': torchvision.models.inception_v3,
    'VGG': torchvision.models.vgg11,
    'Resnet18': torchvision.models.resnet18,
    'Resnet34': torchvision.models.resnet34,
    'Resnet50': torchvision.models.resnet50,
    'Resnet101': torchvision.models.resnet101,
    'Resnet151': torchvision.models.resnet152,
}