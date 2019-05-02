from flask_restful import Resource, reqparse, request
from flask_jwt import jwt_required, current_identity
from models.user import UserModel

class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        return {'user_data': UserModel.find_by_id(current_identity.id).json() }