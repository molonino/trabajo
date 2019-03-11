//VARIABLES
var formElement = null;
var nota = 0.0;
var maxTime = 180; //Segundos para hacer el test
var time;
var timer; //Timer para el intervalo

//2 Radio, 2 Text, 2 Checkbox, 2 Select, 2 Mulltiple
var answRadio1;
var answRadio2;
var answRadio3;
var answRadio4;
var answRadio5;
var answCheck1 = [];
var answCheck2 = [];
var answText1;
var answText2;
var answText3;




window.onload = function () {
    formElement = document.getElementsByTagName("form")[0];

    //Cabecera
    document.getElementById("historia").onclick = function () {
        document.getElementById("historia").style.background = "#D20808";
        document.getElementById("historia").style.color = "yellow";
        document.getElementById("normas").style.color = "white";
        document.getElementById("normas").style.background = "#53A11C";
        document.getElementById("lNormas").style.display = "none";
        document.getElementById("pHistoria").style.display = "table";
        document.getElementById("tInt").innerHTML = "Clases de magia"
    }

    document.getElementById("normas").onclick = function () {
        document.getElementById("normas").style.background = "#D20808";
        document.getElementById("normas").style.color = "yellow";
        document.getElementById("historia").style.color = "white";
        document.getElementById("historia").style.background = "#53A11C";
        document.getElementById("pHistoria").style.display = "none";
        document.getElementById("lNormas").style.display = "block";
        document.getElementById("tInt").innerHTML = "UOG - NORMATIVA"
    }

    //Boton empezar
    document.getElementById("start").onclick = function () {
        if (confirm("¿Estas seguro que deseas empezar el test? Recomendamos ver las normas")) {
            empezarTest();
            window.scrollTo(0, 0);
        }
    }

    //CORREGIR AL APRETAR EL BOTON
    formElement.onsubmit = function () {

        if (comprobarContestadas()) {
            if (confirm("¿Seguro que desea corregir?")) {
                inicializar();
                corregir();
                presentarNota();
                ocultarCorregir();
                clearInterval(timer);
                document.getElementById("timer").style.display = "none";
            }
        }
        return false;
    }

    //REGRESAR A LA PANTALLA PRINCIPAL
    document.getElementById("butRegresar").onclick = regresarMenu;

    //LEER XML
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
        }
    };
    xhttp.open("GET", "./xml.xml", true);
    xhttp.send();
}


