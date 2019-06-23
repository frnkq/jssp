namespace Helpers
{
    export class FormHelper
    {
        static HideForm()
        {
            $("#formulario").html("");
            $("#formulario").css("display", "none");
            Helpers.TableHelper.ReloadTable(CRUD.PersonaCrud.GetAll());
        }
        static ShowForm(persona?):HTMLFormElement
        {
            let withPersona = persona instanceof Entidades.Persona;
            let inputs = Array<HTMLElement>();
            let form = document.createElement("form");
            form.setAttribute("id", "myForm");
            
            let inputId = document.createElement("input");
            inputId.setAttribute("type", "hidden");
            inputId.setAttribute("value", 
                withPersona ? persona.id : CRUD.PersonaCrud.LastInsertId()+1);
            inputs.push(inputId);
        
            let inputNombre = document.createElement("input");
            inputNombre.setAttribute("type", "text");
            inputNombre.setAttribute("value", withPersona? persona.nombre : "");
            inputs.push(inputNombre);
        
            let inputApellido = document.createElement("input");
            inputApellido.setAttribute("value", 
                withPersona ? persona.apellido : "");
            inputs.push(inputApellido);

            let inputEdad = document.createElement("input");
            inputEdad.setAttribute("value", 
                withPersona ? persona.edad : "");
            inputs.push(inputEdad);
        
        
            let radioGeneroM = document.createElement("input");
            radioGeneroM.setAttribute("type", "radio");
            radioGeneroM.setAttribute("name", "gender");
            radioGeneroM.setAttribute("value", "Male");
            radioGeneroM.appendChild(document.createTextNode("Male"));
        
            let radioGeneroF = document.createElement("input");
            radioGeneroF.setAttribute("type", "radio");
            radioGeneroF.setAttribute("name", "gender");
            radioGeneroF.setAttribute("value", "Female");
        
            if(withPersona)
            {
                if(persona.genero == Entidades.Genero.Male)
                {
                    radioGeneroM.checked = true;
                }
                else
                {
                    radioGeneroF.checked = true;
                }
            }
        
            inputs.map(function(input)
            {
                let newDiv = document.createElement("div");
                newDiv.setAttribute("class", "form-group col-12");
                newDiv.append(input);
                form.append(newDiv);
            });
            
            let generoF = document.createElement("label");
            generoF.setAttribute("class", "radio-inline col-12");
            generoF.append(radioGeneroF);
            generoF.append(document.createTextNode("Female"));
            form.append(generoF);
        
            let generoM = document.createElement("label");
            generoM.setAttribute("class", "radio-inline");
            generoM.append(radioGeneroM);
            generoM.append(document.createTextNode("Male"));
            form.append(generoM);
        
            if(withPersona)
            {
                let editBtn = document.createElement("button");
                editBtn.setAttribute("class", "btn btn-warning col-12");
                editBtn.innerText = "Editar";
                editBtn.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    let gen = (radioGeneroF.checked) ? Entidades.Genero.Female : Entidades.Genero.Male;
                    let p = new Entidades.Persona(inputId.value, inputEdad.value, inputNombre.value, inputApellido.value, gen);
                    if(CRUD.PersonaCrud.Update(p))
                    {
                        FormHelper.HideForm();
                    }
                    else
                    {
                        FormHelper.HideForm();
                        $("#error").html("<p>Error</p>");
                        $("#error").css("display", "block");
                    }
                });
                form.append(editBtn);
        
                let deleteBtn = document.createElement("button");
                deleteBtn.setAttribute("class", "btn btn-danger col-12");
                deleteBtn.innerText = "Eliminar";
                deleteBtn.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    CRUD.PersonaCrud.Delete(inputId.value);
                    FormHelper.HideForm();
                });
                form.append(deleteBtn);
        
            }
            else
            {
                let createBtn = document.createElement("button");
                createBtn.setAttribute("class", "btn btn-success col-12");
                createBtn.innerText = "Agregar";
                createBtn.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    let gen = (radioGeneroF.checked) ? Entidades.Genero.Female : Entidades.Genero.Male;
                    let p = new Entidades.Persona(inputId.value, inputEdad.value, inputNombre.value, inputApellido.value, gen);
                    CRUD.PersonaCrud.Create(p);
                    FormHelper.HideForm();
                });
                form.append(createBtn);
            }
                let cancelBtn = document.createElement("button");
                cancelBtn.setAttribute("class", "btn btn-primary col-12");
                cancelBtn.innerText = "Cancelar";
                cancelBtn.addEventListener("click", function(e)
                {
                    e.preventDefault();
                    FormHelper.HideForm();
                });
                form.append(cancelBtn);
        
            $("#formulario").append(form);
            $("#formulario").css("display", "block");
            console.log(form);
            return form;
        }

    }
}