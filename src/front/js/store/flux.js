const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			recetas: [],
			menuSemanal: [],
			favoritos: []

		},
		actions: {

			login: async (dataUser) => {

				const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(dataUser),
					headers: {
						"Content-Type": "application/json"
					}

				})

				const data = await response.json()

				if (response.status !== 200) {

					return false
				}
				else {
					localStorage.setItem("token", data.token)
					localStorage.setItem("user_id", data.user_id)
					localStorage.setItem("user_name", data.name)
					localStorage.setItem("user_email", dataUser.email)

					return true
				}

			},

			signUp: async (name, email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						body: JSON.stringify({
							name: name,
							email: email,
							password: password,
							is_active: true
						}),
						headers: {
							"Content-Type": "application/json"

						}
					})

					const data = await response.json();
					// Verifica si la respuesta fue exitosa
					if (response.status !== 200) {
						alert(data.msg)
						console.error('Error en el registro:', data); // Muestra el error en la consola
						return false; // Retorna false si la respuesta no es exitosa
					}
					else {

						return true; // Retorna true si el registro fue exitoso
					}
				} catch (error) {
					console.error('Error en la solicitud de registro:', error); // Manejo de errores de red
					return false; // Retorna false en caso de error
				}
			},

			autentificacion: async () => {

				const token = localStorage.getItem('token')

				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/protected', {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						}

					});

					if (!response.ok) {
						return false
					} else {
						const data = await response.json()

						return true


					}
				} catch (error) {
					console.error('error durante la autentificación', error);
					return false
				}


			},

			modificar: async (id, name, email) => {

				const response = await fetch(process.env.BACKEND_URL + `/api/modificar/${id}`, {
					method: "PUT",
					body: JSON.stringify({
						name: name,
						email: email
					}),
					headers: {
						"Content-Type": "application/json"
					}

				})

				const data = await response.json()

				if (response.status == 200) {

					localStorage.setItem("user_name", data.name)
					localStorage.setItem("user_email", data.email)

				}

				return data

			},



			obtenerRecetas: async () => {
				const apiKey = '397a079f3b2045078c4a4e6537ccf023'
				const url = `https://api.spoonacular.com/recipes/random?number=2&apiKey=${apiKey}`;

				try {
					const response = await fetch(url);
					if (!response.ok) {
						throw new Error('Error al obtener las recetas');
					}


					const data = await response.json();
					const recetas = data.recipes;
					//cuando va asyn y cuando no en el map(asyn(receta))
					const resultados = recetas.map((receta) => ({
						id: receta.id,
						title: receta.title,
						image: receta.image,
						dieta: receta.diets,
						ingredientes: receta.extendedIngredients.map((ingrediente) => ({
							ingrediente: ingrediente.name
						})),
						instructions: receta.instructions
							? receta.instructions
							: 'Lamentablemente, no hay instrucciones disponibles para esta receta. ¡Intenta otra receta!',
						tiempo_de_coccion: receta.readyInMinutes
							? `${receta.readyInMinutes} minutes`
							: 'El tiempo de cocción no está disponible. Consulta los detalles de la receta para más información.',
						pasos: (receta.analyzedInstructions && receta.analyzedInstructions.length > 0 && receta.analyzedInstructions[0].steps)
							? receta.analyzedInstructions[0].steps
							: 'Los pasos no están disponibles.'

					}));


					const store = getStore();
					setStore({ ...store, recetas: resultados });



				} catch (error) {
					console.error('Error al obtener las recetas:', error);
				}
			},


			obtenerRecetaIndividual: async (apiRecetaId) => {
				const apiKey = '397a079f3b2045078c4a4e6537ccf023'
				const url = `https://api.spoonacular.com/recipes/${apiRecetaId}/information?includeNutrition=false&apiKey=${apiKey}`;

				try {
					const response = await fetch(url);
					if (!response.ok) {
						throw new Error('Error al obtener las recetas');
					}

					const data = await response.json();
					const receta = data;


					//cuando va async y cuando no en el map(asyn(receta))
					const resultados = ({
						id: receta.id,
						title: receta.title,
						image: receta.image,
						dieta: receta.diets,
						ingredientes: receta.extendedIngredients.map((ingrediente) => ({
							ingrediente: ingrediente.name
						})),
						instructions: receta.instructions
							? receta.instructions
							: 'Lamentablemente, no hay instrucciones disponibles para esta receta. ¡Intenta otra receta!',
						tiempo_de_coccion: receta.readyInMinutes
							? `${receta.readyInMinutes} minutes`
							: 'El tiempo de cocción no está disponible. Consulta los detalles de la receta para más información.',
						pasos: (receta.analyzedInstructions && receta.analyzedInstructions.length > 0 && receta.analyzedInstructions[0].steps)
							? receta.analyzedInstructions[0].steps
							: 'Los pasos no están disponibles.'

					})

					//const store = getStore();
					//setStore({ ...store, recetas: resultados });

					console.log(store.recetas)


				} catch (error) {
					console.error('Error al obtener las recetas:', error);
				}
			},


			obtenerMenu: async () => {
				const token = localStorage.getItem('token');
				const apiKey = '397a079f3b2045078c4a4e6537ccf023'

				try {
					// obtener el menú semanal desde nuestra base
					const response = await fetch(process.env.BACKEND_URL + '/api/menuSemanal', {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						}
					});

					if (!response.ok) {
						console.log('Error al obtener el menú');
					} else {
						const data = await response.json(); // Array de menús semanales
						console.log("Menús obtenidos:", data);

						// Acá guardo la promesa de info de la api(los titulos)
						const respuestaPromesaTitulos = [];

						//con el for recorro data y obtengo api_receta_id (receta)
						for (let receta of data) {

							const apiResponse = (async () => {
								try {
									const response = await fetch(`https://api.spoonacular.com/recipes/${receta.api_receta_id}/information?apiKey=${apiKey}`);

									if (!response.ok) {

										throw new Error(`Error al obtener la receta con id ${receta.api_receta_id}`);

									}

									//detro de response vienen todos los datos de la receta, y solo necesitamos el titulo
									const recetaData = await response.json();
									receta.receta_title = recetaData.title;

									console.log("titulo obtenido correctamente", 200);

									return receta;

								} catch (error) {
									console.error(`Error en la llamada a la API de Spoonacular para el id ${receta.api_receta_id}:`, error);
									return receta;
								}
							})();

							// hago un push con la promesa (async function) al array
							respuestaPromesaTitulos.push(apiResponse);
						}

						// Promise.all me sirve para que se ejecuten todas las promesas juntas, por si tengo mas de una, y no hacer un fetch por cada una.
						const tituloReceta = await Promise.all(respuestaPromesaTitulos);

						console.log("Titulos de las recetas:", tituloReceta);

						// Guardar en el store
						setStore({ menuSemanal: tituloReceta });
						//localStorage.setItem("user_name", data.name)
					}
				} catch (error) {
					console.error('Error durante la autenticación o al obtener datos', error);
				}
			},

			guardarMenu: async (dia_semana, tipo_comida, api_receta_id) => {

				// Si en el localstore no hay menu, se hace el fetch al backend
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/guardarmenu`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						},
						body: JSON.stringify({
							dia_semana: dia_semana,
							tipo_comida: tipo_comida,
							api_receta_id: api_receta_id
						})
					});


					if (!response.ok) {
						// Manejo de errores más específico
						const errorData = await response.json();
						alert(errorData.msg);

					}
					else {
						alert('Menú guardado correctamente.')
					}

				} catch (error) {
					console.log("Se produjo un error durante la solicitud:", error);
				}

			},

			obtenerFavoritos: async () => {
				const token = localStorage.getItem('token');
				const apiKey = '397a079f3b2045078c4a4e6537ccf023'

				try {
					// Obtengo los favoritos desde nuestra base de datos
					const response = await fetch(process.env.BACKEND_URL + '/api/favoritos', {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						}
					});

					if (!response.ok) {
						console.log('Error al obtener favoritos');
						return;
					}

					const data = await response.json(); // Array de favoritos
					console.log("Favoritos obtenidos:", data);

					// cambio el for por map 
					const respuestaApi = await Promise.all(
						data.map(async (receta) => {
							try {
								const apiFetchResponse = await fetch(`https://api.spoonacular.com/recipes/${receta.api_receta_id}/information?apiKey=${apiKey}`);

								if (!apiFetchResponse.ok) {
									throw new Error(`Error al obtener la receta con id ${receta.api_receta_id}`);
								}

								const recetaData = await apiFetchResponse.json(); // recetaData es la respuesta de la api a ese id

								// Asignar los datos obtenidos a la receta original
								return {
									...receta,
									receta_title: recetaData.title,
									imagen: recetaData.image,
									ingredientes: recetaData.extendedIngredients ? recetaData.extendedIngredients.map(ingrediente => ingrediente.name) : [],
									tiempo_de_coccion: recetaData.readyInMinutes,
								};

							} catch (error) {
								console.error(`Error en la llamada a la API de Spoonacular para el id ${receta.api_receta_id}:`, error);
								return receta; // Devolver la receta sin cambios si hay un error
							}
						})
					);

					console.log("Datos de las recetas:", respuestaApi);

					// Guardar en el store
					setStore({ favoritos: respuestaApi });

				} catch (error) {
					console.error('Error durante la autenticación o al obtener datos', error);
				}
			},

			//CERRAR SESION
			cerrarSesion: async (history) => {
				try {
					// Eliminar el token de localStorage
					localStorage.removeItem('token');

					// Hacer la solicitud al backend para cerrar sesión
					const response = await fetch(`${process.env.BACKEND_URL}/api/logout`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (response.ok) {
						alert("Sesión cerrada correctamente");
						history.push('/');
					} else {
						alert("Error al cerrar sesión");
					}
				} catch (error) {
					console.error("Error al cerrar sesión", error);
				}
			},

			//Guardar favoritos
			addFavoritos: async (api_receta_id) => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/guardarfavoritos`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						},
						body: JSON.stringify({
							api_receta_id: api_receta_id,
						})
					});
					if (!response.ok) {
						const errorData = await response.json();
						alert(errorData.msg);

					} else {
						alert('Receta agregada a favoritos')
						getActions().obtenerFavoritos()
					}
				} catch (error) {
					console.log("Se produjo un error durante la solicitud:", error);
				}
			},

			//Eliminar favoritos:
			eliminarFav: async (api_receta_id) => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/eliminarfav/${api_receta_id}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						},

					});
					if (!response.ok) {
						const errorData = await response.json();


					} else {
						getActions().obtenerFavoritos()
					}

				} catch (error) {
					console.log("Se produjo un error durante la solicitud:", error);
				}
			},


			//GUARDAR NOTAS
			agregarNotas: async (api_receta_id, contenido) => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/agregarnota`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						},
						body: JSON.stringify({
							api_receta_id: api_receta_id,
							contenido: contenido
						})
					});
					if (!response.ok) {
						const errorData = await response.json();
						alert(errorData.msg);

					} else {
						alert('Nota agregada')
					}
				} catch (error) {
					console.log("Se produjo un error:", error);
				}
			},

			modificarNota: async (api_receta_id, contenido) => {
				const token = localStorage.getItem("token");
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/modificarnota`, {
						method: "PUT",
						body: JSON.stringify({
							contenido: contenido,
							api_receta_id: api_receta_id
						}),
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						}
					});

					if (!response.ok) {
						const errorData = await response.json();
						alert(errorData.msg);
					} else {
						const data = await response.json();
						alert(data.msg);
					}
				} catch (error) {
					console.log("Error:", error);
				}
			},

			//POST-solicitar-restablecimiento-de-contraseña
			solicitarMailRecuperacion: async () => {
				const token = localStorage.getItem("token");
				const email = document.getElementById("email").value;

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/enviar-correo", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token,
						},
						body: JSON.stringify({
							email: email,
						}),
					});

					if (response.ok) {
						alert("¡Correo de recuperación de contraseña enviado!");
					} else if (response.status === 404) {
						alert("Correo no encontrado. Por favor intenta nuevamente.");
					} else {
						alert("Error al enviar el correo. Intenta de nuevo.");
					}
				} catch (error) {
					console.log("Se produjo un error:", error);
				}
			},

			obtenerNotas: async (apiRecetaId) => {

				const token = localStorage.getItem('token')

				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/obtenerNotas/${apiRecetaId}`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						}

					});

					if (!response.ok) {
						return false
					} else {
						console.log(apiRecetaId)
						const data = await response.json()
						localStorage.setItem('notas', data.notas);
						return true


					}
				} catch (error) {
					console.error('Error durante la obtención de las notas', error);
					return false
				}


			},

			// Función para restablecer la contraseña
			resetPassword: async (token, newPassword) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/reset-password", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							token: token,               // Enviamos el token
							new_password: newPassword   // Enviamos la nueva contraseña
						})
					});

					if (response.ok) {
						const data = await response.json();
						alert(data.message); // Mostrar el mensaje de éxito
					} else if (response.status === 400) {
						const errorData = await response.json();
						alert(errorData.error); // Mostrar el error de falta de datos
					} else if (response.status === 404) {
						const errorData = await response.json();
						alert(errorData.error); // Mostrar el error de usuario no encontrado
					} else {
						alert("Error al actualizar la contraseña.");
					}
				} catch (error) {
					console.log("Se produjo un error:", error);
					alert("Error en la solicitud.");
				}
			}

		}


	}



};

export default getState;
