namespace Entidades
{
  export enum Sexo
  {
    Hombre,
    Mujer,
    Otro
  }
  export class Persona
  {
    id:number;
    nombre:string;
    apellido:string;
    edad:number;
    sexo:Sexo;

    constructor(id:number, nombre:string, apellido:string, edad:number, sexo:Sexo)
    {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.sexo = sexo;
    }

    CreateTr():HTMLElement
    {
      let tr = document.createElement("tr");
      let keys = Object.keys(this) as (keyof this)[];
      keys.map(k=>{
        var td = document.createElement("td");
        td.append(this[k] as any);

        if(k == "id")
          tr.setAttribute("id", this[k] as any);

        tr.append(td);
      });
      return tr;
    }
  }
}
