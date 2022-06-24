import graphene
import graphql_jwt
from graphql_auth.schema import MeQuery
from graphql_auth import mutations
from django.dispatch import receiver
from graphql_jwt.refresh_token.signals import refresh_token_rotated
from projects.schema import ProjectQuery


@receiver(refresh_token_rotated)
def revoke_refresh_token(_, request, refresh_token, **kwargs):
    refresh_token.revoke(request)


class Query(MeQuery, ProjectQuery, graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    login = mutations.ObtainJSONWebToken.Field()
    verify_token = mutations.VerifyToken.Field()
    refresh_token = mutations.RefreshToken.Field()
    revoke_token = mutations.RevokeToken.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    # Long running refresh tokens
    delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
