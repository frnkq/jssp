/// <reference path="../Helpers/FormHelper.ts"/>
namespace Entidades
{
    export enum gender
    {
        Male,
        Female,
        Both
    }
    export class Humano
    {
        private _id:number;
        private _nombre:string;
        private _apellido:string;

        public get id():number
        {
            return this._id;
        }
        public set id(id:number)
        {
            this._id = id;
        }
        public get nombre():string
        {
            return this._nombre;
        }
        public set nombre(nombre:string)
        {
            this._nombre = nombre;
        }

        public get apellido():string
        {
            return this._apellido;
        }

        public set apellido(apellido:string)
        {
            this._apellido = apellido;
        }
        constructor(nombre:string, apellido:string, id?:number)
        {
            if(id)
                this._id = id;
            else
                this._id = -1;
            this._nombre = nombre;
            this._apellido = apellido;
        }
    }

    export interface IPersona
    {
        id:number;
        nombre:string;
        apellido:string;
        email:string;
        edad:string;
        gender:gender;
    }

    export class Persona extends Humano
    {
        private _email:string;
        private _edad:string;
        private _gender:gender;
        
       
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
        public get gender():gender
        {
            return this._gender;
        }
        public set gender(gender:gender)
        {
            this._gender = gender;
        } 

        constructor(nombre:string,apellido:string,email:string,edad:string,gender:gender,id?:number)
        {
            super(nombre, apellido, id);
            this._email = email;
            this._edad = edad;
            this._gender = gender;
        }

        ToTableRow():HTMLElement
        {
            let tr = document.createElement("tr");
            tr.setAttribute("id", this.id+"");
                    
            for(let key in this)
            {
                if(this.hasOwnProperty(key))
                {
                    console.log(this[key]);
                    if(key == "active") //skipping a key
                        continue;
                    let td = document.createElement("td");
                    td.setAttribute("class", "td"+key);
                    td.innerText = this[key] as any;
                    tr.append(td);
                    
                }
                
            }

            let td = document.createElement("td");
            td.innerText = "";
            tr.addEventListener("click", Helpers.TableHelper.TdClick);
            return tr;
        }

        ToJson()
        {
            return {
                nombre:this.nombre,
                id:this.id,
                apellido:this.apellido,
                email:this.email,
                edad:this.edad,
                gender:this.gender
            };
        }
        
    }
     
}