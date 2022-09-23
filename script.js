let form = document.querySelector("#formular")



class criminal {
    constructor(nameC,surC,crimeC) {
        this.name = nameC;
        this.surname = surC;
        this.crime = crimeC;
    }
} 


if (localStorage.getItem("kriminálníci") === null) {
    var criminals = []
} else {
    let original = localStorage.getItem("kriminálníci")
    var criminals = JSON.parse(original)
}

// vložení do lokalu 
form.addEventListener("submit", function(event){
    event.preventDefault()


    let jname = event.target.elements.jname.value
    let surname = event.target.elements.surname.value
    let crime = event.target.elements.crime.value

    let newcriminal = new criminal(jname,surname,crime)
    criminals.push(newcriminal)

    let criminalsString = JSON.stringify(criminals)
    localStorage.setItem("kriminálníci",criminalsString)
    
    event.target.elements.jname.value = ""
    event.target.elements.surname.value = ""   
    event.target.elements.crime.value = ""


})


// vypis
let tolist = document.querySelector("#to-list")
tolist.addEventListener("click", function(event) {
   let original = localStorage.getItem("kriminálníci") 
   let vypisPoleObj = JSON.parse(original) 

// promazání
   document.querySelector("#vypis").innerHTML = ""
   document.querySelector("#filtrovani").innerHTML = ""

   if (vypisPoleObj === null) {
    let prazdno = document.createElement("div")
    prazdno.textContent = "databáze je prázdná"
    document.querySelector("#vypis").appendChild(prazdno)
    

   } else {

    vypisPoleObj.forEach(function(kriminalnik){
         let newDiv = document.createElement("div")
         newDiv.id = "crimi"
         newDiv.innerHTML = `jméno je: ${kriminalnik.name},<br> Příjmení: ${kriminalnik.surname}, <br> Spáchal: ${kriminalnik.crime}`
         document.querySelector("#vypis").appendChild(newDiv)
     })
  }
})

    
   
    
let myfilter = document.querySelector("#filter")
myfilter.addEventListener("input", function(event){
    
    document.querySelector("#vypis").innerHTML = ""

    let original = localStorage.getItem("kriminálníci") 
    let vypisPoleObj = JSON.parse(original) 

    let search = vypisPoleObj.filter(function(onecrimi){
        let vysledek = onecrimi.name.includes(event.target.value)
        return vysledek
    })
    console.log(search)

    document.querySelector("#filtrovani").innerHTML = ""

    search.forEach(function(onekriminalnik){

        
        let vyfilt = document.createElement("div")
        vyfilt.innerHTML = `jméno je: ${onekriminalnik.name},<br> Příjmení: ${onekriminalnik.surname}, <br> Spáchal: ${onekriminalnik.crime}`
        document.querySelector("#filtrovani").appendChild(vyfilt)

    
    })


})

