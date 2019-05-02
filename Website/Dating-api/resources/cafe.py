from flask_restful import Resource, reqparse, request
from models.cafe import CafeModel

class Cafe(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('location',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('price',
                        type=float,
                        required=True,
                        help="This field cannot be left blank!"
                        )
    parser.add_argument('details',
                        type=str,
                        required=True,
                        help="This field cannot be left blank!"
                        )

    def get(self):
        name = request.args['name']
        cafe = CafeModel.find_by_name(name)
        if cafe:
            return cafe.json()
        return {'message': 'Cafe not found'}, 404

    
    def post(self):
        data = Cafe.parser.parse_args()
        if CafeModel.find_by_name(data['name']):
            return {'message': "Cafe with name '{}' already exists.".format(data['name'])}, 400
        
        cafe = CafeModel(**data)

        try:
            cafe.save_to_db()
        except:
            return {"message": "An error occurred inserting the cafe."}, 500

        return cafe.json(), 201

class CafeList(Resource):
    def get(self):
        return {'cafes': list(map(lambda x: x.json_full(), CafeModel.query.all()))}, 200