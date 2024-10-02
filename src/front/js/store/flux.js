const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			recetas: [],
			menuSemanal: [],

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
				const apiKey = 'ae5c3aaa78114f5ab1ba60c9fc662b24'
				const url = `https://api.spoonacular.com/recipes/random?number=8&apiKey=${apiKey}`;

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

			obtenerMenu: async () => {
				const token = localStorage.getItem('token');
				const apiKey = 'ae5c3aaa78114f5ab1ba60c9fc662b24';

				try {
					// obtener el menú semanal desde nuestra base
					const response = await fetch(process.env.BACKEND_URL + `/api/menuSemanal`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token
						}
					});

					if (!response.ok) {
						console.error(`Error ${response.status}: ${response.statusText}`);
						throw new Error('Error al obtener el menú'); // Lanza un error para manejarlo más adelante
					}

					const data = await response.json(); // Array de menús semanales
					console.log("Menús obtenidos:", data);

					// Array para almacenar las promesas de las recetas
					const respuestaPromesaTitulos = data.map(async (receta) => {
						try {
							const response = await fetch(`https://api.spoonacular.com/recipes/${receta.api_receta_id}/information?apiKey=${apiKey}`);

							if (!response.ok) {
								throw new Error(`Error al obtener la receta con id ${receta.api_receta_id}`);
							}

							const recetaData = await response.json();
							receta.receta_title = recetaData.title; // Asignar el título a la receta

							return receta; // Retorna la receta con el título agregado
						} catch (error) {
							console.error(`Error en la llamada a la API de Spoonacular para el id ${receta.api_receta_id}:`, error);
							return receta; // Retorna la receta sin modificar
						}
					});

					// Esperar todas las promesas
					const tituloReceta = await Promise.all(respuestaPromesaTitulos);
					console.log("Titulos de las recetas:", tituloReceta);

					// Guardar en el store
					setStore({ menuSemanal: tituloReceta });

				} catch (error) {
					console.error('Error durante la autenticación o al obtener datos', error);
				}
			},
			guardarMenu: async (dia_semana, tipo_comida, api_receta_id) => {
				// Verifico si existe un menu en local
				const menuGuardado = localStorage.getItem('menuSemanal');

				if (menuGuardado.dia_semana !== dia_semana && menuGuardado.tipo_comida !== tipo_comida) {
					// Si tiene el menu guardado, lo carga:
					const menu = JSON.parse(menuGuardado);

					// Actualizo con los valores que tengo en el store
					setStore({
						menuSemanal: {
							dia_semana: menu.dia_semana,
							tipo_comida: menu.tipo_comida,
							api_receta_id: menu.api_receta_id
						}
					});

					alert('Ya hay guardado un menu semanal para ese dia')
				} else {
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
								api_receta_id: api_receta_id // Deberías asegurarte de que api_receta_id no sea null o undefined
							})
						});

						console.log('response', response)

						if (!response.ok) {
							// Manejo de errores más específico
							const errorData = await response.json();
							console.error("Error al guardar la receta en el menú:", errorData.msg || 'Error desconocido');
							return;
						}

						const data = await response.json();
						console.log("Menú agregado", data);

						// Actualizo store y localStore con los datos nuevos del menú
						setStore({
							menuSemanal: {
								dia_semana: dia_semana,
								tipo_comida: tipo_comida,
								api_receta_id: api_receta_id // Asegúrate de usar el id correcto
							}
						});

						// Se guarda en el localStore como un JSON
						localStorage.setItem('menuSemanal', JSON.stringify({
							dia_semana: dia_semana,
							tipo_comida: tipo_comida,
							api_receta_id: api_receta_id
						}));

					} catch (error) {
						console.log("Se produjo un error durante la solicitud:", error);
					}
				}
			}




		}
	}
};

export default getState;
