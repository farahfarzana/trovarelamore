from db import db

class ChatModel(db.Model):
    __tablename__ = 'chat'

    id = db.Column(db.Integer, primary_key=True)
    chat_payment = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('UserModel')

    def __init__(self, chat_payment, user_id):
        self.chat_payment = chat_payment
        self.user_id = user_id

    def json(self):
        return {'chat_payment': self.chat_payment, 'user': self.user_id}
    def json_multiple(self):
        return {'chats': [chat.json() for chat in ChatModel.query.filter_by(user_id=self.user_id)]}
        
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()
    
    @classmethod
    def find_by_user_id(cls, user_id):
        return cls.query.filter_by(user_id=user_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()