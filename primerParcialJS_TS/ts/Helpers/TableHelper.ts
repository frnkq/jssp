namespace Helpers
{
    export class TableHelper
    {
        static GetData()
        {
            var trs = $("#bodyTabla").children();
            let personas = [];
            for (var i = 0; i < trs.length; i++)
            {
                personas.push(Entidades.Persona.PersonaFromTableRow(trs[i]));
            }
            let mayor = personas.reduce(function (prev, curr)
            {
                return curr.edad > prev.edad ? curr : prev;
            });

            let ages = [];
            personas.map(p => { ages.push(p.edad) });
            let sum = ages.reduce(function (prev, curr)
            {
                return Number(prev) + Number(curr);
            });
            let avg = sum / ages.length;

            $("#datos").html("<p>Mayor;" + mayor.first_name + "</p><p>Avg edad;" + avg + "</p>");
        }

        static CreateFilters()
        {
            let fields = ["first_name", "last_name", "edad", "email", "gender", "id"];
            let filters = $("#filters");

            fields.map(function (f)
            {
                let div = document.createElement("div");
                div.setAttribute("class", "col-12 text-center col-md text-md-left");
                let chck = document.createElement("input");
                chck.setAttribute("type", "checkbox");
                chck.setAttribute("id", "check" + f);
                chck.setAttribute("checked", "true");
                chck.addEventListener("change", function (e)
                {
                    if (chck.checked)
                        $(".td" + f).css("display", "table-cell");
                    else
                    {
                        $(".td" + f).css("display", "none");
                    }

                });
                div.append(chck);
                div.append(document.createTextNode(f));
                filters.append(div);

            });

            let select = document.createElement("select");

            let optionB = document.createElement("option");
            optionB.setAttribute("name", "gender");
            optionB.setAttribute("value", "Both");
            optionB.appendChild(document.createTextNode("Both"));
            select.append(optionB);

            let optionM = document.createElement("option");
            optionM.setAttribute("name", "gender");
            optionM.setAttribute("value", "Male");
            optionM.appendChild(document.createTextNode("Male"));
            select.append(optionM);


            let optionF = document.createElement("option");
            optionF.setAttribute("name", "gender");
            optionF.setAttribute("value", "Female");
            optionF.appendChild(document.createTextNode("Female"));
            select.append(optionF);

            select.addEventListener("change", function (e)
            {
                Helpers.TableHelper.CrearTabla(CRUD.PersonasCrud.GetAll().filter(function (p)
                {
                    if (optionF.selected)
                    {
                        return p.gender == "1";
                    }
                    if (optionM.selected)
                    {
                        return p.gender == "0";
                    }
                    if (optionB.selected)
                    {
                        return true;
                    }
                }));

            });
            filters.append(select);

            return filters;
        }
        static FilterTable()
        {
            let fields = ["first_name", "last_name", "edad", "email", "gender", "id"];
            fields.map(function (f)
            {
                if (($("#check" + f) as any).checked)
                    $(".td" + f).css("display", "table-cell");
                else
                    $(".td" + f).css("display", "none");
            });

        }

        static CleanTable()
        {
            let tbodyDiv = document.getElementById("bodyTabla");
            tbodyDiv.innerHTML = "";
            tbodyDiv.innerText = "";
        }

        static CrearTabla(personas:Entidades.Persona[])
        {
            this.CleanTable();
            let tbodyDiv = document.getElementById("bodyTabla");
            personas.map(function (p:Entidades.Persona)
            {
                tbodyDiv.appendChild(Entidades.Persona.PersonaToTableRow(p));
            });

            this.GetData();
        }

        static TdClick(e)
        {
            let id = e.target.parentNode.getAttribute("id").split("_")[1];
            let persona = TableHelper.GetPersonaById(id);
            Helpers.FormHelper.ShowForm(persona);
        }
        static GetPersonaById(id)
        {
            return CRUD.PersonasCrud.GetOne(id);
            /*
            for(let i=0;i<personas.length;i++)
            {
                if(personas[i]["id"]==id)
                    return personas[i];
            }
            return null;
            */
        }
    }
}