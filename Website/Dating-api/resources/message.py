from flask_restful import Resource, reqparse, request
from models.message import MessageModel


class Message(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('user_id',
                        type=int,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('sender_id',
                        type=int,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('message',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    def get(self):
        id = request.args.get('id', None)
        user_id = request.args.get('user_id', None)
        sender_id = request.args.get('user_id', None)
        data = None
        if id:
            data = MessageModel.find_by_id(id)
        elif user_id:
            data = MessageModel.find_by_user_id(user_id)
        else:
            data = MessageModel.find_by_sender_id(sender_id)
        
        if data:
            if id is None:
                return {'messages': list(map(lambda x: x.json(), data))}, 200
            return data.json()
        return {'message': 'message not found'}, 404
    def post(self):
        data = Message.parser.parse_args()
        
        messageing = MessageModel(**data)

        try:
            messageing.save_to_db()
        except:
            return {"message": "An error occurred inserting the message."}, 500

        return messageing.json(), 201