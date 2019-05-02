#!/usr/bin/env python3
from flask import Flask
from flask_restful import Api
from flask_jwt import JWT
from flask_cors import CORS
from security import authenticate, identity
from resources.user import UserRegister
from resources.item import Item, ItemList
from resources.store import Store, StoreList
from resources.cafe import Cafe, CafeList
from resources.booking import Booking
from resources.photo import Photo
from resources.chat import Chat
from resources.current_user import CurrentUser
from resources.upload import UploadFile
from datetime import timedelta, datetime  # , datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['JWT_EXPIRATION_DELTA'] = timedelta(days=2)
app.secret_key = 'dating'
api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()


jwt = JWT(app, authenticate, identity)  # /auth

api.add_resource(Store, '/store/<string:name>')
api.add_resource(StoreList, '/stores')
api.add_resource(Item, '/item/<string:name>')
api.add_resource(ItemList, '/items')
api.add_resource(UserRegister, '/register/')
api.add_resource(Cafe, '/cafe/')
api.add_resource(CafeList, '/cafes/')
api.add_resource(Booking, '/booking/')
api.add_resource(Photo, '/photo/')
api.add_resource(Chat, '/chat/')
api.add_resource(CurrentUser, '/me/')
api.add_resource(UploadFile, '/upload/')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)

