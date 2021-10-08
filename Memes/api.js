class RecuperadorMemes{
    constructor(){
        this.fuenteDeMemes = "https://api.imgflip.com/get_memes"
        this.datos = []
    }

    async recuperarDatos()
    {
        this.datos = await fetch(this.fuenteDeMemes)
        this.datos = await this.datos.json()
        this.datos = this.datos.data.memes
        await this.storeMemesNames()
    }

    async main(){
        //Cada vez que se presiona una tecla en la barra de búsqueda, se hace la búesqueda
        document.getElementById("search").addEventListener("keyup",this.search);
        await this.recuperarDatos();
        this.createDataList();
        this.displayData();
    }

    async storeMemesNames()
    {
        try{
            this.datos.forEach(post => {
                let datosMeme = {id: post.id, url: post.url}
                localStorage.setItem(`${post.name}`,JSON.stringify(datosMeme))
            });
        }
        catch(error)
        {
            console.log(error)
        }
    }

    createDataList()
    {
        let dataList = "";
        try{
            console.log(this.datos)
            this.datos.forEach(post => {
                dataList += `<option value = "${post.name}">
                `;
            });
            document.getElementById("memes").innerHTML = dataList;
    
        }
        catch(error)
        {
            console.log(error)
        }
    }
    
    displayData(){
        let display = "";
        try{
            console.log(this.datos)
            this.datos.forEach(post => {
                display += `
                <ul id="${post.id}" style="display: none;">
                <li><strong>Nombre:</strong> ${post.name}
                <li><strong>Imagen:</strong><img src="${post.url}">
                </ul>`;
            });
            document.getElementById("data").innerHTML = display;
    
        }
        catch(error)
        {
            console.log(error)
        }
    }
    search()
    {
        let text = document.getElementById("search").value;
        
        try{
            for(let key in window.localStorage)
            {
                let datosMeme = JSON.parse(window.localStorage.getItem(key))
                if(datosMeme != null)
                {
                    if(RecuperadorMemes.match(key,text) && text != "")
                    {
                        RecuperadorMemes.show(datosMeme.id)
                    }
                    else{
                        RecuperadorMemes.hide(datosMeme.id)
                    }
                }
            }
        }
        catch(error){
            console.log(error)
            console.log('Algo fallo')
        }
    }
    
    static match(word,substring){
        console.log(word,substring);
        console.log(word.includes(substring));
        return word.includes(substring);
    }
    
    static hide(elementId){
        document.getElementById(elementId).style.display = "none";
    }
    
    static show(elementId){
        document.getElementById(elementId).style.display = "block";}
}

recuperadorMemes = new RecuperadorMemes();
recuperadorMemes.main()

