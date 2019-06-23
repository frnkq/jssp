namespace Entidades
{
    export enum Sexo
    {
        Male,
        Female,
        Both
    }
    class Humano
    {
        private _first_name:string;
        private _last_name:string;
        
        public get first_name():string
        {
            return this._last_name;
        }

        public set first_name(first_name:string)
        {
            this._first_name = first_name;
        }

        public get last_name():string
        {
            return this._last_name;
        }

        public set last_name(last_name:string)
        {
            this._last_name = last_name;
        }

        constructor(first_name:string, last_name:string)
        {
            this._first_name = first_name;
            this._last_name =  last_name;

        }
    }
    export class Persona extends Humano
    {

        private _email:string;
        private _edad:string;
        private _gender:Sexo;
        private _id:string;

        public get email():string
        {
            return this._email;
        }
        public set email(email:string)
        {
            this._email = email;
        }

        public get edad():string
        {
            return this._edad;
        }
        
        public set edad(edad:string)
        {
            this._edad = edad;
        }

        public get gender():Sexo
        {
            return this._gender;
        }

        public set gender(gender:Sexo)
        {
            this._gender = gender;
        }

        public get id():string
        {
            return this._id;
        }

        public set id(id:string)
        {
            this._id = id;
        }

        constructor(nombre:string, apellido:string, edad:string, email:string, sexo:Sexo, id:string)
        {
            super(nombre, apellido);
            this._edad = edad;
            this._email = email;
            this._gender = sexo;
            this._id = id;

        }

        static PersonaFromTableRow(tr:HTMLElement)
        {
            var first_name = tr.childNodes[0].textContent as string;
            var last_name = tr.childNodes[1].textContent as string;
            var email = tr.childNodes[1].textContent as string;
            var edad = tr.childNodes[2].textContent as string;
            var gender = tr.childNodes[3].textContent as string;
            var gender = (gender == "0") ? "Male" :  "Female";
            var sexo = (gender == "Male") ? Sexo.Male : Sexo.Female;
            var id = tr.childNodes[4].textContent as string;
            var p = new Persona(first_name, last_name, edad, email, sexo, id);
            console.log(p);
            return p;
        }

        static PersonaToTableRow(p:Entidades.Persona)
        {
            let fields = Entidades.Persona.GetFields(p) as (keyof Entidades.Persona)[];
            
            let tr = document.createElement("tr");
            tr.setAttribute("id", "persona_" + p["id"]);

            for (let j = 0; j < fields.length; j++)
            {
                let td = document.createElement("td");
                if(fields[j] == "gender")
                    if(p[fields[j]] == "0")
                        td.innerText = "Male";
                    else
                        td.innerText = "Female";
                else
                    td.innerText = p[fields[j]] as any;
                td.style.cursor = "pointer";
                td.setAttribute("class", "td" + fields[j]);

                td.addEventListener("click", Helpers.TableHelper.TdClick);
                if (td.innerText == "undefined")
                    td.innerText = "";

                tr.setAttribute("class", "text-center");
                tr.appendChild(td);
            }
            return tr;
        }

        static GetFields(p)
        {
            let fields = [];
            for (let field in p)
            {
                if (p.hasOwnProperty(field))
                {
                    if (field != "active")
                        fields.push(field);
                }
            }
            return fields;
        }
    }
}