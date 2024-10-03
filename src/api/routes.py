"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User, MenuSemanal, Favoritos
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#ruta para inicio sesión
@api.route('/login', methods=['POST'])
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
    return jsonify({'token': token_creado, 'user_id': user.id, 'name':user.name}), 200

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
    
#obtenemos los usuarios registrados
@api.route('/usuarios', methods=['GET'])
def obtenerUsuario():
    usuarios = User.query.all() #almaceno todos los usuarios 
    usuarios_json=[]
    for usuario in usuarios:
        usuarios_json.append({
            "id": usuario.id,
            "name": usuario.name,
            "email":usuario.email,
            "is_active":usuario.is_active
        })

    return jsonify(usuarios_json),200
    
@api.route('/modificar/<int:id>', methods=['PUT'])
def modificarUsuario(id):
    #primero obtengo los datos json de la solicitud 
    data = request.get_json()
    #extraígo el email y contraseña
    name = data.get('name')
    email = data.get('email')    

    user = User.query.filter_by(id=id).first()

    if user: 
        user.name = name
        user.email = email
        db.session.commit() 
        return jsonify({'msg':'Usuario modificado exitosamente', 'name':name, 'email':email}),200 
    else:
        return jsonify({'msg':'Usuario no encontrado'}),400
    
@api.route('/eliminar/<int:id>', methods=['DELETE'])
def eliminarUsario(id):
     user = User.query.filter_by(id=id)#no se ejecuta hasta que haga el user.first()
     if user.first():
         user.delete()
         db.session.commit()
         return jsonify({'msg':'Usuario eliminado exitosamente'}),200 
     else:
        return jsonify({'msg':'Usuario no encontrado'}),400


@api.route('/guardarmenu', methods=['POST'])
@jwt_required()
def guardarMenu(): 
    data = request.get_json() 
    usuarioId = get_jwt_identity()  # busco el usuario autentificado
    diaSemana = data['dia_semana']
    tipoComida = data['tipo_comida']
    apiRecetaId = data['api_receta_id']
    # Validación de datos
    if not all(key in data for key in ('dia_semana', 'tipo_comida', 'api_receta_id')):
        return jsonify({'msg': 'Faltan datos necesarios'}), 400
    
    menuSemanal = MenuSemanal.query.filter_by(usuario_id = usuarioId, dia_semana = diaSemana, tipo_comida = tipoComida).first()

    if menuSemanal:
        return jsonify({'msg': 'Este menu ya se ha guardado anteriormente en la misma fecha'}), 400

    else:
        # creo un obj vacio donde guardo el menu
        nuevoMenu = MenuSemanal(
            usuario_id=usuarioId,
            dia_semana=diaSemana,
            tipo_comida=tipoComida,
            api_receta_id=apiRecetaId
        )

        try:
            db.session.add(nuevoMenu)
            db.session.commit()
            return jsonify({'msg': 'Menú guardado'}), 200
        except Exception as e:
            db.session.rollback()  
            return jsonify({'msg': str(e)}), 500
            


@api.route('/menuSemanal/', methods=['GET'])
@jwt_required()
def get_menu_semanal():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if user is None:
        return jsonify({'msg': 'verificación incorrecta'}), 401

    menu_semanal = MenuSemanal.query.filter_by(usuario_id=current_user_id).all()

    if not menu_semanal:
        return jsonify({'msg': 'No se encontraron menús semanales para este usuario'}), 404

    resultado = [menu.serialize() for menu in menu_semanal]
    

    return jsonify(resultado), 200


#FAVORITOS

#obtenemos los favoritos
@api.route('/favoritos', methods=['GET'])
@jwt_required()
def obtenerFavorito():
    favoritos = Favoritos.query.all() #almaceno todos los favoritos 
    favoritos_json=[]
    for usuario in favoritos:
        favoritos_json.append({
            "id": favoritos.id,
            "aapi_receta_id": usuario.api_receta_id
        })
    return jsonify(favoritos_json),200
