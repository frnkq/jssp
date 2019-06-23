
namespace Helpers
{
    export class TableHelper
    {
        static ReloadTable(personas:Entidades.Persona[])
        {
            this.CreateTable(personas);            
        }

        static CreateTable(personas: Entidades.Persona[]): HTMLElement {
            $("#tabla").html("");
            let table = document.createElement("table");
            table.setAttribute("class", "col-12");
        
            let thead = document.createElement("thead");
            let trHead = document.createElement("tr");
            for (let key in personas[0]) {
                if (personas[0].hasOwnProperty(key)) {
                    let td = document.createElement("td");
                    td.innerText = key.toUpperCase();
                    td.setAttribute("class", "td"+key);
                    trHead.append(td);
                }
            }
            thead.append(trHead);
        
            let tbody = document.createElement("tbody");
            tbody.setAttribute("class", "");
            personas.map(function (p) {
                tbody.append(p.ToTableRow());
            })
            table.append(thead);
            table.append(tbody);
        
            $("#tabla").append(table);
            this.FilterTable();
            return table;
        }

        static FilterTable()
        {
            let filters = ["nombre", "apellido", "genero"];
            filters.map(f=>{
                let div = document.getElementById("select"+f) as HTMLInputElement;
                if(div.checked)
                    $(".td"+f).css("style", "inline-block")
                else
                    $(".td"+f).css("display", "none")
            })
        }

        static ColumnSelector()
        {
            let div = $("#filters");
            div.attr("class", "col-12");

            let nombre = document.createElement("input");
            nombre.setAttribute("type", "checkbox");
            nombre.setAttribute("checked", "");
            nombre.setAttribute("id", "selectnombre");

            let apellido = document.createElement("input");
            apellido.setAttribute("type", "checkbox");
            apellido.setAttribute("checked", "");
            apellido.setAttribute("id", "selectapellido");

            let genero = document.createElement("input");
            genero.setAttribute("type", "checkbox");
            genero.setAttribute("checked", "");
            genero.setAttribute("id", "selectgenero");

            nombre.addEventListener("change", Filter.bind(nombre, "nombre"));
            apellido.addEventListener("change", Filter.bind(apellido, "apellido"));
            genero.addEventListener("change", Filter.bind(genero, "genero"));

            let generoRadioF = document.createElement("input");
            generoRadioF.setAttribute("type", "radio");
            generoRadioF.setAttribute("name", "genero");
            generoRadioF.addEventListener("change", function(e)
            {
                TableHelper.ReloadTable(CRUD.PersonaCrud.GetAll().filter(p=>{
                    return p.genero == Entidades.Genero.Female;
                }))
            });

            let generoRadioM = document.createElement("input");
            generoRadioM.setAttribute("type", "radio");
            generoRadioM.setAttribute("name", "genero");
            generoRadioM.addEventListener("change", function(e)
            {
                TableHelper.ReloadTable(CRUD.PersonaCrud.GetAll().filter(p=>{
                    return p.genero == Entidades.Genero.Male;
                }))
            });

            let generoRadioB = document.createElement("input");
            generoRadioB.setAttribute("type", "radio");
            generoRadioB.setAttribute("name", "genero");
            generoRadioB.addEventListener("change", function(e)
            {
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
        }
    }

    function Filter(filter)
    {
        let clase = ".td"+filter;
        if(this.checked)
        {
            $(clase).css("display", "inline-block");
        }
        else
        {
            $(clase).css("display", "none");
        }
    }

}