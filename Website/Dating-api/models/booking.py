from db import db

class BookingModel(db.Model):
    __tablename__ = 'booking'

    id = db.Column(db.Integer, primary_key=True)
    booking_date = db.Column(db.String(80))
    cafe_id = db.Column(db.Integer, db.ForeignKey('cafe.id'))
    cafe = db.relationship('CafeModel')

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('UserModel')

    def __init__(self, cafe_id, user_id, booking_date):
        self.cafe_id = cafe_id
        self.user_id = user_id
        self.booking_date = booking_date

    def json(self):
        return {'cafe': self.cafe.json(), 'user': self.user.json(), 'booking_id': self.id, 'booking_date': self.booking_date}
    def json_multiple(self):
         return {'bookings': [book.json() for book in BookingModel.query.filter_by(user_id=self.user_id)]}
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
