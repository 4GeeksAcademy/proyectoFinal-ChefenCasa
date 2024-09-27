"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#ruta para inicio sesión
@api.route('/login', methods=['GET'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    #hago un filter para ver si tengo en la base de datos el usuario/contraseña y lo almaceno en una va. 
    user = User.query.filter_by(email=email, password=password).first()
     
    #verifico si se encuentra o no:
    if not user:
        return jsonify({'msg':'Email o contraseña incorrectos'}), 401

    #sino entra en esa condición, se inicia seción y se genera el jwt:
    token_creado = create_access_token(identity = user.id) 
    return jsonify({'token': token_creado, 'user_id': user.id}), 200

#una vez se inicia sesión, se va realizando la verificación del token. 
@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({'msg':'verificación incorrecta'}), 401
    
    return jsonify({'id':user.id, 'email':user.email})


#ruta para registro nuevos usuarios. 
@api.route('/signup', methods=['POST'])
def signup():
    #primero obtengo los datos json de la solicitud 
    data = request.get_json()
    #extraígo el email y contraseña
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    is_active = data.get('is_active')

    user = User.query.filter_by(name=name,email=email, is_active = is_active).first()

    if not user:
        
        user = User(name=name,email=email, password=password, is_active= is_active)
        #añadimos esos datos a nuestro base 
        db.session.add(user)
        db.session.commit() 
        return jsonify({'msg':'Usuario registrado exitosamente'}),200 
    elif user:
        return jsonify({'msg':'Usuario ya existe'}),400