function gestionarXml(dadesXml) {
    var xmlDoc = dadesXml.responseXML;



    //RADIO ------------------------------------------------------------
    var tituloRadio = xmlDoc.getElementsByTagName("title")[0].innerHTML;
    var xpath = "/questions/question[@id='jklm_001']/option";

    var nodosRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

    ponerDatosRadio(tituloRadio, "q1", nodosRadio, "radioDiv1");
    //ANSWER
    answRadio1 = xmlDoc.getElementById("jklm_001").getElementsByTagName('answer')[0].innerHTML;

    //-------------------------------------------

    var tituloRadio = xmlDoc.getElementsByTagName("title")[1].innerHTML;
    var xpath = "/questions/question[@id='jklm_002']/option";
    var nodosRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

    ponerDatosRadio(tituloRadio, "q2", nodosRadio, "radioDiv2");
    //ANSWER
    answRadio2 = xmlDoc.getElementById("jklm_002").getElementsByTagName('answer')[0].innerHTML;
    
     //-------------------------------------------

    var tituloRadio = xmlDoc.getElementsByTagName("title")[2].innerHTML;
    var xpath = "/questions/question[@id='jklm_003']/option";
    var nodosRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

    ponerDatosRadio(tituloRadio, "q3", nodosRadio, "radioDiv3");
    //ANSWER
    answRadio3 = xmlDoc.getElementById("jklm_003").getElementsByTagName('answer')[0].innerHTML;

    //-------------------------------------------

    var tituloRadio = xmlDoc.getElementsByTagName("title")[3].innerHTML;
    var xpath = "/questions/question[@id='jklm_004']/option";
    var nodosRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

    ponerDatosRadio(tituloRadio, "q4", nodosRadio, "radioDiv4");
    //ANSWER
    answRadio4 = xmlDoc.getElementById("jklm_004").getElementsByTagName('answer')[0].innerHTML;

    //-------------------------------------------

    var tituloRadio = xmlDoc.getElementsByTagName("title")[4].innerHTML;
    var xpath = "/questions/question[@id='jklm_005']/option";
    var nodosRadio = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);

    ponerDatosRadio(tituloRadio, "q5", nodosRadio, "radioDiv5");
    //ANSWER
    answRadio5 = xmlDoc.getElementById("jklm_005").getElementsByTagName('answer')[0].innerHTML;
    
    
    //CHECKBOX ----------------------------------------------------------
    var tituloCheckbox = xmlDoc.getElementsByTagName("title")[5].innerHTML;
    var xpath = "/questions/question[@id='jklm_006']/option";
    var nodosCheck = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
    ponerDatosCheckbox(tituloCheckbox, "q6", nodosCheck, "checkBoxDiv1");

    //ANSWER
    var nres = xmlDoc.getElementById("jklm_006").getElementsByTagName('answer').length;
    for (i = 0; i < nres; i++) {
        answCheck1[i] = xmlDoc.getElementById("jklm_006").getElementsByTagName('answer')[i].innerHTML;
    }
    
    //---------------------------------------------------------
    var tituloCheckbox = xmlDoc.getElementsByTagName("title")[6].innerHTML;
    var xpath = "/questions/question[@id='jklm_007']/option";
    var nodosCheck = xmlDoc.evaluate(xpath, xmlDoc, null, XPathResult.ANY_TYPE, null);
    ponerDatosCheckbox(tituloCheckbox, "q7", nodosCheck, "checkBoxDiv2");
    //ANSWER
    var nres = xmlDoc.getElementById("jklm_007").getElementsByTagName('answer').length;
    for (i = 0; i < nres; i++) {
        answCheck2[i] = xmlDoc.getElementById("jklm_007").getElementsByTagName('answer')[i].innerHTML;
    }
    
    
    //TEXT --------------------------------------------------------------
    var tituloText = xmlDoc.getElementsByTagName("title")[7].innerHTML;
    ponerDatosText(tituloText, "q8");
    //ANSWER
    answText1 = xmlDoc.getElementById("jklm_008").getElementsByTagName('answer')[0].innerHTML;
    
    //---------------------------------------------------------    
    tituloText = xmlDoc.getElementsByTagName("title")[8].innerHTML;
    ponerDatosText(tituloText, "q9");
    //ANSWER
    answText2 = xmlDoc.getElementById("jklm_009").getElementsByTagName('answer')[0].innerHTML;
    
    //---------------------------------------------------------    
    tituloText = xmlDoc.getElementsByTagName("title")[9].innerHTML;
    ponerDatosText(tituloText, "q10");
    //ANSWER
    answText2 = xmlDoc.getElementById("jklm_010").getElementsByTagName('answer')[0].innerHTML;

}


/**************************************************************************
                        METODOS INSERTAR DATOS
***************************************************************************/


//RADIO
function ponerDatosRadio(tituloRadio, IDposicion, nodosRadio, divID) {
    document.getElementById(IDposicion).innerHTML = tituloRadio;
    var radioContainer = document.getElementById(divID);
    var result = nodosRadio.iterateNext();
    i = 0;
    while (result) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = result.innerHTML;
        label.setAttribute("for", "rad_" + i + divID);
        input.id = "rad_" + i + divID;
        input.type = "radio";
        input.name = "rad" + divID;
        radioContainer.appendChild(input);
        radioContainer.appendChild(label);
        radioContainer.appendChild(document.createElement("br"));
        result = nodosRadio.iterateNext();
        i++;
    }

}

//TEXT
function ponerDatosText(tituloText, IDposicion) {
    document.getElementById(IDposicion).innerHTML = tituloText;
}

//CHECKBOX

function ponerDatosCheckbox(tituloCheckbox, IDposicion, nodosCheck, divID) {
    document.getElementById(IDposicion).innerHTML = tituloCheckbox;
    var checkboxContainer = document.getElementById(divID);
    var result = nodosCheck.iterateNext();
    i = 0;
    while (result) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        label.innerHTML = result.innerHTML
        label.setAttribute("for", "check_" + i + divID);
        input.id = "check_" + i + divID;
        input.type = "checkbox";
        input.name = "check" + divID;
        checkboxContainer.appendChild(input);
        checkboxContainer.appendChild(label);
        checkboxContainer.appendChild(document.createElement("br"));
        result = nodosCheck.iterateNext();
        i++
    }
}




//-----------------------------------------------------------------
//                            CORREGIR
//-----------------------------------------------------------------

