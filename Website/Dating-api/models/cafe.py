from db import db

class CafeModel(db.Model):
    __tablename__ = 'cafe'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    location = db.Column(db.String(255))
    price = db.Column(db.Float(precision=2))
    details = db.Column(db.String(255))

    def __init__(self, name, location, price, details):
        self.name = name
        self.location = location
        self.price = price
        self.details = details

    def json(self):
        return {'cafe': self.name, 'location': self.location, 'price': self.price, 'details': self.details}
    def json_full(self):
        return {'id': self.id, 'cafe': self.name, 'location': self.location, 'price': self.price, 'details': self.details}

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()