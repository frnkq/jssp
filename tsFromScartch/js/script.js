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
///<reference path="../Entidades/Persona.ts"/>
var Helpers;
(function (Helpers) {
    var FormHelper = /** @class */ (function () {
        function FormHelper() {
        }
        FormHelper.HideForm = function () {
            $("#formulario").css("display", "none");
            $("#formulario").html();
            Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll());
        };
        FormHelper.ShowForm = function (persona) {
            $("#formulario").html("");
            FormHelper.CreateForm(persona);
            $("#formulario").css("display", "block");
        };
        FormHelper.CreateForm = function (persona) {
            var form = $("#formulario");
            var elements = [];
            var labelNombre = document.createElement("label");
            labelNombre.append(document.createTextNode("Nombre"));
            labelNombre.setAttribute("for", "txtNombre");
            labelNombre.setAttribute("id", "lblNombre");
            elements.push(labelNombre);
            var inputNombre = document.createElement("input");
            inputNombre.setAttribute("id", "txtNombre");
            inputNombre.setAttribute("type", "text");
            inputNombre.setAttribute("name", "txtNombre");
            elements.push(inputNombre);
            var labelApellido = document.createElement("label");
            labelApellido.append(document.createTextNode("Apellido"));
            labelApellido.setAttribute("for", "txtApellido");
            labelApellido.setAttribute("id", "lblApellido");
            elements.push(labelApellido);
            var inputApellido = document.createElement("input");
            inputApellido.setAttribute("id", "txtApellido");
            inputApellido.setAttribute("type", "text");
            inputApellido.setAttribute("name", "txtApellido");
            elements.push(inputApellido);
            var labelEmail = document.createElement("label");
            labelEmail.append(document.createTextNode("Email"));
            labelEmail.setAttribute("for", "txtEmail");
            labelEmail.setAttribute("id", "lblEmail");
            elements.push(labelEmail);
            var inputEmail = document.createElement("input");
            inputEmail.setAttribute("id", "txtEmail");
            inputEmail.setAttribute("type", "email");
            inputEmail.setAttribute("name", "txtEmail");
            elements.push(inputEmail);
            var labelEdad = document.createElement("label");
            labelEdad.append(document.createTextNode("Edad"));
            labelEdad.setAttribute("for", "nmbEdad");
            labelEdad.setAttribute("id", "lblEdad");
            elements.push(labelEdad);
            var inputEdad = document.createElement("input");
            inputEdad.setAttribute("id", "nmbEdad");
            inputEdad.setAttribute("type", "number");
            inputEdad.setAttribute("name", "nmbEdad");
            elements.push(inputEdad);
            var buttons = Helpers.FormHelper.CrudButtons(persona);
            if (persona) {
                inputNombre.value = persona.nombre;
                inputApellido.value = persona.apellido;
                inputEdad.value = persona.edad;
                inputEmail.value = persona.email;
            }
            elements.map(function (e) { form.append(e); });
            buttons.map(function (b) { form.append(b); });
        };
        FormHelper.CrudButtons = function (persona) {
            var buttons = new Array();
            if (persona) {
                var editar = document.createElement("button");
                editar.setAttribute("id", "btnEditar");
                editar.setAttribute("class", "btn btn-warning col-12");
                editar.appendChild(document.createTextNode("Editar"));
                editar.addEventListener("click", function (e) {
                    e.preventDefault();
                    CRUD.PersonaCRUD.Update(persona);
                    Helpers.FormHelper.HideForm();
                });
                buttons.push(editar);
                var eliminar = document.createElement("button");
                eliminar.setAttribute("id", "btnEliminar");
                eliminar.setAttribute("class", "btn btn-danger col-12");
                eliminar.appendChild(document.createTextNode("Eliminar"));
                eliminar.addEventListener("click", function (e) {
                    e.preventDefault();
                    CRUD.PersonaCRUD.Delete(persona.id);
                    Helpers.FormHelper.HideForm();
                });
                buttons.push(eliminar);
            }
            else {
                var crear = document.createElement("button");
                crear.setAttribute("id", "btnAgregar");
                crear.setAttribute("class", "btn btn-success col-12");
                crear.appendChild(document.createTextNode("Crear"));
                crear.addEventListener("click", function (e) {
                    e.preventDefault();
                    //let p = new Persona(from inputs);
                    //CRUD.PersonaCRUD.Create()
                    Helpers.FormHelper.HideForm();
                });
                buttons.push(crear);
            }
            var cancel = document.createElement("button");
            cancel.setAttribute("id", "btnCancel");
            cancel.setAttribute("class", "btn btn-primary col-12");
            cancel.appendChild(document.createTextNode("Cancelar"));
            cancel.addEventListener("click", function (e) {
                e.preventDefault();
                Helpers.FormHelper.HideForm();
            });
            buttons.push(cancel);
            return buttons;
        };
        return FormHelper;
    }());
    Helpers.FormHelper = FormHelper;
})(Helpers || (Helpers = {}));
/// <reference path="../Helpers/FormHelper.ts"/>
var Entidades;
(function (Entidades) {
    var gender;
    (function (gender) {
        gender[gender["Male"] = 0] = "Male";
        gender[gender["Female"] = 1] = "Female";
        gender[gender["Both"] = 2] = "Both";
    })(gender = Entidades.gender || (Entidades.gender = {}));
    var Humano = /** @class */ (function () {
        function Humano(nombre, apellido, id) {
            if (id)
                this._id = id;
            else
                this._id = -1;
            this._nombre = nombre;
            this._apellido = apellido;
        }
        Object.defineProperty(Humano.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Humano.prototype, "nombre", {
            get: function () {
                return this._nombre;
            },
            set: function (nombre) {
                this._nombre = nombre;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Humano.prototype, "apellido", {
            get: function () {
                return this._apellido;
            },
            set: function (apellido) {
                this._apellido = apellido;
            },
            enumerable: true,
            configurable: true
        });
        return Humano;
    }());
    Entidades.Humano = Humano;
    var Persona = /** @class */ (function (_super) {
        __extends(Persona, _super);
        function Persona(nombre, apellido, email, edad, gender, id) {
            var _this = _super.call(this, nombre, apellido, id) || this;
            _this._email = email;
            _this._edad = edad;
            _this._gender = gender;
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
        Persona.prototype.ToTableRow = function () {
            var tr = document.createElement("tr");
            tr.setAttribute("id", this.id + "");
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    console.log(this[key]);
                    if (key == "active") //skipping a key
                        continue;
                    var td_1 = document.createElement("td");
                    td_1.setAttribute("class", "td" + key);
                    td_1.innerText = this[key];
                    tr.append(td_1);
                }
            }
            var td = document.createElement("td");
            td.innerText = "";
            tr.addEventListener("click", Helpers.TableHelper.TdClick);
            return tr;
        };
        Persona.prototype.ToJson = function () {
            return {
                nombre: this.nombre,
                id: this.id,
                apellido: this.apellido,
                email: this.email,
                edad: this.edad,
                gender: this.gender
            };
        };
        return Persona;
    }(Humano));
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/// <reference path="../Entidades/Persona.ts" />
var CRUD;
(function (CRUD) {
    var PersonaCRUD = /** @class */ (function () {
        function PersonaCRUD() {
        }
        PersonaCRUD.LastInsertId = function () {
            var ids = new Array();
            PersonaCRUD.GetAll().map(function (p) {
                ids.push(p.id);
            });
            return ids.reduce(function (prev, curr) {
                return (curr > prev) ? curr : prev;
            }, 0);
        };
        PersonaCRUD.SaveArray = function (arr) {
            console.log("saving");
            console.log(arr);
            localStorage.setItem("personas", JSON.stringify(arr));
        };
        PersonaCRUD.GetAll = function () {
            var arr = JSON.parse(localStorage.getItem("personas"));
            var pers = new Array();
            arr.map(function (p) {
                pers.push(new Entidades.Persona(p.nombre, p.apellido, p.email, p.edad, p.gender, p.id));
            });
            return arr;
        };
        PersonaCRUD.GetOne = function (id) {
            return PersonaCRUD.GetAll().filter(function (p) {
                return p.id == id;
            })[0];
        };
        PersonaCRUD.Create = function (persona) {
            persona.id = this.LastInsertId() + 1;
            if (PersonaCRUD.GetOne(persona.id) == null) {
                var personas = PersonaCRUD.GetAll();
                personas.push(persona.ToJson());
                PersonaCRUD.SaveArray(personas);
            }
        };
        PersonaCRUD.Update = function (persona) {
            if (PersonaCRUD.GetOne(persona.id)) {
                var personas = PersonaCRUD.GetAll();
                var ind_1 = -1;
                personas.forEach(function (p, index) {
                    if (p.id == persona.id) {
                        ind_1 = index;
                    }
                });
                if (ind_1 != -1) {
                    personas[ind_1] = persona;
                    PersonaCRUD.SaveArray(personas);
                    return true;
                }
            }
            return false;
        };
        PersonaCRUD.Delete = function (id) {
            console.log("deleting");
            if (PersonaCRUD.GetOne(id)) {
                console.log("found");
                var personas = PersonaCRUD.GetAll();
                var ind_2 = -1;
                personas.forEach(function (p, index) {
                    if (p.id == id) {
                        ind_2 = index;
                    }
                });
                if (ind_2 != -1) {
                    console.log(ind_2);
                    personas.splice(ind_2, 1);
                    PersonaCRUD.SaveArray(personas);
                    return true;
                }
            }
            return false;
        };
        return PersonaCRUD;
    }());
    CRUD.PersonaCRUD = PersonaCRUD;
})(CRUD || (CRUD = {}));
/// <reference path="../Entidades/Persona.ts"/>
/// <reference path="../CRUD/PersonaCRUD.ts"/>
var Helpers;
(function (Helpers) {
    var TableHelper = /** @class */ (function () {
        function TableHelper() {
        }
        TableHelper.CreateTable = function (personas) {
            var tbody = $("#tablaBody");
            tbody.html("");
            personas.map(function (p) {
                tbody.append(new Entidades.Persona(p.nombre, p.apellido, p.email, p.edad, p.gender, p.id).ToTableRow());
            });
            return tbody;
        };
        TableHelper.TdClick = function (e) {
            var id = e.target.parentNode.getAttribute("id");
            console.log(id);
            var persona = CRUD.PersonaCRUD.GetOne(Number(id));
            console.log(persona);
            Helpers.FormHelper.ShowForm(persona);
        };
        return TableHelper;
    }());
    Helpers.TableHelper = TableHelper;
})(Helpers || (Helpers = {}));
var data = [{
        "id": 1,
        "nombre": "Cleopatra",
        "apellido": "Farries",
        "email": "cfarries0@cnet.com",
        "gender": "Female",
        "edad": 51
    }, {
        "id": 2,
        "nombre": "Belle",
        "apellido": "Shier",
        "email": "bshier1@webnode.com",
        "gender": "Female",
        "edad": 25
    }, {
        "id": 3,
        "nombre": "Emlyn",
        "apellido": "Tomkys",
        "email": "etomkys2@pen.io",
        "gender": "Male",
        "edad": 72
    }, {
        "id": 4,
        "nombre": "Marion",
        "apellido": "Broughton",
        "email": "mbroughton3@github.com",
        "gender": "Male",
        "edad": 45
    }, {
        "id": 5,
        "nombre": "Debbi",
        "apellido": "Gollin",
        "email": "dgollin4@typepad.com",
        "gender": "Female",
        "edad": 11
    }, {
        "id": 6,
        "nombre": "Bryon",
        "apellido": "Ogbourne",
        "email": "bogbourne5@npr.org",
        "gender": "Male",
        "edad": 59
    }, {
        "id": 7,
        "nombre": "Leola",
        "apellido": "Dowers",
        "email": "ldowers6@lycos.com",
        "gender": "Female",
        "edad": 38
    }, {
        "id": 8,
        "nombre": "Saudra",
        "apellido": "Houseley",
        "email": "shouseley7@51.la",
        "gender": "Female",
        "edad": 19
    }, {
        "id": 9,
        "nombre": "Kippy",
        "apellido": "Seagrave",
        "email": "kseagrave8@mediafire.com",
        "gender": "Female",
        "edad": 70
    }, {
        "id": 10,
        "nombre": "Ginny",
        "apellido": "Trussman",
        "email": "gtrussman9@disqus.com",
        "gender": "Female",
        "edad": 24
    }, {
        "id": 11,
        "nombre": "Persis",
        "apellido": "Cordeix",
        "email": "pcordeixa@123-reg.co.uk",
        "gender": "Female",
        "edad": 43
    }, {
        "id": 12,
        "nombre": "Gregor",
        "apellido": "Anglin",
        "email": "ganglinb@a8.net",
        "gender": "Male",
        "edad": 52
    }, {
        "id": 13,
        "nombre": "Eleonora",
        "apellido": "Coleford",
        "email": "ecolefordc@foxnews.com",
        "gender": "Female",
        "edad": 90
    }, {
        "id": 14,
        "nombre": "Eleonore",
        "apellido": "Espadas",
        "email": "eespadasd@google.ru",
        "gender": "Female",
        "edad": 66
    }, {
        "id": 15,
        "nombre": "Prentice",
        "apellido": "Gerriet",
        "email": "pgerriete@nbcnews.com",
        "gender": "Male",
        "edad": 9
    }];
$(document).ready(function () {
    localStorage.setItem("personas", JSON.stringify(data));
    Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll());
});
