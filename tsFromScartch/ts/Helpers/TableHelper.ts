/// <reference path="../Entidades/Persona.ts"/>
/// <reference path="../CRUD/PersonaCRUD.ts"/>
namespace Helpers
{
    export class TableHelper
    {
        static CreateTable(personas:Entidades.Persona[]):JQuery<HTMLElement>
        {
            let tbody = $("#tablaBody");
            tbody.html("");
            personas.map(p=>{
                tbody.append(new Entidades.Persona(p.nombre, p.apellido, p.email, p.edad, p.gender, p.id).ToTableRow());
            });
            return tbody;
        }
        static TdClick(e:any)
        {
            let id = e.target.parentNode.getAttribute("id");
            console.log(id);
            let persona = CRUD.PersonaCRUD.GetOne(Number(id));
            console.log(persona);
            Helpers.FormHelper.ShowForm(persona);
        }
    }
}