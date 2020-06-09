from backend.actions.dataset import *
from backend.analyze.enums import StandardSize
from backend.actions.general import float_precision
from backend.actions.dataset import get_project_dataset
from backend.analyze.text import DatasetProjectVerification
import copy
import math

class DatasetAnalyzer():
    def __init__(self, dataset_id):
        self.dataset = dataset_by_id(dataset_id)

        # load essential data
        self.total_items = compute_items_quantity(self.dataset.id)
        self.labels = items_per_label(self.dataset.id)
        self.labels_quantity = len(self.labels)
        self.items_quantity_vector = torch.zeros(self.labels_quantity)
        for index, label in enumerate(self.labels):
            self.items_quantity_vector[index] = label.items_quantity

    def report_imperfections(self):
        # in case dataset analysis didn't triggered yet
        if not self.dataset_analysis:
            self.dataset_analysis = self.analyze()
        
        # holds the critical and minor imperfections
        criticals = []
        warnings = []

        # conditions to include faults in imperfections report
        if self.dataset_analysis['size']['size_category'] in [ DatasetSize.SMALL, DatasetSize.EXTRA_SMALL ]:
            criticals.append(self.dataset_analysis['size']['info_representation'])
        elif self.dataset_analysis['size']['size_category'] == DatasetSize.MEDIOCRE:
            warnings.append(self.dataset_analysis['size']['info_representation'])
        if self.dataset_analysis['standard_deviation']['category'] in [ DistributionSize.UNEVEN_DISTRIBUTED, DistributionSize.REDICIOUSLY_UNBALANCED ]:
            criticals.append(self.dataset_analysis['standard_deviation']['distribution_text'])
        elif self.dataset_analysis['standard_deviation']['category'] == DistributionSize.SLIGHTLY_UNBALANCED:
            warnings.append(self.dataset_analysis['size']['info_representation'])
        return {
            'critical': criticals,
            'warnings': warnings
        }

    def format_response(self):
        if not self.dataset_analysis:
            self.dataset_analysis = self.analyze()
        analysis = copy.deepcopy(self.dataset_analysis)
        analysis['size']['size_category'] = analysis['size']['size_category'].name
        analysis['standard_deviation']['category'] = analysis['standard_deviation']['category'].name
        for _, label in analysis['balance'].items():
            label['standard_category'] = label['standard_category'].name
        return analysis

    def analyze(self):
        self.dataset_analysis = {
            'size': self.datasetSize(),
            'mean': self.mean(),
            'standard_deviation': self.standard_deviation(),
            'balance': self.datasetBalance(text=True),
            'labels_quantity': self.labels_quantity,
            'projects': self.project_verifications()
        }
        return self.format_response()

    def datasetSize(self):
        size = compute_items_quantity(self.dataset.id)
        if size < DatasetSize.EXTRA_SMALL.value: 
            size_category = DatasetSize.EXTRA_SMALL
        elif size < DatasetSize.SMALL.value:
            size_category = DatasetSize.SMALL
        elif size < DatasetSize.MEDIOCRE.value:
            size_category = DatasetSize.MEDIOCRE
        elif size < DatasetSize.BIG.value:
            size_category = DatasetSize.BIG
        else:
            size_category = DatasetSize.HUGE
        return { 'size': size, 'size_category': size_category, 'info_representation': self.size_text(size_category) }

    def datasetBalance(self, text):
        # compute mean and standard_deviation
        labels = {}
        mean = self.mean()
        std = self.standard_deviation()['value']

        # compute stadard score for each label to determine whether the number
        # of samples of this label is radical or not.
        for label in self.labels:
            standard_score = (label.items_quantity - mean) / std
            if standard_score < StandardSize.BALANCE.value:
                standard_category = StandardSize.BALANCE
            elif standard_score < StandardSize.SOMEWHAT_REDICAL.value:
                standard_category = StandardSize.SOMEWHAT_REDICAL
            elif standard_score < StandardSize.RADICAL.value:
                standard_category = StandardSize.RADICAL
            else:
                standard_category = StandardSize.EXTREMLY_RADICAL
            labels[label.id] = {
                'id': label.id,
                'name': label.name,
                'quantity': label.items_quantity,
                'standard_score': float_precision(standard_score, 4),
                'standard_category': standard_category,
                'distribution_text': ''
            }
            if text:
                labels[label.id]['description'] = self.description(standard_category)
                labels[label.id]['offer'] = self.offer(standard_category, standard_score , label.name)
        return labels
        
    def mean(self):
        return torch.mean(self.items_quantity_vector)

    def standard_deviation(self):
        std = torch.std(self.items_quantity_vector)
        if math.isnan(std):
            return { 'value': 0, 'category': 'WELL_BALANCED' }
        if std < DistributionSize.WELL_BALANCED.value: 
            std_category = DistributionSize.WELL_BALANCED
        elif std < DistributionSize.BALANCED.value:
            std_category = DistributionSize.BALANCED
        elif std < DistributionSize.SLIGHTLY_UNBALANCED.value:
            std_category = DistributionSize.SLIGHTLY_UNBALANCED
        elif std < DistributionSize.UNEVEN_DISTRIBUTED.value:
            std_category = DistributionSize.UNEVEN_DISTRIBUTED
        else:
            std_category = DistributionSize.REDICIOUSLY_UNBALANCED
        return { 'value': std, 'category': std_category }

    def size_text(self, size_category):
        text = {
            DatasetSize.EXTRA_SMALL: 'dataset size considered to be extra small, machine-learning model need larger number of samples to train on to acheive its goal',
            DatasetSize.SMALL: 'dataset size considered to relatively small, machine-learning models need larger number of samples to train on to acheive its goal',
            DatasetSize.MEDIOCRE: 'dataset size considered to be mediocre, it is highly recommended to enrich your dataset to gain better results',
            DatasetSize.BIG: 'dataset size considered to be big, adding more samples might improve your model',
            DatasetSize.HUGE: 'dataset size considered to be huge and hopefully well-fitted to your task',
        }
        return text[size_category]

    def description(self, standard_category):
        if standard_category == StandardSize.TIGHTLY_BALANCE:
            return 'number of items of this label is extermely close to the mean'
        elif standard_category == StandardSize.BALANCE:
            return 'number of items of this label is relatively close to the mean'
        elif standard_category == StandardSize.SOMEWHAT_REDICAL:
            return 'number of items of this label is somewhat redical and a bit far from mean'
        elif standard_category == StandardSize.RADICAL:
            return 'number of items of this label is redical and far from the mean value'
        else:
            return 'number of items of this label is extremely redical, the model might tend too much toward predicting this label'

    def offer(self, standard_category, standard_score, name):
        if standard_category == StandardSize.SOMEWHAT_REDICAL:
            if standard_score < 0:
                return 'adding more samples of ' + name + ' will balance the dataset'
            else:
                return 'consider eigther insert more samples of other labels or remove samples of this label'
        elif standard_category == StandardSize.RADICAL or standard_category == StandardSize.EXTREMLY_RADICAL:
            return 'consider re-design you dataset to make it more balanced'
        return ''
    
    def project_verifications(self):
        max_accuracy = 0
        projects = get_dataset_projects(self.dataset.id)
        status = DatasetProjectVerification.NONE_PROJECT
        for project in projects:
            if project.result > max_accuracy:
                if project.result > 90:
                    status = DatasetProjectVerification.WELL_DESIGNED_DATASET
                elif project.result > 75:
                    status = DatasetProjectVerification.GOOD_DATASET_FEW_PROJECT
                elif project.result > 60:
                    status = DatasetProjectVerification.MEDIOCRE_DATASET_FEW_PROJECT
                else:
                    status = DatasetProjectVerification.BAD_DATASET_FEW_PROJECT
                max_accuracy = project.result

        # evaluate quantity of project that used this dataset and change analysis accordingly
        projects_quantity = projects.count()
        if projects_quantity > 5:
            if status == DatasetProjectVerification.GOOD_DATASET_FEW_PROJECT:
                status = DatasetProjectVerification.GOOD_DATASET_MANY_PROJECT
            elif status == DatasetProjectVerification.MEDIOCRE_DATASET_FEW_PROJECT:
                status = DatasetProjectVerification.MEDIOCRE_DATASET_MANY_PROJECT
            elif status == DatasetProjectVerification.BAD_DATASET_FEW_PROJECT:
                status = DatasetProjectVerification.BAD_DATASET_MANY_PROJECT
        return {
            'max': max_accuracy,
            'quantity': projects_quantity,
            'status': status.name,
            'text': status.value
        }
    
class DatasetSize(Enum):
    EXTRA_SMALL = 500
    SMALL = 5000
    MEDIOCRE = 10000
    BIG = 30000
    HUGE = 50000

class DistributionSize(Enum):
    WELL_BALANCED = 50
    BALANCED = 100
    SLIGHTLY_UNBALANCED = 250
    UNEVEN_DISTRIBUTED = 1000
    REDICIOUSLY_UNBALANCED = 2000