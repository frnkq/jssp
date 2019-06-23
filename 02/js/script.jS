var Entidades;
(function (Entidades) {
    var Genero;
    (function (Genero) {
        Genero[Genero["Male"] = 0] = "Male";
        Genero[Genero["Female"] = 1] = "Female";
    })(Genero = Entidades.Genero || (Entidades.Genero = {}));
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido, genero) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.genero = genero;
        }
        Persona.prototype.ToJson = function () {
            return JSON.stringify(this);
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
            var tdGenero = document.createElement("td");
            tdGenero.innerText = (this.genero === Genero.Female) ? "Female" : "Male";
            tr.append(tdId);
            tr.append(tdNombre);
            tr.append(tdApellido);
            tr.append(tdGenero);
            tr.addEventListener("click", ShowForm.bind(tr, this));
            return tr;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
var CRUD;
(function (CRUD) {
    var PersonaCrud = /** @class */ (function () {
        function PersonaCrud() {
        }
        PersonaCrud.LastInsertId = function () {
            var ids = new Array();
            this.GetAll().map(function (p) {
                ids.push(p.id);
            });
            return ids.reduce(function (prev, curr) {
                return curr > prev ? curr : prev;
            });
        };
        PersonaCrud.GetAll = function () {
            return new Array();
        };
        PersonaCrud.GetOne = function (id) {
            return null;
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
        };
        PersonaCrud.Delete = function (p) {
            if (this.GetOne(p.id)) {
                var personas_1 = this.GetAll();
                this.SaveArray(personas_1.filter(function (pers) {
                    p.id != pers.id;
                }));
            }
            else {
                return false;
            }
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
console.log("hi");
console.log(CRUD.PersonaCrud.LastInsertId());
$(document).ready(function () {
    var typedP = [];
    personas.map(function (persona) {
        console.log(persona.genero);
        var genero = (persona.genero == "Female") ? Entidades.Genero.Female : Entidades.Genero.Male;
        var p = new Entidades.Persona(persona.id, persona.nombre, persona.apellido, genero);
        typedP.push(p);
    });
    $("#tabla").append(CreateTable(typedP));
    $("#boton").click(ShowForm);
    CRUD.PersonaCrud.SaveArray(typedP);
});
function ShowForm(persona) {
    var form = document.createElement("form");
    if (persona instanceof Entidades.Persona) {
        console.log(persona);
    }
    return form;
}
function CreateTable(personas) {
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var trHead = document.createElement("tr");
    for (var key in personas[0]) {
        if (personas[0].hasOwnProperty(key)) {
            var td = document.createElement("td");
            td.innerText = key.toUpperCase();
            trHead.append(td);
        }
    }
    thead.append(trHead);
    var tbody = document.createElement("tbody");
    personas.map(function (p) {
        tbody.append(p.ToTableRow());
    });
    table.append(thead);
    table.append(tbody);
    return table;
}
var personas = [{
        "id": 1,
        "nombre": "Celestia",
        "apellido": "McWilliam",
        "email": "cmcwilliam0@umn.edu",
        "genero": "Female"
    }, {
        "id": 2,
        "nombre": "Yves",
        "apellido": "Menchenton",
        "email": "ymenchenton1@quantcast.com",
        "genero": "Male"
    }, {
        "id": 3,
        "nombre": "Redd",
        "apellido": "Spurling",
        "email": "rspurling2@booking.com",
        "genero": "Male"
    }, {
        "id": 4,
        "nombre": "Chlo",
        "apellido": "Goathrop",
        "email": "cgoathrop3@miibeian.gov.cn",
        "genero": "Female"
    }, {
        "id": 5,
        "nombre": "Gilberta",
        "apellido": "Watford",
        "email": "gwatford4@chicagotribune.com",
        "genero": "Female"
    }, {
        "id": 6,
        "nombre": "Brannon",
        "apellido": "Blacklock",
        "email": "bblacklock5@sakura.ne.jp",
        "genero": "Male"
    }, {
        "id": 7,
        "nombre": "Rogers",
        "apellido": "Dudliston",
        "email": "rdudliston6@hostgator.com",
        "genero": "Male"
    }, {
        "id": 8,
        "nombre": "Gal",
        "apellido": "Diamond",
        "email": "gdiamond7@illinois.edu",
        "genero": "Male"
    }, {
        "id": 9,
        "nombre": "Sarene",
        "apellido": "Sedgemond",
        "email": "ssedgemond8@ibm.com",
        "genero": "Female"
    }, {
        "id": 10,
        "nombre": "Ben",
        "apellido": "Laban",
        "email": "blaban9@patch.com",
        "genero": "Male"
    }, {
        "id": 11,
        "nombre": "Rani",
        "apellido": "Hutley",
        "email": "rhutleya@soundcloud.com",
        "genero": "Female"
    }, {
        "id": 12,
        "nombre": "Nissa",
        "apellido": "Yepiskov",
        "email": "nyepiskovb@hexun.com",
        "genero": "Female"
    }, {
        "id": 13,
        "nombre": "Ed",
        "apellido": "MacQuaker",
        "email": "emacquakerc@nsw.gov.au",
        "genero": "Male"
    }, {
        "id": 14,
        "nombre": "Rolph",
        "apellido": "Lindsay",
        "email": "rlindsayd@cocolog-nifty.com",
        "genero": "Male"
    }, {
        "id": 15,
        "nombre": "Ivar",
        "apellido": "Breton",
        "email": "ibretone@virginia.edu",
        "genero": "Male"
    }];
