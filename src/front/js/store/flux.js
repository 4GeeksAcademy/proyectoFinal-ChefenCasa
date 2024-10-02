const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			recetas:[],
			
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

			
			obtenerRecetas : async () => {
				const apiKey='1d3c5f8b46cf4b2c92c6107cc8673de7'
				const url = `https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`;
				
				try {
					const response = await fetch(url);					
					if (!response.ok) {
						throw new Error('Error al obtener las recetas');
					}
										
					const data = await response.json();
					const recetas = data.recipes; 
			
					const resultados = recetas.map((receta) => ({
						id: receta.id,
						title: receta.title,
						image: receta.image,
						dieta: receta.diets,
						instructions: receta.instructions 
							? receta.instructions 
							: 'Lamentablemente, no hay instrucciones disponibles para esta receta. ¡Intenta otra receta!',
						tiempo_de_coccion: receta.readyInMinutes 
							? `${receta.readyInMinutes} minutos`
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
			
						//con el for recorro data y obtengo api_receta_id
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
			
									console.log("titulo obtenido correctamente" , 200);
									
								} catch (error) {
									console.error(`Error en la llamada a la API de Spoonacular para el id ${receta.api_receta_id}:`, error);
									return receta; // Retornar el menú sin cambios si falla el fetch
								}
							})();
			
							// hago un push con la promesa (async function) al array
							respuestaPromesaTitulos.push(apiResponse);
						}
			
						// Promise.all me sirve para que se ejecuten todas las promesas juntas, por si tengo mas de una, y no hacer un fetch por cada una.
						const tituloReceta = await Promise.all(respuestaPromesaTitulos);
			
						console.log("Titulos de las recetas:", tituloReceta);
			
						return tituloReceta; // Devolver el array de menús con los títulos de las recetas
					}
				} catch (error) {
					console.error('Error durante la autenticación o al obtener datos', error);
				}
			},
			
		}
	};
};

export default getState;