function corregir() {
    document.getElementById("resultados").style.display = "block";
    addCorreccionHtml("RESULTADOS", "h2");
    document.getElementById("resultados").appendChild(document.createElement("hr"));

    addCorreccionHtml("PREGUNTA 1", "h4");
    corregirRadio("radradioDiv1", answRadio1, 1);
    addSolucionHtml(answRadio1);

    addCorreccionHtml("PREGUNTA 2", "h4");
    corregirRadio("radradioDiv2", answRadio2, 2);
    addSolucionHtml(answRadio2);

    addCorreccionHtml("PREGUNTA 3", "h4");
    corregirRadio("radradioDiv3", answRadio3, 3);
    addSolucionHtml(answRadio3);
    
    addCorreccionHtml("PREGUNTA 4", "h4");
    corregirRadio("radradioDiv4", answRadio4, 4);
    addSolucionHtml(answRadio4);
    
    addCorreccionHtml("PREGUNTA 5", "h4");
    corregirRadio("radradioDiv5", answRadio5, 5);
    addSolucionHtml(answRadio5);

    addCorreccionHtml("PREGUNTA 6", "h4");
    corregirCheckbox("checkcheckBoxDiv1", answCheck1, 6);
    addSolucionHtml(answCheck1);

    addCorreccionHtml("PREGUNTA 7", "h4");
    corregirCheckbox("checkcheckBoxDiv2", answCheck2, 7);
    addSolucionHtml(answCheck2);

    addCorreccionHtml("PREGUNTA 8", "h4");
    corregirText("text1", answText1, 8);
    addSolucionHtml(answText1);

    addCorreccionHtml("PREGUNTA 9", "h4");
    corregirText("text2", answText2, 9);
    addSolucionHtml(answText2);
    
    addCorreccionHtml("PREGUNTA 10", "h4");
    corregirText("text2", answText2, 10);
    addSolucionHtml(answText2);

    window.scrollTo(0, document.body.scrollHeight);
}


function corregirRadio(divID, answer, numPregunta) {
    var f = formElement;
    var rad;
    var fin = false;

    switch (divID) {
        case "radradioDiv1":
            rad = f.radradioDiv1;
            break;
        case "radradioDiv2":
            rad = f.radradioDiv2;
            break;
        case "radradioDiv3":
            rad = f.radradioDiv3;
            break;
        case "radradioDiv4":
            rad = f.radradioDiv4;
            break;
        case "radradioDiv5":
            rad = f.radradioDiv5;
            break;
    }

    for (i = 0; (i < rad.length) && !(fin); i++) {
        if (rad[i].checked) {
            fin = true;
            if (i == answer) {
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡CORRECTA!", "h5");
                nota += 1;
            } else {
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡INCORRECTA!", "h5");
            }
        }
    }
}


function corregirText(IDtext, answer, numPregunta) {
    var s = document.getElementById(IDtext).value;
    //Pasamos todo a minisculas para evitar conflictos
    s = s.toLowerCase();

    if (s == answer) {
        addCorreccionHtml(numPregunta + " --> ¡CORRECTA!", "h5");
        nota += 1;
    } else {
        addCorreccionHtml(numPregunta + " --> ¡INCORRECTA!", "h5");
    }
}


function corregirCheckbox(divID, answer, numPregunta) {
    // Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo
    // guarda en un array escorrecta[]
    var f = formElement;
    var escorrecta = [];
    var chk;

    switch (divID) {
        case "checkcheckBoxDiv1":
            chk = f.checkcheckBoxDiv1;
            break;
        case "checkcheckBoxDiv2":
            chk = f.checkcheckBoxDiv2;
            break;
    }

    for (i = 0; i < chk.length; i++) {  //"checkcheckBoxDiv1" es el nombre asignado a todos los checkbox
        if (chk[i].checked) {
            escorrecta[i] = false;
            for (j = 0; j < answer.length; j++) {
                if (i == answer[j]) escorrecta[i] = true;
            }
        }
    }
    //Por cada opción que está chequedada, si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    for (i = 0; i < chk.length; i++) {
        if (chk[i].checked) {
            if (escorrecta[i]) {
                nota += 1.0 / answer.length;  //dividido por el número de respuestas correctas   
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡CORRECTA!", "h5");
            } else {
                nota -= 1.0 / answer.length;  //dividido por el número de respuestas correctas   
                addCorreccionHtml(numPregunta + "." + (i) + " --> ¡INCORRECTA!", "h5");
            }
        }
    }
}



