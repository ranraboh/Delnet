import torch
from torch import optim
from backend.train import optimizer
from backend.train import loss
from backend.train import actions
import torch.nn as tnn
import torch.utils.data
import math
import time

class ModelTrain(tnn.Module,):
    def __init__(self, model, train_set, dev_set, test_set, run_request, labels_quantity):
        super(ModelTrain, self).__init__()
        self.model = model
        self.run_id = run_request['run']
        self.project_id = run_request['project']
        self.labels_quantity = labels_quantity

        # init hyper-parameters
        parameters = run_request['parameters']
        self.epochs = parameters['epochs']
        self.batch_size = parameters['batch_size']
        self.optimizer, self.schdular = self.init_optimizer(parameters['optimizer'])
        self.loss_function = self.init_criterion(parameters['loss_type'])

        # init training process sets
        self.train_set = train_set
        self.dev_set = dev_set
        self.test_set = test_set

        # initialize set loaders, used to easily iterate over the sets.
        self.train_loader = torch.utils.data.DataLoader(self.train_set, batch_size=self.batch_size, shuffle=True)
        self.dev_loader = torch.utils.data.DataLoader(self.dev_set, batch_size=self.batch_size, shuffle=True)
        self.test_loader = torch.utils.data.DataLoader(self.test_set, batch_size=self.batch_size, shuffle=True)

    def init_optimizer(self, optimizer_params):
        # extract optimizer parameters
        optimizer_id = optimizer_params['optimizer']
        learning_rate = optimizer_params['learning_rate']
        weight_decay = optimizer_params['weight_decay']

        # create optimizer and schedular module objects
        optimizer_obj = optimizer.modules[str(optimizer_id)](params=self.model.parameters(), lr=learning_rate, weight_decay=weight_decay)
        schedular = optim.lr_scheduler.StepLR(optimizer_obj, step_size=1, gamma=learning_rate)
        return optimizer_obj, schedular

    def init_criterion(self, loss_type):
        return loss.modules[str(loss_type)]().cuda()

    def train(self, mode=True):
        # holds the metrics outcomes for each epoch and in total
        train_size = len(self.train_set)
        total_loss, total_accuracy = 0, 0
        batches_epoch = math.ceil(train_size / self.batch_size)

        for epoch in range(self.epochs):
            accuracy_epoch = 0
            loss_epoch = 0
            for index, data in enumerate(self.train_loader):
                # extract sample and it's label
                x, y =  data[0], data[1].cuda()

                # run feed forward process and predict the labels of current batch
                self.optimizer.zero_grad()
                output = self.model(x)

                # compute metrics over batch
                loss = self.loss_function(output, y)
                loss_epoch += loss.item()
                accuracy_epoch += (output.argmax(1) == y).sum().item()

                # run back propogation process and update the model parameters
                loss.backward()
                self.optimizer.step()

            total_loss += loss_epoch
            total_accuracy += accuracy_epoch
            dev_results = self.evaluate_over_dev()
            actions.save_epoch(epoch, { 'loss': loss_epoch / batches_epoch, 'accuracy': accuracy_epoch / train_size }, dev_results, self.epochs, self.run_id)
            time.sleep(2)

        total_loss = total_loss / (batches_epoch * self.epochs)
        total_accuracy = total_accuracy / (train_size * self.epochs)
        actions.save_epoch(self.epochs, { 'loss': total_loss, 'accuracy': total_accuracy }, dev_results, self.epochs, self.run_id)

    def evaluate_model(self, loader):
        # initialize the number of good and bad estimations
        set_size = len(loader.dataset)
        good = 0
        total_loss = 0
        batches = math.ceil(set_size / self.batch_size)

        # for compute confusion matrix
        confusion_matrix = torch.zeros(self.labels_quantity, self.labels_quantity)
        with torch.no_grad():
            # run through given set in batches
            for i, data in enumerate(loader):
                # extract sample and it's label
                x, y =  data[0], data[1].cuda()

                # run feed forward process and predict the labels of current batch
                output = self.model(x)

                # compute metrics over batch
                loss = self.loss_function(output, y)
                total_loss += loss.item()
                predictions = output.argmax(dim=1)
                print(predictions)
                for results in torch.stack((y, predictions), dim=1):
                    print (results)
                    label, prediction = results.tolist()
                    if label == prediction:
                        good = good + 1
                    confusion_matrix[label, prediction] += 1

        # returns metrics results over given set
        return { 'accuracy': float(good / set_size), 'loss': float(total_loss / batches),
                 'confusion_matrix': confusion_matrix }
    
    def evaluate_over_dev(self):
        return self.evaluate_model(self.dev_loader)

    def evaluate_over_test(self):
        return self.evaluate_model(self.test_loader)