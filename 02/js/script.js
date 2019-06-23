var Entidades;
(function (Entidades) {
    var Genero;
    (function (Genero) {
        Genero[Genero["Male"] = 0] = "Male";
        Genero[Genero["Female"] = 1] = "Female";
    })(Genero = Entidades.Genero || (Entidades.Genero = {}));
    var Persona = /** @class */ (function () {
        function Persona(id, edad, nombre, apellido, genero) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.genero = genero;
        }
        Persona.prototype.ToJson = function () {
            return JSON.stringify(this);
        };
        Persona.FromTableRow = function (row) {
            var id = "-1";
            var nombre = "unknown";
            var apellido = "unknown";
            var edad = "-1";
            var genero = Entidades.Genero.Female;
            var p = new Persona(id, edad, nombre, apellido, genero);
            var tds = row.childNodes;
            for (var _i = 0, tds_1 = tds; _i < tds_1.length; _i++) {
                var td = tds_1[_i];
                switch (td.className) {
                    case "tdid":
                        id = td.innerText;
                        break;
                    case "tdnombre":
                        nombre = td.innerText;
                        break;
                    case "tdedad":
                        edad = td.innerText;
                        ;
                        break;
                    case "tdapellido":
                        apellido = td.innerText;
                        ;
                        break;
                    case "tdgenero":
                        genero = td.innerText == "Male" ? Entidades.Genero.Male : Entidades.Genero.Female;
                        break;
                }
            }
            p = new Persona(id, edad, nombre, apellido, genero);
            return p;
        };
        Persona.prototype.ToTableRow = function () {
            var tr = document.createElement("tr");
            tr.setAttribute("id", this.id);
            var tdId = document.createElement("td");
            tdId.innerText = this.id + "";
            var tdNombre = document.createElement("td");
            tdNombre.innerText = this.nombre + "";
            var tdApellido = document.createElement("td");
            tdApellido.innerText = this.apellido + "";
            var tdEdad = document.createElement("td");
            tdEdad.innerText = this.edad + "";
            var tdGenero = document.createElement("td");
            tdGenero.innerText = (this.genero == Genero.Female) ? "Female" : "Male";
            if (this.id)
                tr.append(tdId);
            tdId.setAttribute("class", "tdid");
            if (this.nombre != null)
                tr.append(tdNombre);
            tdNombre.setAttribute("class", "tdnombre");
            if (this.apellido != null)
                tr.append(tdApellido);
            tdApellido.setAttribute("class", "tdapellido");
            if (this.edad != null)
                tr.append(tdEdad);
            tdEdad.setAttribute("class", "tdedad");
            if (this.genero != null)
                tr.append(tdGenero);
            tdGenero.setAttribute("class", "tdgenero");
            tr.addEventListener("click", Helpers.FormHelper.ShowForm.bind(tr, this));
            return tr;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
var Helpers;
(function (Helpers) {
    var TableHelper = /** @class */ (function () {
        function TableHelper() {
        }
        TableHelper.ReloadTable = function (personas) {
            this.CreateTable(personas);
        };
        TableHelper.CreateTable = function (personas) {
            $("#tabla").html("");
            var table = document.createElement("table");
            table.setAttribute("class", "col-12");
            var thead = document.createElement("thead");
            var trHead = document.createElement("tr");
            for (var key in personas[0]) {
                if (personas[0].hasOwnProperty(key)) {
                    var td = document.createElement("td");
                    td.innerText = key.toUpperCase();
                    td.setAttribute("class", "td" + key);
                    trHead.append(td);
                }
            }
            thead.append(trHead);
            var tbody = document.createElement("tbody");
            tbody.setAttribute("class", "");
            personas.map(function (p) {
                tbody.append(p.ToTableRow());
            });
            table.append(thead);
            table.append(tbody);
            $("#tabla").append(table);
            this.FilterTable();
            return table;
        };
        TableHelper.FilterTable = function () {
            var filters = ["nombre", "apellido", "genero"];
            filters.map(function (f) {
                var div = document.getElementById("select" + f);
                if (div.checked)
                    $(".td" + f).css("style", "inline-block");
                else
                    $(".td" + f).css("display", "none");
            });
        };
        TableHelper.ColumnSelector = function () {
            var div = $("#filters");
            div.attr("class", "col-12");
            var nombre = document.createElement("input");
            nombre.setAttribute("type", "checkbox");
            nombre.setAttribute("checked", "");
            nombre.setAttribute("id", "selectnombre");
            var apellido = document.createElement("input");
            apellido.setAttribute("type", "checkbox");
            apellido.setAttribute("checked", "");
            apellido.setAttribute("id", "selectapellido");
            var genero = document.createElement("input");
            genero.setAttribute("type", "checkbox");
            genero.setAttribute("checked", "");
            genero.setAttribute("id", "selectgenero");
            nombre.addEventListener("change", Filter.bind(nombre, "nombre"));
            apellido.addEventListener("change", Filter.bind(apellido, "apellido"));
            genero.addEventListener("change", Filter.bind(genero, "genero"));
            var generoRadioF = document.createElement("input");
            generoRadioF.setAttribute("type", "radio");
            generoRadioF.setAttribute("name", "genero");
            generoRadioF.addEventListener("change", function (e) {
                TableHelper.ReloadTable(CRUD.PersonaCrud.GetAll().filter(function (p) {
                    return p.genero == Entidades.Genero.Female;
                }));
            });
            var generoRadioM = document.createElement("input");
            generoRadioM.setAttribute("type", "radio");
            generoRadioM.setAttribute("name", "genero");
            generoRadioM.addEventListener("change", function (e) {
                TableHelper.ReloadTable(CRUD.PersonaCrud.GetAll().filter(function (p) {
                    return p.genero == Entidades.Genero.Male;
                }));
            });
            var generoRadioB = document.createElement("input");
            generoRadioB.setAttribute("type", "radio");
            generoRadioB.setAttribute("name", "genero");
            generoRadioB.addEventListener("change", function (e) {
                TableHelper.ReloadTable(CRUD.PersonaCrud.GetAll());
            });
            div.append(nombre);
            div.append(document.createTextNode("Nombre"));
            div.append(apellido);
            div.append(document.createTextNode("Apellido"));
            div.append(genero);
            div.append(document.createTextNode("Genero"));
            div.append(generoRadioF);
            div.append(document.createTextNode("Female"));
            div.append(generoRadioM);
            div.append(document.createTextNode("Male"));
            div.append(generoRadioB);
            div.append(document.createTextNode("Both"));
        };
        return TableHelper;
    }());
    Helpers.TableHelper = TableHelper;
    function Filter(filter) {
        var clase = ".td" + filter;
        if (this.checked) {
            $(clase).css("display", "inline-block");
        }
        else {
            $(clase).css("display", "none");
        }
    }
})(Helpers || (Helpers = {}));
var Helpers;
(function (Helpers) {
    var FormHelper = /** @class */ (function () {
        function FormHelper() {
        }
        FormHelper.HideForm = function () {
            $("#formulario").html("");
            $("#formulario").css("display", "none");
            Helpers.TableHelper.ReloadTable(CRUD.PersonaCrud.GetAll());
        };
        FormHelper.ShowForm = function (persona) {
            var withPersona = persona instanceof Entidades.Persona;
            var inputs = Array();
            var form = document.createElement("form");
            form.setAttribute("id", "myForm");
            var inputId = document.createElement("input");
            inputId.setAttribute("type", "hidden");
            inputId.setAttribute("value", withPersona ? persona.id : CRUD.PersonaCrud.LastInsertId() + 1);
            inputs.push(inputId);
            var inputNombre = document.createElement("input");
            inputNombre.setAttribute("type", "text");
            inputNombre.setAttribute("value", withPersona ? persona.nombre : "");
            inputs.push(inputNombre);
            var inputApellido = document.createElement("input");
            inputApellido.setAttribute("value", withPersona ? persona.apellido : "");
            inputs.push(inputApellido);
            var inputEdad = document.createElement("input");
            inputEdad.setAttribute("value", withPersona ? persona.edad : "");
            inputs.push(inputEdad);
            var radioGeneroM = document.createElement("input");
            radioGeneroM.setAttribute("type", "radio");
            radioGeneroM.setAttribute("name", "gender");
            radioGeneroM.setAttribute("value", "Male");
            radioGeneroM.appendChild(document.createTextNode("Male"));
            var radioGeneroF = document.createElement("input");
            radioGeneroF.setAttribute("type", "radio");
            radioGeneroF.setAttribute("name", "gender");
            radioGeneroF.setAttribute("value", "Female");
            if (withPersona) {
                if (persona.genero == Entidades.Genero.Male) {
                    radioGeneroM.checked = true;
                }
                else {
                    radioGeneroF.checked = true;
                }
            }
            inputs.map(function (input) {
                var newDiv = document.createElement("div");
                newDiv.setAttribute("class", "form-group col-12");
                newDiv.append(input);
                form.append(newDiv);
            });
            var generoF = document.createElement("label");
            generoF.setAttribute("class", "radio-inline col-12");
            generoF.append(radioGeneroF);
            generoF.append(document.createTextNode("Female"));
            form.append(generoF);
            var generoM = document.createElement("label");
            generoM.setAttribute("class", "radio-inline");
            generoM.append(radioGeneroM);
            generoM.append(document.createTextNode("Male"));
            form.append(generoM);
            if (withPersona) {
                var editBtn = document.createElement("button");
                editBtn.setAttribute("class", "btn btn-warning col-12");
                editBtn.innerText = "Editar";
                editBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    var gen = (radioGeneroF.checked) ? Entidades.Genero.Female : Entidades.Genero.Male;
                    var p = new Entidades.Persona(inputId.value, inputEdad.value, inputNombre.value, inputApellido.value, gen);
                    if (CRUD.PersonaCrud.Update(p)) {
                        FormHelper.HideForm();
                    }
                    else {
                        FormHelper.HideForm();
                        $("#error").html("<p>Error</p>");
                        $("#error").css("display", "block");
                    }
                });
                form.append(editBtn);
                var deleteBtn = document.createElement("button");
                deleteBtn.setAttribute("class", "btn btn-danger col-12");
                deleteBtn.innerText = "Eliminar";
                deleteBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    CRUD.PersonaCrud.Delete(inputId.value);
                    FormHelper.HideForm();
                });
                form.append(deleteBtn);
            }
            else {
                var createBtn = document.createElement("button");
                createBtn.setAttribute("class", "btn btn-success col-12");
                createBtn.innerText = "Agregar";
                createBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    var gen = (radioGeneroF.checked) ? Entidades.Genero.Female : Entidades.Genero.Male;
                    var p = new Entidades.Persona(inputId.value, inputEdad.value, inputNombre.value, inputApellido.value, gen);
                    CRUD.PersonaCrud.Create(p);
                    FormHelper.HideForm();
                });
                form.append(createBtn);
            }
            var cancelBtn = document.createElement("button");
            cancelBtn.setAttribute("class", "btn btn-primary col-12");
            cancelBtn.innerText = "Cancelar";
            cancelBtn.addEventListener("click", function (e) {
                e.preventDefault();
                FormHelper.HideForm();
            });
            form.append(cancelBtn);
            $("#formulario").append(form);
            $("#formulario").css("display", "block");
            console.log(form);
            return form;
        };
        return FormHelper;
    }());
    Helpers.FormHelper = FormHelper;
})(Helpers || (Helpers = {}));
var CRUD;
(function (CRUD) {
    var PersonaCrud = /** @class */ (function () {
        function PersonaCrud() {
        }
        PersonaCrud.LastInsertId = function () {
            var ids = new Array();
            this.GetAll().map(function (p) {
                ids.push(Number(p.id));
            });
            return ids.reduce(function (prev, curr) {
                return curr > prev ? curr : prev;
            }, 0);
        };
        PersonaCrud.GetAll = function () {
            var arr = JSON.parse(sessionStorage.getItem("personas"));
            var personas = new Array();
            arr.map(function (val) {
                var gen = (val.genero == "0") ? Entidades.Genero.Male : Entidades.Genero.Female;
                personas.push(new Entidades.Persona(val.id, val.edad, val.nombre, val.apellido, gen));
            });
            return personas;
        };
        PersonaCrud.GetOne = function (id) {
            var persona = null;
            this.GetAll().map(function (p) {
                if (p.id == id)
                    persona = p;
            });
            return persona;
        };
        PersonaCrud.Create = function (p) {
            if (this.GetOne(p.id))
                return false;
            var personas = this.GetAll();
            personas.push(p);
            this.SaveArray(personas);
            return true;
        };
        PersonaCrud.Update = function (p) {
            var personas = this.GetAll();
            var ind = -1;
            this.GetAll().forEach(function (item, index) {
                if (p.id == item.id)
                    ind = index;
            });
            if (ind == -1)
                return false;
            personas[ind] = p;
            this.SaveArray(personas);
            return true;
        };
        PersonaCrud.Delete = function (id) {
            this.SaveArray(this.GetAll().filter(function (p) {
                return p.id !== id;
            }));
        };
        PersonaCrud.SaveArray = function (arr) {
            sessionStorage.setItem("personas", JSON.stringify(arr));
        };
        return PersonaCrud;
    }());
    CRUD.PersonaCrud = PersonaCrud;
})(CRUD || (CRUD = {}));
var Program = /** @class */ (function () {
    function Program() {
    }
    return Program;
}());
$(document).ready(function () {
    var typedP = [];
    Helpers.TableHelper.ColumnSelector();
    personas.map(function (persona) {
        console.log(persona.genero);
        var genero = (persona.genero == "Female") ? Entidades.Genero.Female : Entidades.Genero.Male;
        var p = new Entidades.Persona(persona.id + "", persona.edad + "", persona.nombre, persona.apellido, genero);
        typedP.push(p);
    });
    Helpers.TableHelper.CreateTable(typedP);
    $("#boton").click(Helpers.FormHelper.ShowForm);
    $("#calcular").click(function (e) {
        e.preventDefault();
        var myPersons = GetPersonasFromTable($("table"));
        GetDatos(myPersons);
    });
    CRUD.PersonaCrud.SaveArray(typedP);
});
function GetDatos(personas) {
    console.log(personas);
    var promedio;
    var mayor;
    var sum = 0;
    personas.map(function (p) {
        sum += Number(p.edad);
    });
    mayor = personas.reduce(function (prev, curr) {
        return (Number(prev.edad) > Number(curr.edad)) ? prev : curr;
    });
    promedio = sum / personas.length;
    $("#datos").html("<p>promedio:" + promedio + "</p><p>mayor:" + mayor.nombre + "</p>");
}
function GetPersonasFromTable(tabla) {
    //tbody
    //console.log(tabla.children()[1].children); //table>body>trs
    var personas = new Array();
    var trs = tabla.children()[1].children;
    for (var _i = 0, trs_1 = trs; _i < trs_1.length; _i++) {
        var tr = trs_1[_i];
        var p = Entidades.Persona.FromTableRow(tr);
        personas.push(p);
    }
    return personas;
}
var personas = [{
        "id": 1,
        "nombre": "Marcel",
        "apellido": "De Bernardi",
        "edad": 67,
        "genero": "Male"
    }, {
        "id": 2,
        "nombre": "Ivy",
        "apellido": "Newbatt",
        "edad": 70,
        "genero": "Female"
    }, {
        "id": 3,
        "nombre": "Frank",
        "apellido": "Pitway",
        "edad": 2,
        "genero": "Male"
    }, {
        "id": 4,
        "nombre": "Westbrook",
        "apellido": "Caile",
        "edad": 45,
        "genero": "Male"
    }, {
        "id": 5,
        "nombre": "Amandie",
        "apellido": "Duker",
        "edad": 40,
        "genero": "Female"
    }, {
        "id": 6,
        "nombre": "Joby",
        "apellido": "Janczewski",
        "edad": 2,
        "genero": "Female"
    }, {
        "id": 7,
        "nombre": "Nerta",
        "apellido": "Shenton",
        "edad": 74,
        "genero": "Female"
    }, {
        "id": 8,
        "nombre": "Lesley",
        "apellido": "Vinter",
        "edad": 38,
        "genero": "Male"
    }, {
        "id": 9,
        "nombre": "Eimile",
        "apellido": "Butlin",
        "edad": 38,
        "genero": "Female"
    }, {
        "id": 10,
        "nombre": "Zondra",
        "apellido": "Goodredge",
        "edad": 3,
        "genero": "Female"
    }, {
        "id": 11,
        "nombre": "Berkly",
        "apellido": "Clements",
        "edad": 56,
        "genero": "Male"
    }, {
        "id": 12,
        "nombre": "Susanetta",
        "apellido": "Danev",
        "edad": 3,
        "genero": "Female"
    }, {
        "id": 13,
        "nombre": "Marsiella",
        "apellido": "Antonio",
        "edad": 31,
        "genero": "Female"
    }, {
        "id": 14,
        "nombre": "Elna",
        "apellido": "Colbron",
        "edad": 85,
        "genero": "Female"
    }, {
        "id": 15,
        "nombre": "Jethro",
        "apellido": "Potebury",
        "edad": 8,
        "genero": "Male"
    }];
