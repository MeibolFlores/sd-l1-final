import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";
// de esta forma Typescript se entera que tiene que incluir
// el .json y pasarlo a la carpeta /dist
// si no, solo usandolo desde la libreria jsonfile, no se dá cuenta

// no modificar estas propiedades, agregar todas las que quieras
//modif 25-8




type SearchOptions = {
  title?: string;
  tag?: string;
};

class Peli {
  id: number;
  title: string;
  tags: string[];
}

class PelisCollection {

 async  getAll(): Promise<Peli[]> {
     return jsonfile.readFile("./src/pelis.json").then((peli) => {
     return peli;
    });
  }

  async getById (id:number): Promise<Peli> {
    const pelicula = await this.getAll();
    return pelicula.find(pel => pel.id ==id);

  }

  async add(peli: Peli): Promise<boolean> {
  const peliExistente = await this.getById(peli.id);

    if (peliExistente) {
      return false;
    } else {
     try {
      const data = await this.getAll();
      data.push(peli);
      await jsonfile.writeFile("./src/pelis.json", data);
        return true;
      } catch (e) {
      console.error("Error al escribir el archivo:", e);
      return false;
     }
    }
   }

   async search(options: SearchOptions): Promise<Peli[]> {
    const lista = await this.getAll();
    
    const listaFiltrada = lista.filter((p)=> {
      let esteVa = false;

      if (options.title){
        const titulo = p.title.toLowerCase();
        const busqueda = options.title.toLowerCase();

        if (titulo.includes(busqueda)){
          esteVa = true;
        }
      }
      if (options.tag){
        if (p.tags.includes(options.tag)){
          esteVa= true;
        }
      }
      return esteVa;
    });
    return listaFiltrada
   }     


}



//solo para ir probando si funcionan los metodos

//const pelicula = new PelisCollection();
//pelicula.getAll().then((resulta)=>{
//  console.log(resulta);
//});



export { PelisCollection, Peli };
