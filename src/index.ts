import minimist from "minimist";
import { PelisController } from "./controllers";
import { title } from "process";

const parseaParams = (argv): {action: string; params : any} => {
  const resultado = minimist(argv);

  const accion = resultado._[0] // La acción (add, get, search) se toma del primer argumento posicional

  if (accion === "get" && resultado._[1]){
    return {
      action : "get",
      params: {
        id: parseInt(resultado._[1]),
      }
    };
  }

  if (accion === "search"){
    return {
      action: "search",
      params: {
        search :{ title: resultado.title,
                  tag: resultado.tag, }
     }
    }
  }
  if (accion === "add"){
    return {
      action : "add",
      params : {
        id: parseInt(resultado.id),
        title : resultado.title,
        tags: Array.isArray(resultado.tags)? resultado.tags : [resultado.tags],
      }
    }
  }
  return {
    action :"",
    params: {},
  }
}




async function main () {
  const controller = new PelisController();
  const {action, params } =  parseaParams(process.argv.slice(2));
  if (action === "get"){
    const resultado = await controller.getOne(params);
    console.log(resultado);

  }else if (action === "search"){
    const resultado = await controller.get(params)
    console.log(resultado);
  } else if (action === "add"){
    const resultado = await controller.add(params);
    console.log(resultado);
  } else {
    const resultado = await controller.get();
    console.log(resultado);
  }
  
}

main();
