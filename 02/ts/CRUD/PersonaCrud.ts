namespace CRUD
{
    export class PersonaCrud
    {
        static LastInsertId():number
        {
            let ids = new Array<number>();
            this.GetAll().map(p=>{
                ids.push(Number(p.id));
            })

            return ids.reduce(function(prev,curr)
            {
                return curr > prev ? curr : prev;
            },0);
        }
        static GetAll() : Entidades.Persona[]
        {
            let arr = JSON.parse(sessionStorage.getItem("personas"));
            let personas = new Array<Entidades.Persona>();
            arr.map(function(val)
            {
               let gen = (val.genero == "0") ? Entidades.Genero.Male : Entidades.Genero.Female;
               personas.push(new Entidades.Persona(val.id, val.edad, val.nombre, val.apellido, gen)); 
            });

            return personas;
        }
        
        static GetOne(id:string) : Entidades.Persona | null
        {
            let persona = null;
            this.GetAll().map(p=>{
                if(p.id == id)
                    persona = p;
            })
            return persona;
        }

        static Create(p:Entidades.Persona) : boolean
        {
            if(this.GetOne(p.id))
                return false;
            let personas = this.GetAll();
            personas.push(p);
            this.SaveArray(personas);
            return true;
        }

        static Update(p:Entidades.Persona):boolean
        {
            let personas = this.GetAll();
            let ind = -1;
            this.GetAll().forEach((item,index)=>
            {
                if(p.id == item.id)
                    ind = index;
            });
            if(ind == -1)
                return false;
            personas[ind] = p;
            this.SaveArray(personas);
            return true;
        }

        static Delete(id:string)
        {
            this.SaveArray(this.GetAll().filter(p=>
                {
                    return p.id !== id;
                }));
        }

        static SaveArray(arr:Entidades.Persona[])
        {
            sessionStorage.setItem("personas", JSON.stringify(arr));
        }
    }
}