namespace CRUD 
{
    export class PersonasCrud
    {
        static LastInsertId()
        {
            let personas = this.GetAll();
            if (personas == null)
                return 0;

            let ids = [];
            personas.map(p =>
            {
                ids.push(p.id);
            })

            return ids.reduce(function (prev, curr)
            {
                return curr > prev ? curr : prev;
            }, 0);
        }

        static SaveArray(arr)
        {
            console.log("saving array");
            console.log(arr);
            localStorage.setItem("personas", JSON.stringify(arr));
            var personas = this.GetAll();
            Helpers.TableHelper.CrearTabla(personas);
        }

        static GetOne(id)
        {
            let personas = this.GetAll();
            if (personas == null)
                personas = [];

            let persona = null;
            personas.map(p =>
            {
                if (p.id == id)
                {
                    persona = p;
                }
            });
            return persona;
        }

        static GetAll()
        {
            return JSON.parse(localStorage.getItem("personas"));
        }

        static Create(persona:Entidades.Persona)
        {
            if (this.GetOne(persona.id) == null)
            {
                persona.id = this.LastInsertId() + 1;
                let personas = this.GetAll();
                if (personas == null)
                    personas = [];
                personas.push({
                    "first_name":persona.first_name,
                    "last_name":persona.last_name,
                    "edad":persona.edad,
                    "email":persona.email,
                    "gender":persona.gender,
                    "id":persona.id
                });
                console.log(persona);
                this.SaveArray(personas);
            }

        }

        static Update(persona)
        {
            if (this.GetOne(persona.id))
            {
                let personas = this.GetAll();
                let ind = -1;
                personas.forEach(function (p, index)
                {
                    if (p.id == persona.id)
                    {
                        ind = index;
                    }
                });
                personas[ind] = persona;
                this.SaveArray(personas);
            }
        }

        static Delete(id)
        {
            let personas = this.GetAll();
            let ind = -1;

            personas.forEach(function (p, index)
            {
                if (p.id == id)
                {
                    ind = index;
                }
            });
            personas.splice(ind, 1);
            this.SaveArray(personas);
        }

    }
}