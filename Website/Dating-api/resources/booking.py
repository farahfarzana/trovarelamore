from flask_restful import Resource, reqparse, request
from models.booking import BookingModel


class Booking(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('cafe_id',
                        type=int,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('user_id',
                        type=int,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('booking_date',
                        type=str,
                        required=False,
                        help="This field cannot be left blank!"
                        )

    def get(self):
        id = request.args.get('id', None)
        user_id = request.args.get('user_id', None)
        print(id, 'haha')
        if id:
            booking = BookingModel.find_by_id(id)
        else:
            booking = BookingModel.find_by_user_id(user_id)
        if booking:
            if id:
                return booking.json()
            else:
                return booking.json_multiple()
        return {'message': 'booking not found'}, 404

    
    def post(self):
        data = Booking.parser.parse_args()
        
        booking = BookingModel(**data)

        try:
            booking.save_to_db()
        except:
            return {"message": "An error occurred inserting the booking."}, 500

        return booking.json(), 201