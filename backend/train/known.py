import torchvision
import torchvision.models as models
import torch
import torch.nn

def ObtainKnownModel(name, labels_quantity):
    model = k_models[name]().cuda()
    num_features = model.fc.in_features
    model.fc = torch.nn.Linear(num_features, labels_quantity).cuda()
    return model

k_models = {
    'Res Net': torchvision.models.resnet18,
    'Alex Net': torchvision.models.AlexNet,
    'Resnet18': torchvision.models.resnet18,
    'Resnet34': torchvision.models.resnet34,
    'Resnet50': torchvision.models.resnet50,
    'Resnet101': torchvision.models.resnet101,
    'Resnet151': torchvision.models.resnet152,
}