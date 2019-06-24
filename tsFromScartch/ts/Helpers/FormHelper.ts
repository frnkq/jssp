///<reference path="../Entidades/Persona.ts"/>
namespace Helpers
{
    export class FormHelper
    {
        static HideForm()
        {
            $("#formulario").css("display", "none");
            $("#formulario").html();
            Helpers.TableHelper.CreateTable(CRUD.PersonaCRUD.GetAll());
        }

        static ShowForm(persona?:Entidades.Persona)
        {
            $("#formulario").html("");
            FormHelper.CreateForm(persona);
            $("#formulario").css("display", "block");
        }

        static CreateForm(persona?:Entidades.Persona)
        { 
            let form = $("#formulario");
            let elements = [];

            let labelNombre = document.createElement("label");
            labelNombre.append(document.createTextNode("Nombre"));
            labelNombre.setAttribute("for", "txtNombre");
            labelNombre.setAttribute("id", "lblNombre");
            elements.push(labelNombre);

            let inputNombre = document.createElement("input");
            inputNombre.setAttribute("id", "txtNombre");
            inputNombre.setAttribute("type", "text");
            inputNombre.setAttribute("name", "txtNombre");
            elements.push(inputNombre);

            let labelApellido = document.createElement("label");
            labelApellido.append(document.createTextNode("Apellido"));
            labelApellido.setAttribute("for", "txtApellido");
            labelApellido.setAttribute("id", "lblApellido");
            elements.push(labelApellido);

            let inputApellido = document.createElement("input");
            inputApellido.setAttribute("id", "txtApellido");
            inputApellido.setAttribute("type", "text");
            inputApellido.setAttribute("name", "txtApellido");
            elements.push(inputApellido);

            
            let labelEmail = document.createElement("label");
            labelEmail.append(document.createTextNode("Email"));
            labelEmail.setAttribute("for", "txtEmail");
            labelEmail.setAttribute("id", "lblEmail");
            elements.push(labelEmail);

            let inputEmail = document.createElement("input");
            inputEmail.setAttribute("id", "txtEmail");
            inputEmail.setAttribute("type", "email");
            inputEmail.setAttribute("name", "txtEmail");
            elements.push(inputEmail);

            let labelEdad = document.createElement("label");
            labelEdad.append(document.createTextNode("Edad"));
            labelEdad.setAttribute("for", "nmbEdad");
            labelEdad.setAttribute("id", "lblEdad");
            elements.push(labelEdad);

            let inputEdad = document.createElement("input");
            inputEdad.setAttribute("id", "nmbEdad");
            inputEdad.setAttribute("type", "number");
            inputEdad.setAttribute("name", "nmbEdad");
            elements.push(inputEdad);

            let buttons = Helpers.FormHelper.CrudButtons(persona);

            if(persona)
            {
                inputNombre.value = persona.nombre;
                inputApellido.value = persona.apellido;
                inputEdad.value = persona.edad;
                inputEmail.value = persona.email;
            }

            elements.map(e=>{form.append(e)});
            buttons.map(b=>{form.append(b)});
        }

        static CrudButtons(persona?:Entidades.Persona):HTMLElement[]
        {
            let buttons = new Array<HTMLElement>();

            
            if(persona)
            {
                let editar = document.createElement("button");
                editar.setAttribute("id", "btnEditar");
                editar.setAttribute("class", "btn btn-warning col-12");
                editar.appendChild(document.createTextNode("Editar"));
                editar.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    CRUD.PersonaCRUD.Update(persona);
                    Helpers.FormHelper.HideForm();
                });
                buttons.push(editar);

                let eliminar = document.createElement("button");
                eliminar.setAttribute("id", "btnEliminar");
                eliminar.setAttribute("class", "btn btn-danger col-12");
                eliminar.appendChild(document.createTextNode("Eliminar"));
                eliminar.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    CRUD.PersonaCRUD.Delete(persona.id);
                    Helpers.FormHelper.HideForm();
                });
                buttons.push(eliminar);

            }
            else
            {
                let crear = document.createElement("button");
                crear.setAttribute("id", "btnAgregar");
                crear.setAttribute("class", "btn btn-success col-12");
                crear.appendChild(document.createTextNode("Crear"));
                crear.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    //let p = new Persona(from inputs);
                    
                    //CRUD.PersonaCRUD.Create()
                    Helpers.FormHelper.HideForm();
                });
                buttons.push(crear);
            }
            
            let cancel = document.createElement("button");
            cancel.setAttribute("id", "btnCancel");
            cancel.setAttribute("class", "btn btn-primary col-12");
            cancel.appendChild(document.createTextNode("Cancelar"));
            cancel.addEventListener("click", function(e)
            {
                e.preventDefault();
                Helpers.FormHelper.HideForm();
            });
            buttons.push(cancel);

            return buttons;
        }

    }
}