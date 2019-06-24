/// <reference path="../Entidades/Persona.ts" />

namespace CRUD 
{
    export class PersonaCRUD 
    {
        static LastInsertId():number
        {
            let ids = new Array<number>();
            PersonaCRUD.GetAll().map(p=>{
                ids.push(p.id);
            });

            return ids.reduce(function(prev, curr)
            {
                return (curr > prev) ? curr : prev;
            },0);
        }
        static SaveArray(arr:Entidades.Persona[])
        {
            console.log("saving");
            console.log(arr);
            localStorage.setItem("personas", JSON.stringify(arr));
        }

        static GetAll():Array<any>
        {
            let arr =  JSON.parse(localStorage.getItem("personas") as string);
            let pers = new Array<Entidades.Persona>();
            arr.map(p=>{
                pers.push(new Entidades.Persona(p.nombre, p.apellido, p.email, p.edad, p.gender, p.id));
            });
            return arr;
        }

        static GetOne(id:number):any
        {
            return PersonaCRUD.GetAll().filter(p=>{
                return p.id == id;
            })[0];
        }

        static Create(persona:Entidades.Persona)
        {
            persona.id = this.LastInsertId()+1;
            if(PersonaCRUD.GetOne(persona.id) == null)
            {
                let personas = PersonaCRUD.GetAll();
                personas.push(persona.ToJson());
                PersonaCRUD.SaveArray(personas);
            }
        }

        static Update(persona:Entidades.Persona):boolean
        {
            if(PersonaCRUD.GetOne(persona.id))
            {
                let personas = PersonaCRUD.GetAll();
                let ind = -1;
                personas.forEach(function(p, index)
                {
                    if(p.id == persona.id)
                    {
                        ind = index;
                    }
                });
                if(ind != -1)
                {
                    personas[ind] = persona;
                    PersonaCRUD.SaveArray(personas);
                    return true;
                }
            }
            return false;
        }

        static Delete(id:number):boolean
        {
            console.log("deleting");
            if(PersonaCRUD.GetOne(id))
            {
                console.log("found");
                let personas = PersonaCRUD.GetAll();
                let ind = -1;
                personas.forEach(function(p, index)
                {
                    if(p.id == id)
                    {
                        ind = index;
                    }
                });
                if(ind != -1)
                {
                    console.log(ind);
                    personas.splice(ind, 1);
                    PersonaCRUD.SaveArray(personas);
                    return true;
                }
            }
            return false;
        }
    }
}