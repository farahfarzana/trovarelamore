from flask_restful import Resource, reqparse
from models.user import UserModel
from flask_jwt import jwt_required, current_identity


class Users(Resource):
    @jwt_required()
    def get(self):
        data = UserModel.json_multiple(self, current_identity.id)
        if data:
            return data
        return {"message": "Not found"}, 400

class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('gender',
                        type=str,
                        required=False,
                        help="This field cannot be blank."
                        )
    parser.add_argument('email',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('about',
                    type=str,
                    required=True,
                    help="This field cannot be blank."
                    )
    parser.add_argument('joined_date',
                        type=str,
                        required=False,
                        help="This field cannot be blank."
                        )
   
    def post(self):
        data = UserRegister.parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return {"message": "A user with that username already exists"}, 400

        user = UserModel(**data)
        user.save_to_db()

        return {"message": "User created successfully."}, 201
