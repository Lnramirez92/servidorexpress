module.exports = class Contenedor {

fs = require("fs")

constructor(path){
    this.path = (path)? path:'./assets/productos.json',
    this.data = ''
}

save(objeto){
    let newId = 1
    const data = this.fs.readFileSync(this.path)

    if(data.length > 0){
        const jsonData = JSON.parse(data)
        newId = jsonData.reduce((acc,item) => {return (Math.max(acc, item.id))}, 0) + 1 // Revisar los parentesis
        jsonData.push({id: newId, title: objeto.title, price: objeto.price})
        this.data = JSON.stringify(jsonData)
        try {
            this.fs.writeFileSync(this.path, JSON.stringify(jsonData))
        } catch (error) {
            console.log("ERROR")
        }


    }

  else{
      const products = []
      const product = {id: newId, title: objeto.title, price: objeto.price}
      products.push(product)

      try {
        this.fs.writeFileSync(this.path, JSON.stringify(products))
    } catch (error) {
        console.log("ERROR")
    }


  }
  return newId
}

getAll(){
    const data = this.fs.readFileSync(this.path)
    if(data.length > 0){
        const jsonData = JSON.parse(data)
        return jsonData
    }
        return null 

}

getById(id){
    const data = this.fs.readFileSync(this.path)
    if(data.length > 0){
    const jsonData = JSON.parse(data)
    const row = jsonData.find((product) => product.id == id)
    return row

    }
    return null
}

deleteById(id){
    const data = this.fs.readFileSync(this.path)
    if(data.length > 0){
        const jsonData = JSON.parse(data)
        const newArray = [...jsonData].filter(product => product.id != id)
        try {
            this.fs.writeFileSync(this.path, JSON.stringify(newArray))
        } catch (error) {
            console.log("ERROR")
        }
    }

    else{
        console.log("No se puede borrar un archivo que este vacío")
    }

}

deleteAll(){
    this.writeFileSync(this.path, '')
}

}