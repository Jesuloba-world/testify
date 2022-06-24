import graphene
from graphene_django import DjangoObjectType
from .models import Project


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class ProjectQuery(graphene.ObjectType):
    projects = graphene.List(ProjectType)

    def resolve_projects(self, info):
        return Project.objects.all()
