var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODg4MTg4OCwiZXhwIjoxOTU0NDU3ODg4fQ.8kYZB_B7tP4HnVseFpg_KLtyI-ucHsksFcWU54PwEW4'
var apiUrl = 'https://tenjvxuzssuicdopqfau.supabase.co/rest/v1/SchoolApp'


let DataObjet = []



for (let key in DataObjet) {
    CreatCartApprenant(DataObjet[key]);
}

function CreatCartApprenant(Donnees) {
    let parent = document.querySelector('.ListApp')
    parent.insertAdjacentHTML('afterbegin', `
        <div class="row cartApp">
        <div class="col-2">
            <img src="http://placehold.it/70x70" alt="">
        </div>
        <div class="col-8">
            <div>
                <input type="text" id="nameContent" value="${Donnees.prenom} ${Donnees.nom}">
            </div>
            <div>
                <textarea name="" id="bioContent" style="overflow:hidden; resize:none" cols="40" rows="2">${Donnees.bio}</textarea>
            </div>
        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    Niveau ${Donnees.niveau}
                </div>
            </div>
        </div>
    </div>`)
}

let InputFirstName = document.getElementById('prenom')
let InputLastName = document.getElementById('nom')
let Level = document.getElementById('niveau')
let LevelSelected = Level.options[Level.selectedIndex].text
let InputBiographie = document.getElementById('bio')


let btnAdd = document.getElementById('Ajouter')

btnAdd.addEventListener('click', () => {
    if (InputFirstName.value.length == 0 || InputLastName.value.length == 0) {
        alert('Vellez remplir les champs du formulaire')
    } else {
        alert(LevelSelected)
        localStorage.setItem('prenom', InputFirstName.value)
        localStorage.setItem('nom', InputLastName.value)
        localStorage.setItem('niveau', LevelSelected)
        localStorage.setItem('bio', InputBiographie.value)

        let NewApp = {
            'prenom': localStorage.getItem('prenom'),
            'nom': localStorage.getItem('nom'),
            'niveau': localStorage.getItem('niveau'),
            'bio': localStorage.getItem('bio')
        }
        CreatCartApprenant(NewApp)
        DataObjet.push(NewApp)
    }
})

let BtnSaveAll = document.getElementById('sauvegarder');
BtnSaveAll.addEventListener('click', () => {
    for (let item in DataObjet) {
        AddTaskIntoSupabase(DataObjet[item])
    }
    console.log('ok');
})

//AJOUTER LES DONNéES DANS LA BASE DE DONN2ES
function AddTaskIntoSupabase(NewObjet) {
    fetch(apiUrl, {
            method: "POST",
            headers: {
                apikey: apiKey,
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(NewObjet),
        })
        .then((data) => {
            console.log(data)
        })
}

///////SUPPRÉSSION DES DONNÉES///////////////////

function DeleteTaskIntoSupabase(id) {

    fetch(`https://tenjvxuzssuicdopqfau.supabase.co/rest/v1/Todo?id=eq.${id}`, {
        method: "DELETE",
        headers: {
            apikey: apiKey,
            'Authorization': `Bearer ${apiKey}`
        }
    })
}