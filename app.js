// FORMULARIO CONTACTO (Enviar a formspree)
const $form = document.querySelector('#form')

$form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
	event.preventDefault()

	if (formIsValid())
	{
		const form = new FormData(this)
		const response = await fetch(this.action, {
			method: this.method,
			body: form,
			headers: {
				'Accept': 'application/json'
			}
		})
		if (response.ok) {
			console.log('Se envio correctamente el formulario')
		}
		resetForm();
	}
};

// VALIDACION DE FORMULARIO
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const textarea = document.querySelectorAll('#form textarea');

const expresiones = {
	apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	comentarios: /^[a-zA-ZÀ-ÿ\s]{20,300}$/ //Letras y espacios, pueden llevar acentos.
}

const campos = {
	apellido: false,
	nombre: false,
	correo: false,
	telefono: false,
	comentarios: false
}

const validarForm = (e) => {
	switch (e.target.name) {
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
			break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
		case "comentarios":
			validarCampo(expresiones.comentarios, e.target, 'comentarios');
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('form__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .form__input-error`).classList.remove('form__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('form__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('form__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .form__input-error`).classList.add('form__input-error-activo');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('blur', validarForm);
});

textarea.forEach((textarea) => {
	textarea.addEventListener('blur', validarForm);
});

function formIsValid(){
	breturn = false;

	const terminos = document.getElementById('terminos');
	if (campos.apellido && campos.nombre && campos.correo && campos.telefono && campos.comentarios && terminos.checked) {
		breturn=true;
	} else {
		document.getElementById('form__mensaje').classList.add('form__mensaje-activo');
		setTimeout(() => {
			document.getElementById('form__mensaje').classList.remove('form__mensaje-activo');
		}, 5000);
	}
	return breturn;
};

function resetForm(){
	form.reset();

	document.getElementById('form__mensaje-exito').classList.add('form__mensaje-exito-activo');
	setTimeout(() => {
		document.getElementById('form__mensaje-exito').classList.remove('form__mensaje-exito-activo');
	}, 5000);

	document.querySelectorAll('.form__grupo-correcto').forEach((icono) => {
		icono.classList.remove('form__grupo-correcto');
	});
}