async function main(){
    //Cada vez que se presiona una tecla en la barra de búsqueda, se hace la búesqueda
    document.getElementById("search").addEventListener("keyup",search);

    data = await getData();
    displayData(data);
}

async function getData()
{
    const dataURL = `http://universities.hipolabs.com/search`
    let data = null
    try{
        const response = await fetch(dataURL)
        data = await response.json()
    }
    catch(error){
        console.log( `Algo ha fallado: ${error.message}`)
    }
    return data
}

function displayData(data){
    let display = "";
    let id = 0;
    try{
        data.forEach((post) => {
            post.id = id;
            display += `
            <ul id="${post.id}">
            <li><strong>País:</strong> ${post.country}
            <li><strong>Nombre:</strong> ${post.name}
            </ul>`;
            id += 1;
        });
        document.getElementById("data").innerHTML = display;

    }
    catch(error)
    {
        console.log(error)
        console.log(data)
    }
}
function search()
{
    let text = document.getElementById("search").value;
    data.forEach((post)=> {
        if(match(post.country, text) || text == "")
        {
            console.log(post)
            show(post.id);
        }
        else {
            console.log(post)
            hide(post.id);
        }
    });
}

function match(word,substring){
    console.log(word,substring);
    console.log(word.includes(substring));
    return word.includes(substring);
}

function hide(elementId){
    document.getElementById(elementId).style.display = "none";
}

function show(elementId){
    document.getElementById(elementId).style.display = "block";}

main()