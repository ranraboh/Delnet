from backend.celery import app
from backend.train import actions

@app.task
def run_model(request):
    print('run model task')
    print(request)
    actions.run_model(request)

@app.task
def celery_test():
    print('celery test succeed')