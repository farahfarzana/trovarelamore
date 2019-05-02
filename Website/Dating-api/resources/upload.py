from flask_restful import Resource, reqparse, request
from flask_jwt import jwt_required
import werkzeug
import os
from models.user import UserModel

class UploadFile(Resource):
    path = 'users'

    def post(self):
        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files')
        args = parse.parse_args()
      
        audioFile = args['file']
        file_name = request.form['file_name']
        
        audioFile.save(os.path.join(self.path, file_name))