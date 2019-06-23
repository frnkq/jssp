namespace Entidades
{
    export class Tabla
    {
       private nrows:number = 0;
       private ncols:number = 0;
       private headers:string[];
       private table:HTMLElement;
       private thead:HTMLElement;
       private tbody:HTMLElement;
       private rows:HTMLElement[];
       private cols:HTMLElement[];

        constructor()
        {
            this.table = document.createElement("table");
            this.nrows = 0;
            this.ncols = 0;
            this.headers = new Array<string>();
            this.tbody = document.createElement("tbody");
            this.thead = document.createElement("thead");
            this.rows = new Array<HTMLElement>();
            this.cols = new Array<HTMLElement>();

            this.table.append(this.thead);
            this.table.append(this.tbody);
        }

        public GetTable()
        {
            return this.table;
        }

        public setHeaders(headers:Array<string>)
        {
            this.headers = headers;
            var tr = document.createElement("tr");
            headers.map(function(h)
            {
                var td = document.createElement("td");
                td.append(h);
                tr.append(td);
            });
            this.thead.append(tr);
        }

        public AppendRow(row:HTMLElement)
        {
            this.rows.push(row);
            this.tbody.append(this.rows[(this.rows.length -1)]);
        }

        public Stylize()
        {
            this.table.setAttribute("id", "miTabla");
            this.table.setAttribute("class", "text-center table col-12 border");

            this.thead.setAttribute("id", "miThead");
            this.thead.setAttribute("class", "font-weight-bold p-3")
        }
    }
}