function addCorreccionHtml(s, tipoH) {
    var h = document.createElement(tipoH);
    var node = document.createTextNode(s);
    h.appendChild(node);
    document.getElementById("resultados").appendChild(h);
}

function addSolucionHtml(s) {
    var p = document.createElement("p");
    p.innerHTML = ("SOLUCIÓN: " + s);
    document.getElementById("resultados").appendChild(p);
    document.getElementById("resultados").appendChild(document.createElement("hr"));
}




function presentarNota() {
    nota = nota.toFixed(2);
    addCorreccionHtml("Nota: " + nota + " puntos sobre 10", "h2");
    if (nota >= 5) {
        alert("¡ENHORABUENA! HAS APROBADO CON UN " + nota);
    } else {
        alert("LÁSTIMA! HAS SUSPENDIDO CON UN " + nota);
    }
}


function inicializar() {
    document.getElementById('resultados').innerHTML = "";
    nota = 0.0;
}


/**
 * Comprueba que todas las preguntas esten contestadas antes de corregir el test
 */
function comprobarContestadas() {
    var f = formElement;
    var checked = false;
    var cnt = 0;

    //Empezamos mirando los radio
    for (i = 0; i < f.radradioDiv1.length; i++) {
        if (f.radradioDiv1[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la primera pregunta!");
        f.elements[0].focus();
        return false;
    }
    cnt += f.radradioDiv1.length;
    checked = false;

    for (i = 0; i < f.radradioDiv2.length; i++) {
        if (f.radradioDiv2[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la segunda pregunta!");
        f.elements[f.radradioDiv1.length].focus();
        return false;
    }
    cnt += f.radradioDiv2.length;
    checked = false;
    
    for (i = 0; i < f.radradioDiv3.length; i++) {
        if (f.radradioDiv3[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la tercera pregunta!");
        f.elements[f.radradioDiv2.length].focus();
        return false;
    }
    cnt += f.radradioDiv3.length;
    checked = false;

    //Miramos los text
    if (document.getElementById("text1").value.length == 0) {
        alert("¡Contesta la tercera pregunta!");
        document.getElementById("text1").focus();
        return false;
    }

    if (document.getElementById("text2").value.length == 0) {
        alert("¡Contesta la cuarta pregunta!");
        document.getElementById("text2").focus();
        return false;
    }
    cnt += 2;

    //Miramos los checkbox
    for (i = 0; i < f.checkcheckBoxDiv1.length; i++) {
        if (f.checkcheckBoxDiv1[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la quinta pregunta!");
        f.elements[cnt].focus();
        return false;
    }
    cnt += f.checkcheckBoxDiv1.length;
    checked = false;

    for (i = 0; i < f.checkcheckBoxDiv2.length; i++) {
        if (f.checkcheckBoxDiv2[i].checked) checked = true;
    }
    if (!checked) {
        alert("¡Contesta la sexta pregunta!");
        f.elements[cnt].focus();
        return false;
    }
    cnt += f.checkcheckBoxDiv2.length;
    checked = false;


    return true;
}

function empezarTest() {
    formElement.reset();
    time = maxTime;
    timer = setInterval(actualizarTemp, 1000);
    document.getElementById("timer").style.display = "block";
    document.getElementById("intro").style.display = "none";
    document.getElementById("quest").style.display = "block";
    visualizarCorregir();
}

function actualizarTemp() {
    time--;
    t = document.getElementById("timer");

    if (time >= 0) {
        if (time < 30) {
            //Rojo
            t.style.background = "#F21C1C";
        } else {
            if (time < 60) {
                t.style.background = "#D28808";
            } else {
                if (time < 120) {
                    t.style.background = "#A0D208";
                } else {
                    t.style.background = "#54AE06";
                }
            }
        }
        document.getElementById("temp").innerHTML = time;
    } else {
        clearInterval(timer);
        t.style.display = "none";
        inicializar();
        corregir();
        ocultarCorregir();
        presentarNota();
    }
}

function ocultarCorregir() {
    document.getElementById("butCorregir").style.display = "none";
    document.getElementById("butRegresar").style.display = "block";
}

function visualizarCorregir() {
    document.getElementById("butCorregir").style.display = "block";
    document.getElementById("butRegresar").style.display = "none";
}

function regresarMenu() {
    document.getElementById("intro").style.display = "block";
    document.getElementById("quest").style.display = "none";
    document.getElementById("resultados").style.display = "none";
}
