from db import db
from models.user import UserModel
from datetime import datetime

class MessageModel(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    sender_id = db.Column(db.String(80))
    message = db.Column(db.String(500))
    time = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, user_id, sender_id, message):
        self.user_id = user_id
        self.sender_id = sender_id
        self.message = message
        self.time = datetime.now()

    def json(self):
        return {'user_id': self.user_id, 'sender_id': self.sender_id, 'message': self.message, 'sender': UserModel.find_by_id(self.sender_id).json(), 'user': UserModel.find_by_id(self.user_id).json(), 'time': str(self.time)}
    def json_multiple(self, data):
         return {'messages': [message.json() for message in data]}
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
    
    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id)

    @classmethod
    def find_by_sender_id(cls, sender_id):
        return cls.query.filter_by(sender_id=sender_id)

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
