const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			recetas:[]
			
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
				const apiKey='538cad08e180457eb33a329a6073cc09'
				const url = `https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`;
				
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
			}
	
		}
	};
};

export default getState;
