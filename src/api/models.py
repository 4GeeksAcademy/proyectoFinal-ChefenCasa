from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'usuario'    
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    favoritos = db.relationship('Favoritos', backref='usuario')
    menuSemanal = db.relationship('MenuSemanal', backref='usuario')
    notas = db.relationship('Notas', backref='usuario')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "is_active": True            
        }

class Favoritos(db.Model):
    __tablename__ = 'favoritos'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    api_receta_id = db.Column(db.Integer, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "api_receta_id" : self.api_receta_id                     
        }

class MenuSemanal(db.Model):
    __tablename__ = 'menuSemanal'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    dia_semana = db.Column(db.String(20), nullable=False)
    tipo_comida = db.Column(db.String(20), nullable=False)
    api_receta_id = db.Column(db.Integer, nullable=False)

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
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    api_receta_id = db.Column(db.Integer, nullable=False)
    contenido = db.Column(db.Text, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "usuario_id": self.usuario_id,
            "api_receta_id" : self.api_receta_id,
            "contendio": self.contenido
        }

class UsuarioFavoritos(db.Model):
    __tablename__ = 'usuarioFavoritos'
    usuario_id = db.Column(db.Integer, nullable=False, primary_key=True)
    favorito_id = db.Column(db.Integer, nullable=False, primary_key=True)

    def serialize(self):
        return {
            "usuario_id": self.usuario_id,
            "favorito_id" : self.favorito_id        
        }




    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }