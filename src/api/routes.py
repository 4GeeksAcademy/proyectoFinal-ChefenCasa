"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, make_response, render_template
from .models import db, User, MenuSemanal, Favoritos, user_favorites, Notas 
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#ruta para inicio sesión
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    #hago un filter para ver si tengo en la base de datos el usuario/contraseña y lo almaceno en una va. 
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password): 
        return jsonify({'msg': 'Email o contraseña incorrectos'}), 401
        
    
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
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    is_active = data.get('is_active')

    user = User.query.filter_by(name=name,email=email, is_active = is_active).first()

    if not user:
        
        user = User(name=name,email=email, password=hashed_password, is_active= is_active)
        #añadimos esos datos a nuestro base 
        db.session.add(user)
        db.session.commit()  
        return jsonify({'msg':'Usuario registrado exitosamente'}),200 
    elif user:
        return jsonify({'msg':'Usuario ya existee'}),400
    
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
@jwt_required()
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

#menu semanal 
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
    usuario_id = get_jwt_identity()  # Obtén el ID del usuario autenticado

    # Filtra los favoritos por usuario
    
    usuario = User.query.get(usuario_id)
    favoritos = usuario.favoritos
    favoritos_json = [favorito.serialize() for favorito in favoritos]
  

    return jsonify(favoritos_json), 200


# Guardar favoritos
@api.route('/guardarfavoritos', methods=['POST'])
@jwt_required()
def guardarFavoritos():
    usuario_id = get_jwt_identity()
    usuario = User.query.get(usuario_id)
    print(usuario)
    data = request.get_json()
    api_receta_id = data.get('api_receta_id')
    #busco si hay fav añadidos, en caso de no..los creo:
    favorito = Favoritos.query.filter_by(api_receta_id=api_receta_id).first()
    if not favorito:
        favorito = Favoritos(api_receta_id=data['api_receta_id'])
        db.session.add(favorito)
        db.session.commit()
    if favorito in usuario.favoritos:
        return jsonify({'msg':'La receta ya esta agregada a favoritos'}), 200
    usuario.favoritos.append(favorito)
    db.session.commit()
    return jsonify({'msg': 'Receta guardada en favoritos correctamente'}), 200

    

#Eliminar favoritos
@api.route('/eliminarfav/<int:api_receta_id>', methods=['DELETE'])
@jwt_required()
def eliminarFav(api_receta_id): 
    usuario_id = get_jwt_identity()
    usuario = User.query.get(usuario_id)

    # Busco si hay un fav en la tabla 'Favoritos'
    favorito = Favoritos.query.filter_by(api_receta_id=api_receta_id).first()  

    # Verifico si existe: 
    if not favorito:
        return jsonify({'msg': 'Favorito no encontrado'}), 404
    
    if favorito not in usuario.favoritos: 
        return jsonify({'msg':'Esta receta no está en tus favoritos'}), 404
    
    usuario.favoritos.remove(favorito)
    db.session.commit()

    return jsonify({'msg': 'Favorito eliminado correctamente'}), 200




#CERRAR SESION
@api.route('/api/logout', methods=['POST'])
def logout():
    return jsonify({"message": "Usuario desconectado"}), 200


#NOTAS
@api.route('/agregarnota', methods=['POST'])
@jwt_required()
def agregarNota(): 
    data = request.get_json() 
    usuarioId = get_jwt_identity()  # busco el usuario autentificado
    contenido = data['contenido']
    apiRecetaId = data['api_receta_id']
    
    # Validación de datos
    if not all(key in data for key in ('contenido', 'api_receta_id')):
        return jsonify({'msg': 'Faltan datos necesarios'}), 400
    
        # creo un obj vacio donde guardo la nota
    nuevaNota = Notas(
            
            contenido=contenido,
            usuario_id=usuarioId,
            api_receta_id=apiRecetaId
        )

    try:
            db.session.add(nuevaNota)
            db.session.commit()
            return jsonify({'msg': 'Nota guardada exitosamente'}), 200
    except Exception as e:
            db.session.rollback()  
            return jsonify({'msg': str(e)}), 500
    

@api.route('/modificarnota', methods=['PUT'])
@jwt_required()
def modificarNota():

    #primero obtengo los datos json de la solicitud 
    data = request.get_json()
    #tomo los datos de la solicitud
    contenido = data.get('contenido')
    api_receta_id = data.get('api_receta_id')

    if not api_receta_id or not contenido:
        return jsonify({'msg': 'Faltan datos necesarios: api_receta_id o contenido'}), 400
    
    notas = Notas.query.filter_by(api_receta_id=api_receta_id).first()

    if notas: 
        notas.contenido = contenido
        db.session.commit() 
        return jsonify({'msg':'Nota modificada exitosamente', 'contenido':contenido, }),200 
    else:
        return jsonify({'msg':'no se encontro la nota'}),404
    

#RECUPERACION DE CONTRASEñA

# Serializador para crear tokens seguros
s = URLSafeTimedSerializer("codigo1518179")

# con esta ruta enviamos el correo al usuario desde nuestro mail a su mail
@api.route('/enviar-correo', methods=['POST'])
def enviar_correo():
    from app import mail, db
    data=request.get_json()
    email=data.get("email")
   
    
    # Verificar si el correo existe en la base de datos
    user = db.session.query(User).filter_by(email=email).first()

    if not user:
        return make_response(jsonify({'error': 'Email not found in the system'}), 404)
    
    # Generar token
    token = s.dumps(email, salt='password-reset-salt')
    
    # Crear enlace de restablecimiento de contraseña
    reset_link = f'http://localhost:3001/reset-password?token={token}'  # Cambia la URL según sea necesario
    
    # Preparar y enviar el correo
    msg = Message('Solicitud de Restablecimiento de Contraseña', recipients=[email], sender="chefathome.4geeks@gmail.com")
    msg.body = f'Sigue este enlace para restablecer tu contraseña: {reset_link}'
    mail.send(msg)

    return {'msg': '¡Correo enviado exitosamente!'}, 200

# poner el mensaje en ingles 

# Endpoint para actualizar la contraseña
@api.route('/reset-password', methods=['PUT'])
def reset_password():
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("new_password")

    if not token or not new_password:
        return jsonify({"error": "Faltan datos"}), 400
    
    # Verificar y decodificar el token
    try:
        email = s.loads(token, salt='password-reset-salt', max_age=3600)  # El token expira en 1 hora
    except Exception as e:
        return jsonify({"error": "Token inválido o expirado."}), 400

    user = db.session.query(User).filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Contraseña actualizada con éxito"}), 200


