import graphene
from graphene_django import DjangoObjectType
from todoapp.models import Todo, Project
from usersapp.models import Users


class UserType(DjangoObjectType):

    class Meta:
        model = Users
        exclude = ['password', 'user_permissions', 'is_superuser', 'is_staff', 'last_login']


class TodoType(DjangoObjectType):

    class Meta:
        model = Todo
        fields = '__all__'


class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_todos = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)
    user = graphene.Field(UserType, pk=graphene.Int(required=True))
    todo = graphene.Field(TodoType, pk=graphene.Int(required=True))
    project = graphene.Field(ProjectType, pk=graphene.Int(required=True))

    def resolve_all_users(root, info):
        return Users.objects.all()

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_user(root, info, pk):
        try:
            return Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return None

    def resolve_todo(root, info, pk):
        try:
            return Todo.objects.get(pk=pk)
        except Todo.DoesNotExist:
            return None

    def resolve_project(root, info, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None


class UserMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, id, first_name, last_name):
        try:
            user = Users.objects.get(pk=id)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            return cls(user)
        except Users.DoesNotExist:
            return None


class Mutation(graphene.ObjectType):
    update_user = UserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
