from flask_restful import Resource, reqparse, request
from models.photo import PhotoModel


class Photo(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('file',
                        type=int,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('user_id',
                        type=int,
                        required=True,
                        help="This field cannot be left blank!"
                        )

    def get(self):
        id = request.args['user_id']
        booking = PhotoModel.find_by_user_id(id)
        if booking:
            return booking.json()
        return {'message': 'photo not found'}, 404

    
    def post(self):
        data = Photo.parser.parse_args()
        
        photo = PhotoModel(**data)

        try:
            photo.save_to_db()
        except:
            return {"message": "An error occurred inserting the photo."}, 500

        return photo.json(), 201