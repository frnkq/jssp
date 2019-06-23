/// <reference path="Entidades//Tabla.ts"/>
/// <reference path="Entidades//Persona.ts"/>


let t = new Entidades.Tabla();
let personas = new Array<Entidades.Persona>();
let p = new Entidades.Persona(personas.length, "carlos", "alberto", 32, Entidades.Sexo.Hombre);
personas.push(p);
let p2 = new Entidades.Persona(personas.length, "Julieta", "Perez", 32, Entidades.Sexo.Mujer);
personas.push(p2);
let p3 = new Entidades.Persona(personas.length, "Marcos", "Rios", 22, Entidades.Sexo.Otro);
personas.push(p3);



$(document).ready(function(){
    t.setHeaders(Object.keys(p));

    personas.map(function(p)
    {
        t.AppendRow(p.CreateTr());
    })

    t.Stylize();
    $("#myDiv").append(t.GetTable());
    $("#boton").click(function()
    {
        let selectedSexo = $("#select_sexo").find(":selected").val();
        console.log(selectedSexo);

        personas = personas.filter(function(p)
        {
            console.log(p.sexo as Entidades.Sexo+"  "+selectedSexo);
            console.log(p.sexo == selectedSexo);
            return p.sexo == selectedSexo;
        })


        let myTable = new Entidades.Tabla();

        personas.map(function(p)
        {
            myTable.AppendRow(p.CreateTr());
        })
        myTable.Stylize();
        $("#myDiv").append(myTable.GetTable());
        });
        
});
