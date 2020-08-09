from django.shortcuts import render
from django.views.generic import View

class LoginView(View):
    # login page: enable user to sign into the system
    # display information about the application and its services.
    # url: /login
    login_url = './login.html'
    name = 'login'
    def get(self, request):
        return render(request, self.login_url)
    def post(self, request):
        return render(request, self.login_url)

def HomeView(request):
    # home page: the resulting page after the user logged in
    # url: /home
    return render(request, './home.html')

def SignupView(request):
    # sign up page used to register new user into the system
    # url: /register
    return render(request, './signup.html')

def ProfileView(request):
    # profile page: represent for the user his personal details and enable them to modify them
    # such as password, email and security premissions
    # url: /profile
    return render(request, './profile.html')

def ProjectsView(request):
    # projects page: enable user to perform any related actions for projects
    # represent for the logged-in user his projects, enable to build new project, shows graphs and statics and so on
    # url: /projects
    return render(request, './projects.html')

def ProjectView(request):
    # project page: unique page for a praticular project
    # enable to perform any related action of specific project such as
    # run the model, display general data and runs results and more. 
    # url: /project (browser contains the information of the particular project)
    return render(request, './project.html')

def DatasetsView(request):
    # datasets page: enable user to perform any related actions for his datasets
    # represent for the logged-in user his datasets, enable to build new dataset, shows graphs and statics and so on
    return render(request, './datasets.html')

def DatasetView(request):
    # dataset page: unique page for a praticular dataset
    # enable to perform any related action for specific dataset such as
    # add new records, delete exist records and more.
    # url: /dataset (browser contains the information of the particular dataset)
    return render(request, './dataset.html')

def AutomatedModelBuilderView(request):
    return render(request, './automated.html')

def CommunityView(request):
    return render(request, './community.html')
