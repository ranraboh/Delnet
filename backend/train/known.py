import torchvision
import torchvision.models as models

def ObtainKnownModel(name, labels_quantity):
    model = k_models[name].cuda()
    num_features = model.fc.in_features
    model.fc = torch.nn.Linear(num_features, labels_quantity).cuda()
    return model

k_models = {
    'Resnet18': torchvision.models.resnet18,
    'Resnet34': torchvision.models.resnet34,
    'Resnet50': torchvision.models.resnet50,
    'Resnet101': torchvision.models.resnet101,
    'Resnet151': torchvision.models.resnet152,
    'Alexnet': torchvision.models.AlexNet
}