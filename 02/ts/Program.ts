class Program
{

}
$(document).ready(function () {
    var typedP = [];
    Helpers.TableHelper.ColumnSelector();
    personas.map(function (persona) {
        console.log(persona.genero);
        let genero = (persona.genero == "Female") ? Entidades.Genero.Female : Entidades.Genero.Male;
        let p = new Entidades.Persona(persona.id+"",persona.edad+"", persona.nombre, persona.apellido, genero);
        typedP.push(p);
    })
    Helpers.TableHelper.CreateTable(typedP);
    $("#boton").click(Helpers.FormHelper.ShowForm);
    
    $("#calcular").click(function(e)
    {
        e.preventDefault();
        let myPersons = GetPersonasFromTable($("table"));
        GetDatos(myPersons);
    });

    CRUD.PersonaCrud.SaveArray(typedP);
});

function GetDatos(personas:Entidades.Persona[])
{
    console.log(personas);
    let promedio;
    let mayor;

    let sum = 0;
    personas.map(p=>{
        sum+=Number(p.edad);
    });

    mayor = personas.reduce(function(prev,curr){
        return (Number(prev.edad) > Number(curr.edad)) ? prev : curr;
    });

    promedio = sum / personas.length;

    $("#datos").html("<p>promedio:"+promedio+"</p><p>mayor:"+mayor.nombre+"</p>");
}

function GetPersonasFromTable(tabla:JQuery<HTMLElement>):Entidades.Persona[]
{
    //tbody
    //console.log(tabla.children()[1].children); //table>body>trs
    let personas = new Array<Entidades.Persona>();
    let trs = tabla.children()[1].children as any;
    for(var tr of trs)
    {
        let p = Entidades.Persona.FromTableRow(tr);
        personas.push(p);
    }
    return personas;
}

let personas = [{
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