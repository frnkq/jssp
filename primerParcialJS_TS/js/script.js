var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Sexo;
    (function (Sexo) {
        Sexo[Sexo["Male"] = 0] = "Male";
        Sexo[Sexo["Female"] = 1] = "Female";
        Sexo[Sexo["Both"] = 2] = "Both";
    })(Sexo = Entidades.Sexo || (Entidades.Sexo = {}));
    var Humano = /** @class */ (function () {
        function Humano(first_name, last_name) {
            this._first_name = first_name;
            this._last_name = last_name;
        }
        Object.defineProperty(Humano.prototype, "first_name", {
            get: function () {
                return this._last_name;
            },
            set: function (first_name) {
                this._first_name = first_name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Humano.prototype, "last_name", {
            get: function () {
                return this._last_name;
            },
            set: function (last_name) {
                this._last_name = last_name;
            },
            enumerable: true,
            configurable: true
        });
        return Humano;
    }());
    var Persona = /** @class */ (function (_super) {
        __extends(Persona, _super);
        function Persona(nombre, apellido, edad, email, sexo, id) {
            var _this = _super.call(this, nombre, apellido) || this;
            _this._edad = edad;
            _this._email = email;
            _this._gender = sexo;
            _this._id = id;
            return _this;
        }
        Object.defineProperty(Persona.prototype, "email", {
            get: function () {
                return this._email;
            },
            set: function (email) {
                this._email = email;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "edad", {
            get: function () {
                return this._edad;
            },
            set: function (edad) {
                this._edad = edad;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "gender", {
            get: function () {
                return this._gender;
            },
            set: function (gender) {
                this._gender = gender;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Persona.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        Persona.PersonaFromTableRow = function (tr) {
            var first_name = tr.childNodes[0].textContent;
            var last_name = tr.childNodes[1].textContent;
            var email = tr.childNodes[1].textContent;
            var edad = tr.childNodes[2].textContent;
            var gender = tr.childNodes[3].textContent;
            var gender = (gender == "0") ? "Male" : "Female";
            var sexo = (gender == "Male") ? Sexo.Male : Sexo.Female;
            var id = tr.childNodes[4].textContent;
            var p = new Persona(first_name, last_name, edad, email, sexo, id);
            console.log(p);
            return p;
        };
        Persona.PersonaToTableRow = function (p) {
            var fields = Entidades.Persona.GetFields(p);
            var tr = document.createElement("tr");
            tr.setAttribute("id", "persona_" + p["id"]);
            for (var j = 0; j < fields.length; j++) {
                var td = document.createElement("td");
                if (fields[j] == "gender")
                    if (p[fields[j]] == "0")
                        td.innerText = "Male";
                    else
                        td.innerText = "Female";
                else
                    td.innerText = p[fields[j]];
                td.style.cursor = "pointer";
                td.setAttribute("class", "td" + fields[j]);
                td.addEventListener("click", Helpers.TableHelper.TdClick);
                if (td.innerText == "undefined")
                    td.innerText = "";
                tr.setAttribute("class", "text-center");
                tr.appendChild(td);
            }
            return tr;
        };
        Persona.GetFields = function (p) {
            var fields = [];
            for (var field in p) {
                if (p.hasOwnProperty(field)) {
                    if (field != "active")
                        fields.push(field);
                }
            }
            return fields;
        };
        return Persona;
    }(Humano));
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
var CRUD;
(function (CRUD) {
    var PersonasCrud = /** @class */ (function () {
        function PersonasCrud() {
        }
        PersonasCrud.LastInsertId = function () {
            var personas = this.GetAll();
            if (personas == null)
                return 0;
            var ids = [];
            personas.map(function (p) {
                ids.push(p.id);
            });
            return ids.reduce(function (prev, curr) {
                return curr > prev ? curr : prev;
            }, 0);
        };
        PersonasCrud.SaveArray = function (arr) {
            console.log("saving array");
            console.log(arr);
            localStorage.setItem("personas", JSON.stringify(arr));
            var personas = this.GetAll();
            Helpers.TableHelper.CrearTabla(personas);
        };
        PersonasCrud.GetOne = function (id) {
            var personas = this.GetAll();
            if (personas == null)
                personas = [];
            var persona = null;
            personas.map(function (p) {
                if (p.id == id) {
                    persona = p;
                }
            });
            return persona;
        };
        PersonasCrud.GetAll = function () {
            return JSON.parse(localStorage.getItem("personas"));
        };
        PersonasCrud.Create = function (persona) {
            if (this.GetOne(persona.id) == null) {
                persona.id = this.LastInsertId() + 1;
                var personas_1 = this.GetAll();
                if (personas_1 == null)
                    personas_1 = [];
                personas_1.push({
                    "first_name": persona.first_name,
                    "last_name": persona.last_name,
                    "edad": persona.edad,
                    "email": persona.email,
                    "gender": persona.gender,
                    "id": persona.id
                });
                console.log(persona);
                this.SaveArray(personas_1);
            }
        };
        PersonasCrud.Update = function (persona) {
            if (this.GetOne(persona.id)) {
                var personas_2 = this.GetAll();
                var ind_1 = -1;
                personas_2.forEach(function (p, index) {
                    if (p.id == persona.id) {
                        ind_1 = index;
                    }
                });
                personas_2[ind_1] = persona;
                this.SaveArray(personas_2);
            }
        };
        PersonasCrud.Delete = function (id) {
            var personas = this.GetAll();
            var ind = -1;
            personas.forEach(function (p, index) {
                if (p.id == id) {
                    ind = index;
                }
            });
            personas.splice(ind, 1);
            this.SaveArray(personas);
        };
        return PersonasCrud;
    }());
    CRUD.PersonasCrud = PersonasCrud;
})(CRUD || (CRUD = {}));
var Helpers;
(function (Helpers) {
    var TableHelper = /** @class */ (function () {
        function TableHelper() {
        }
        TableHelper.GetData = function () {
            var trs = $("#bodyTabla").children();
            var personas = [];
            for (var i = 0; i < trs.length; i++) {
                personas.push(Entidades.Persona.PersonaFromTableRow(trs[i]));
            }
            var mayor = personas.reduce(function (prev, curr) {
                return curr.edad > prev.edad ? curr : prev;
            });
            var ages = [];
            personas.map(function (p) { ages.push(p.edad); });
            var sum = ages.reduce(function (prev, curr) {
                return Number(prev) + Number(curr);
            });
            var avg = sum / ages.length;
            $("#datos").html("<p>Mayor;" + mayor.first_name + "</p><p>Avg edad;" + avg + "</p>");
        };
        TableHelper.CreateFilters = function () {
            var fields = ["first_name", "last_name", "edad", "email", "gender", "id"];
            var filters = $("#filters");
            fields.map(function (f) {
                var div = document.createElement("div");
                div.setAttribute("class", "col-12 text-center col-md text-md-left");
                var chck = document.createElement("input");
                chck.setAttribute("type", "checkbox");
                chck.setAttribute("id", "check" + f);
                chck.setAttribute("checked", "true");
                chck.addEventListener("change", function (e) {
                    if (chck.checked)
                        $(".td" + f).css("display", "table-cell");
                    else {
                        $(".td" + f).css("display", "none");
                    }
                });
                div.append(chck);
                div.append(document.createTextNode(f));
                filters.append(div);
            });
            var select = document.createElement("select");
            var optionB = document.createElement("option");
            optionB.setAttribute("name", "gender");
            optionB.setAttribute("value", "Both");
            optionB.appendChild(document.createTextNode("Both"));
            select.append(optionB);
            var optionM = document.createElement("option");
            optionM.setAttribute("name", "gender");
            optionM.setAttribute("value", "Male");
            optionM.appendChild(document.createTextNode("Male"));
            select.append(optionM);
            var optionF = document.createElement("option");
            optionF.setAttribute("name", "gender");
            optionF.setAttribute("value", "Female");
            optionF.appendChild(document.createTextNode("Female"));
            select.append(optionF);
            select.addEventListener("change", function (e) {
                Helpers.TableHelper.CrearTabla(CRUD.PersonasCrud.GetAll().filter(function (p) {
                    if (optionF.selected) {
                        return p.gender == "1";
                    }
                    if (optionM.selected) {
                        return p.gender == "0";
                    }
                    if (optionB.selected) {
                        return true;
                    }
                }));
            });
            filters.append(select);
            return filters;
        };
        TableHelper.FilterTable = function () {
            var fields = ["first_name", "last_name", "edad", "email", "gender", "id"];
            fields.map(function (f) {
                if ($("#check" + f).checked)
                    $(".td" + f).css("display", "table-cell");
                else
                    $(".td" + f).css("display", "none");
            });
        };
        TableHelper.CleanTable = function () {
            var tbodyDiv = document.getElementById("bodyTabla");
            tbodyDiv.innerHTML = "";
            tbodyDiv.innerText = "";
        };
        TableHelper.CrearTabla = function (personas) {
            this.CleanTable();
            var tbodyDiv = document.getElementById("bodyTabla");
            personas.map(function (p) {
                tbodyDiv.appendChild(Entidades.Persona.PersonaToTableRow(p));
            });
            this.GetData();
        };
        TableHelper.TdClick = function (e) {
            var id = e.target.parentNode.getAttribute("id").split("_")[1];
            var persona = TableHelper.GetPersonaById(id);
            Helpers.FormHelper.ShowForm(persona);
        };
        TableHelper.GetPersonaById = function (id) {
            return CRUD.PersonasCrud.GetOne(id);
            /*
            for(let i=0;i<personas.length;i++)
            {
                if(personas[i]["id"]==id)
                    return personas[i];
            }
            return null;
            */
        };
        return TableHelper;
    }());
    Helpers.TableHelper = TableHelper;
})(Helpers || (Helpers = {}));
var Helpers;
(function (Helpers) {
    var FormHelper = /** @class */ (function () {
        function FormHelper() {
        }
        FormHelper.HideForm = function () {
            var formId = document.getElementById("divFrm");
            formId.style.display = "none";
        };
        FormHelper.ShowForm = function (persona) {
            var formId = document.getElementById("divFrm");
            formId.innerHTML = "";
            formId.innerText = "";
            var form = this.CrearForm(persona);
            formId.appendChild(form);
            formId.style.display = "block";
        };
        FormHelper.CrearForm = function (persona) {
            var form = document.createElement("form");
            form.setAttribute("class", "formStyle");
            var inputName = document.createElement("input");
            inputName.setAttribute("type", "text");
            inputName.setAttribute("placeholder", "Nombre");
            inputName.setAttribute("id", "inputName");
            var inputApellido = document.createElement("input");
            inputApellido.setAttribute("type", "text");
            inputApellido.setAttribute("placeholder", "Apellido");
            inputApellido.setAttribute("id", "inputApellido");
            var inputEdad = document.createElement("input");
            inputEdad.setAttribute("type", "number");
            inputEdad.setAttribute("placeholder", "Edad");
            inputEdad.setAttribute("id", "inputEdad");
            var inputEmail = document.createElement("input");
            inputEmail.setAttribute("type", "email");
            inputEmail.setAttribute("placeholder", "Email");
            inputEmail.setAttribute("id", "inputEmail");
            var inputGenderM = document.createElement("input");
            inputGenderM.setAttribute("type", "radio");
            inputGenderM.setAttribute("name", "gender");
            var inputGenderF = document.createElement("input");
            inputGenderF.setAttribute("type", "radio");
            inputGenderF.setAttribute("name", "gender");
            var labelName = document.createElement("p");
            labelName.innerHTML = "Nombre<br>";
            var labelApellido = document.createElement("p");
            labelApellido.innerHTML = "Apellido<br>";
            var labelEdad = document.createElement("p");
            labelEdad.innerHTML = "Edad<br>";
            var labelEmail = document.createElement("p");
            labelEmail.innerHTML = "Email:<br>";
            var labelGender = document.createElement("p");
            labelGender.innerHTML = "Sexo:<br>";
            var labelMasculino = document.createTextNode("H");
            var labelFemenino = document.createTextNode("M");
            var objects = [
                labelName,
                inputName,
                labelApellido,
                inputApellido,
                labelEdad,
                inputEdad,
                labelEmail,
                inputEmail,
                labelGender,
                inputGenderM,
                labelMasculino,
                inputGenderF,
                labelFemenino,
                document.createElement("br")
            ];
            for (var i = 0; i < objects.length; i++)
                form.appendChild(objects[i]);
            var buttons = this.CrudButtons();
            if (persona) {
                console.log(persona);
                form.setAttribute("id", "form_" + persona.id);
                inputName.value = persona.first_name;
                inputApellido.value = persona.last_name;
                inputEdad.value = persona.edad;
                inputEmail.value = persona.email;
                if (persona.gender == Entidades.Sexo.Male) {
                    inputGenderM.checked = true;
                    inputGenderF.checked = false;
                }
                else {
                    inputGenderM.checked = false;
                    inputGenderF.checked = true;
                }
                form.appendChild(buttons["modificar"]);
                form.appendChild(buttons["eliminar"]);
            }
            else {
                form.appendChild(buttons["alta"]);
            }
            form.appendChild(buttons["cerrar"]);
            return form;
        };
        FormHelper.CrudButtons = function () {
            var btnAlta = document.createElement("input");
            btnAlta.setAttribute("type", "submit");
            btnAlta.setAttribute("value", "Agregar");
            var btnModificar = document.createElement("input");
            btnModificar.setAttribute("type", "submit");
            btnModificar.setAttribute("value", "Modificar");
            var btnEliminar = document.createElement("input");
            btnEliminar.setAttribute("type", "submit");
            btnEliminar.setAttribute("value", "Eliminar");
            var btnCerrar = document.createElement("input");
            btnCerrar.setAttribute("type", "submit");
            btnCerrar.setAttribute("value", "Cerrar");
            btnAlta.addEventListener("click", this.CreateEvent);
            btnModificar.addEventListener("click", this.UpdateEvent);
            btnEliminar.addEventListener("click", this.DeleteEvent);
            btnCerrar.addEventListener("click", this.CloseEvent);
            var buttons = [];
            buttons["alta"] = btnAlta;
            buttons["modificar"] = btnModificar;
            buttons["eliminar"] = btnEliminar;
            buttons["cerrar"] = btnCerrar;
            return buttons;
        };
        FormHelper.CreateEvent = function (e) {
            e.preventDefault();
            console.log("alta");
            var form = e.target.parentNode;
            var nombre = form.childNodes[1].value;
            var apellido = form.childNodes[3].value;
            var edad = form.childNodes[5].value;
            var email = form.childNodes[7].value;
            var sexo = "Female";
            if (form.childNodes[9].checked)
                sexo = "Male";
            if (nombre == "" || apellido == "" || email == "" || (!form.childNodes[9].checked && !form.childNodes[11].checked)) {
                alert("Debe llenar todos los campos");
                return;
            }
            if (email.split("@").length < 2 || email.split(".").length < 2) {
                alert("Ingrese un email valido");
                return;
            }
            var gender = (sexo == "Male") ? Entidades.Sexo.Male : Entidades.Sexo.Female;
            var persona = new Entidades.Persona(nombre, apellido, edad, email, gender, CRUD.PersonasCrud.LastInsertId() + 1);
            console.log(persona);
            CRUD.PersonasCrud.Create(persona);
            FormHelper.HideForm();
        };
        FormHelper.UpdateEvent = function (e) {
            e.preventDefault();
            console.log("modificar");
            var form = e.target.parentNode;
            var nombre = form.childNodes[1].value;
            var apellido = form.childNodes[3].value;
            var edad = form.childNodes[5].value;
            var email = form.childNodes[7].value;
            var sexo = "Female";
            if (form.childNodes[9].checked)
                sexo = "Male";
            var gender = (sexo == "Male") ? Entidades.Sexo.Male : Entidades.Sexo.Female;
            if (nombre == "" || apellido == "" || email == "") {
                alert("Debe llenar todos los campos");
                return;
            }
            var id = form.getAttribute("id").split("_")[1];
            var persona = CRUD.PersonasCrud.GetOne(id);
            persona.first_name = nombre;
            persona.last_name = apellido;
            persona.edad = edad;
            persona.email = email;
            persona.gender = gender;
            console.log(persona);
            CRUD.PersonasCrud.Update(persona);
            FormHelper.HideForm();
        };
        FormHelper.DeleteEvent = function (e) {
            e.preventDefault();
            console.log("eliminar");
            var form = e.target.parentNode;
            var id = form.getAttribute("id").split("_")[1];
            CRUD.PersonasCrud.Delete(id);
            FormHelper.HideForm();
        };
        FormHelper.CloseEvent = function (e) {
            e.preventDefault();
            console.log("cerrar");
            var form = e.target.parentNode.parentNode;
            form.style.display = "none";
        };
        return FormHelper;
    }());
    Helpers.FormHelper = FormHelper;
})(Helpers || (Helpers = {}));
var btnAlta;
var divFrm;
var frmAlta;
var divInfo;
var btnCancelar;
var lista;
var personas;
var filters = null;
$(document).ready(function () {
    btnAlta = document.getElementById('btnAlta');
    btnAlta.onclick = function () {
        Helpers.FormHelper.ShowForm(null);
    };
    TraerPersonas();
    if (filters == null)
        filters = Helpers.TableHelper.CreateFilters();
});
function TraerPersonas() {
    var personasTabla = document.getElementById("bodyTabla");
    personasTabla.innerText = "";
    personasTabla.innerHTML = "";
    var personas = CRUD.PersonasCrud.GetAll();
    Helpers.TableHelper.CrearTabla(personas);
}
