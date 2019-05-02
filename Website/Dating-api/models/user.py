from db import db


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    gender = db.Column(db.String(255))
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
    email = db.Column(db.String(255))
    about = db.Column(db.String(255))
    joined_date = db.Column(db.String(80))

    def json(self):
        return {
            'id': self.id,
            'username': self.username, 
            'name': self.name,
            'gender': self.gender,
            'email': self.email,
            'about': self.about,
            'joined_date': self.joined_date
        }

    def json_multiple(self, id):
         return {'users': list(map(lambda x: x.json(), UserModel.query.filter(UserModel.id != id).all()))}
        
    def __init__(self, username, password, gender, name, email, about, joined_date):
        self.username = username
        self.password = password
        self.gender = gender
        self.name = name
        self.email = email
        self.gender = gender
        self.about = about
        self.joined_date = joined_date

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
    @classmethod
    def find_all(cls):
        return cls.query.all()
