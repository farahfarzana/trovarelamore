from db import db

class PhotoModel(db.Model):
    __tablename__ = 'photo'

    id = db.Column(db.Integer, primary_key=True)
    file = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __init__(self, file, user_id):
        self.file = file
        self.user_id = user_id

    def json(self):
        return {'file': self.file, 'user_id': self.user_id}
    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    @classmethod
    def find_by_user_id(cls, id):
        return cls.query.filter_by(user_id=user_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()