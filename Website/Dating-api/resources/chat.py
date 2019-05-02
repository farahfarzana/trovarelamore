from flask_restful import Resource, reqparse, request
from models.chat import ChatModel

class Chat(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('chat_payment',
                        type=float,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('user_id',
                        type=int,
                        required=True,
                        help="This field cannot be left blank!"
                        )

    def get(self):
        id = request.args.get('id', None)
        user_id = request.args.get('user_id', None)
        if id:
            chat = ChatModel.find_by_id(id)
        else:
            chat = ChatModel.find_by_user_id(user_id)
        if chat:
            if id:
                return chat.json()
            else:
                return chat.json_multiple()
        return {'message': 'chat not found'}, 404

    def post(self):
        data = Chat.parser.parse_args()
        
        chat = ChatModel(**data)

        try:
            chat.save_to_db()
        except:
            return {"message": "An error occurred inserting the chat."}, 500

        return chat.json(), 201