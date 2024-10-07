from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_favorites = db.Table('user_favorites',
    db.Column('usuario_id', db.Integer, db.ForeignKey('usuario.id'), primary_key=True),
    db.Column('favoritos_id', db.Integer, db.ForeignKey('favoritos.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'usuario'    
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(250))
    is_active = db.Column(db.Boolean())

    favoritos = db.relationship('Favoritos', secondary=user_favorites, backref=db.backref('usuarios', lazy='dynamic'))
    menuSemanal = db.relationship('MenuSemanal', backref='usuario')
    notas = db.relationship('Notas', backref='usuario')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "is_active": self.is_active,
            "favoritos": [favorito.serialize() for favorito in self.favoritos]
        }

class Favoritos(db.Model):
    __tablename__ = 'favoritos'
    id = db.Column(db.Integer, primary_key=True)
    api_receta_id = db.Column(db.Integer)

    def serialize(self):
        return {
            "id": self.id,
            "api_receta_id" : self.api_receta_id                     
        }

class MenuSemanal(db.Model):
    __tablename__ = 'menuSemanal'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    dia_semana = db.Column(db.String(20))
    tipo_comida = db.Column(db.String(20))
    api_receta_id = db.Column(db.Integer)

    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "dia_semana": self.dia_semana,
            "tipo_comida": self.tipo_comida,
            "api_receta_id" : self.api_receta_id
        }

class Notas(db.Model):
    __tablename__ = 'notas'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    api_receta_id = db.Column(db.Integer)
    contenido = db.Column(db.Text)

    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "api_receta_id" : self.api_receta_id,
            "contendio": self.contenido
        }
