namespace Entidades {
    export enum Genero {
        Male,
        Female
    }
    export class Persona {
        id: string;
        nombre: string;
        apellido: string;
        edad:string;
        genero: Genero;

        constructor(id: string,edad:string, nombre: string, apellido: string, genero: Genero) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.genero = genero;
        }

        public ToJson(): string {
            return JSON.stringify(this);
        }

        public static FromTableRow(row:HTMLElement):Persona
        {
            let id = "-1";
            let nombre = "unknown";
            let apellido = "unknown";
            let edad = "-1";
            let genero = Entidades.Genero.Female;
            let p = new Persona(id,edad,nombre,apellido,genero);

            var tds = row.childNodes as any;

            for(var td of tds)
            {
                switch(td.className)
                {
                    case "tdid":
                        id=td.innerText;
                    break;

                    case "tdnombre":
                        nombre=td.innerText;
                    break;

                    case "tdedad":
                        edad=td.innerText;;
                    break;

                    case "tdapellido":
                        apellido=td.innerText;;
                    break;

                    case "tdgenero":
                        genero = td.innerText == "Male" ? Entidades.Genero.Male : Entidades.Genero.Female;
                    break;
                }
            }
            p = new Persona(id,edad,nombre,apellido,genero);
            return p;
        }

        public ToTableRow(): HTMLElement {
            let tr = document.createElement("tr");
            tr.setAttribute("id", this.id as any);

            let tdId = document.createElement("td");
            tdId.innerText = this.id+"";

            let tdNombre = document.createElement("td");
            tdNombre.innerText = this.nombre+"";

            let tdApellido = document.createElement("td");
            tdApellido.innerText = this.apellido+"";

            let tdEdad = document.createElement("td");
            tdEdad.innerText = this.edad+"";

            let tdGenero = document.createElement("td");
            tdGenero.innerText = (this.genero == Genero.Female) ? "Female" : "Male";

            if(this.id)
                tr.append(tdId);
            tdId.setAttribute("class", "tdid");

            if(this.nombre != null)
                tr.append(tdNombre);
            tdNombre.setAttribute("class", "tdnombre");

            if(this.apellido != null)
                tr.append(tdApellido);
            tdApellido.setAttribute("class", "tdapellido")

            if(this.edad != null)
                tr.append(tdEdad);
            tdEdad.setAttribute("class", "tdedad")

            if(this.genero != null)
                tr.append(tdGenero);
            tdGenero.setAttribute("class", "tdgenero");

            tr.addEventListener("click", Helpers.FormHelper.ShowForm.bind(tr,this));
            return tr;
        }
    }

}