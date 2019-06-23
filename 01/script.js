var Entidades;
(function (Entidades) {
    var Tabla = /** @class */ (function () {
        function Tabla() {
            this.nrows = 0;
            this.ncols = 0;
            this.table = document.createElement("table");
            this.nrows = 0;
            this.ncols = 0;
            this.headers = new Array();
            this.tbody = document.createElement("tbody");
            this.thead = document.createElement("thead");
            this.rows = new Array();
            this.cols = new Array();
            this.table.append(this.thead);
            this.table.append(this.tbody);
        }
        Tabla.prototype.GetTable = function () {
            return this.table;
        };
        Tabla.prototype.setHeaders = function (headers) {
            this.headers = headers;
            var tr = document.createElement("tr");
            headers.map(function (h) {
                var td = document.createElement("td");
                td.append(h);
                tr.append(td);
            });
            this.thead.append(tr);
        };
        Tabla.prototype.AppendRow = function (row) {
            this.rows.push(row);
            this.tbody.append(this.rows[(this.rows.length - 1)]);
        };
        Tabla.prototype.Stylize = function () {
            this.table.setAttribute("id", "miTabla");
            this.table.setAttribute("class", "text-center table col-12 border");
            this.thead.setAttribute("id", "miThead");
            this.thead.setAttribute("class", "font-weight-bold p-3");
        };
        return Tabla;
    }());
    Entidades.Tabla = Tabla;
})(Entidades || (Entidades = {}));
var Entidades;
(function (Entidades) {
    var Sexo;
    (function (Sexo) {
        Sexo[Sexo["Hombre"] = 0] = "Hombre";
        Sexo[Sexo["Mujer"] = 1] = "Mujer";
        Sexo[Sexo["Otro"] = 2] = "Otro";
    })(Sexo = Entidades.Sexo || (Entidades.Sexo = {}));
    var Persona = /** @class */ (function () {
        function Persona(id, nombre, apellido, edad, sexo) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.sexo = sexo;
        }
        Persona.prototype.CreateTr = function () {
            var _this = this;
            var tr = document.createElement("tr");
            var keys = Object.keys(this);
            keys.map(function (k) {
                var td = document.createElement("td");
                td.append(_this[k]);
                if (k == "id")
                    tr.setAttribute("id", _this[k]);
                tr.append(td);
            });
            return tr;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/// <reference path="Entidades//Tabla.ts"/>
/// <reference path="Entidades//Persona.ts"/>
var t = new Entidades.Tabla();
var personas = new Array();
var p = new Entidades.Persona(personas.length, "carlos", "alberto", 32, Entidades.Sexo.Hombre);
personas.push(p);
var p2 = new Entidades.Persona(personas.length, "Julieta", "Perez", 32, Entidades.Sexo.Mujer);
personas.push(p2);
var p3 = new Entidades.Persona(personas.length, "Marcos", "Rios", 22, Entidades.Sexo.Otro);
personas.push(p3);
$(document).ready(function () {
    t.setHeaders(Object.keys(p));
    personas.map(function (p) {
        t.AppendRow(p.CreateTr());
    });
    t.Stylize();
    $("#myDiv").append(t.GetTable());
    $("#boton").click(function () {
        var selectedSexo = $("#select_sexo").find(":selected").val();
        console.log(selectedSexo);
        personas = personas.filter(function (p) {
            console.log(p.sexo + "  " + selectedSexo);
            console.log(p.sexo == selectedSexo);
            return p.sexo == selectedSexo;
        });
        var myTable = new Entidades.Tabla();
        personas.map(function (p) {
            myTable.AppendRow(p.CreateTr());
        });
        myTable.Stylize();
        $("#myDiv").append(myTable.GetTable());
    });
});
