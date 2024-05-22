const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	nro_doc: /^\d{8,8}$/, // 8 numeros
	pasaporte: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]/, //3 letras y 6 numeros
}
const campos = {
	nombre: false,
	apellido: false,
	correo: false,
	telefono: false
}

const validacionForm = (e) => {
	switch (e.target.name) {

		case "nombre":
			validarCampo(expresiones.nombre, e.target, `nombre`);
			break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, `apellido`);
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, `correo`);
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, `telefono`);
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo_${campo}`).classList.remove(`formulario_grupo-incorrecto`);
		document.getElementById(`grupo_${campo}`).classList.add(`formulario_grupo-correcto`);
		document.querySelector(`#grupo_${campo} i`).classList.add(`fa-check-circle`);
		document.querySelector(`#grupo_${campo} i`).classList.remove(`fa-times-circle`);
		document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove(`formulario_input-error-activo`);
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add(`formulario_grupo-incorrecto`);
		document.getElementById(`grupo_${campo}`).classList.remove(`formulario_grupo-correcto`);
		document.querySelector(`#grupo_${campo} i`).classList.add(`fa-times-circle`);
		document.querySelector(`#grupo_${campo} i`).classList.remove(`fa-check-circle`);
		document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add(`formulario_input-error-activo`);
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validacionForm);
	input.addEventListener('blur', validacionForm);
})
//No envia el formulario
formulario.addEventListener('submit', (e) => {
	e.preventDefault();


	const envioCorrecto = document.getElementById('formulario');
	if(campos.nombre && campos.apellido && campos.correo && campos.telefono == true){
		formulario.reset();

		document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');

		document.querySelectorAll('.formulario_grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario_grupo-correcto');
		});
	} else {
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
	}
});

function calcularPlazoFijo() {

	const monto = parseFloat(document.getElementById('montoPlazoFijo').value);

	const plazo = parseInt(document.getElementById('plazoPlazoFijo').value);



	const tasaAnual = 60; // Tasa de interés anual fija en Argentina (ejemplo)

	const tasaDiaria = tasaAnual / 365;

	

	const intereses = monto * tasaDiaria * plazo;

	const total = monto + intereses;



	document.getElementById('resultadoPlazoFijo').innerHTML = `

		<p>El monto a recibir al final del plazo es: <b><i>${total.toFixed(2)} ARS<i></b></p>

		<p>Intereses generados: <b><i>${intereses.toFixed(2)} ARS<i></b></p>

	`;

}



function calcularPrestamo() {

	const monto = parseFloat(document.getElementById('montoPrestamo').value);

	const plazo = parseInt(document.getElementById('plazoPrestamo').value);

	const tasa = parseFloat(document.getElementById('tasaPrestamo').value);



	const cuota = monto * (tasa / (1 - Math.pow(1 + tasa, -plazo)));

	const totalIntereses = cuota * plazo - monto;



	document.getElementById('resultadoPrestamo').innerHTML = `

		<p>La cuota mensual a pagar es de: <b><i>${cuota.toFixed(2)} ARS<i></b></p>

		<p>Total a pagar (capital + intereses):  <b><i>${(monto + totalIntereses).toFixed(2)} ARS<i></b></p>

		<p>Total de intereses a pagar:  <b><i>${totalIntereses.toFixed(2)} ARS<i></b></p>

	`;

}