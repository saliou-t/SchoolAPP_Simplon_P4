var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODg4MTg4OCwiZXhwIjoxOTU0NDU3ODg4fQ.8kYZB_B7tP4HnVseFpg_KLtyI-ucHsksFcWU54PwEW4'
var apiUrl = 'https://tenjvxuzssuicdopqfau.supabase.co/rest/v1/SchoolApp'

let parent = document.querySelector('.ListApp')

window.addEventListener('load', () => {
    // if (localStorage.getItem('List') == null) {
    //     let DataObjet = []
    // } else {
    //     let DataObjet = localStorage.getItem('List')
    // }

    let List = JSON.parse(localStorage.getItem('List'))
    console.log(List);
    for (let item in List) {
        CreatCartApprenant(List[item])
    }
})

let DataObjet = []

let InputFirstName = document.getElementById('prenom')
let InputLastName = document.getElementById('nom')
var InputSelectLevel = document.getElementById('niveau');
let InputSelectIndex = InputSelectLevel.options[InputSelectLevel.selectedIndex].value
let InputBiographie = document.getElementById('bio')


InputBiographie.addEventListener('input', (e) => {
    document.querySelector('#longeurText').innerHTML = InputBiographie.value.length
    InputBiographie.maxLength = 100;
    if (InputBiographie.value.length === 100) {
        InputBiographie.style.backgroundColor = 'rgba(255,0,0,0.4)'
        InputBiographie.classList.add('animate__shakeY')
    } else {
        InputBiographie.style.backgroundColor = 'white'
    }
})

let btnAdd = document.getElementById('Ajouter')

btnAdd.addEventListener('click', () => {
    if (InputFirstName.value.length == 0) {
        FiledBlanc(InputFirstName)
    } else if (InputLastName.value.length == 0) {
        FiledBlanc(InputLastName)

    } else if (InputBiographie.value.length == 0) {
        FiledBlanc(InputBiographie)

    } else {
        let NewApp = {
            'prenom': InputFirstName.value,
            'nom': InputLastName.value,
            'niveau': InputSelectIndex,
            'bio': InputBiographie.value
        }

        DataObjet.push(NewApp)

        localStorage.setItem('List', JSON.stringify(DataObjet));
        console.log(localStorage.getItem('List') + ' et ' + JSON.stringify(DataObjet));

        CreatCartApprenant(NewApp)
        document.querySelector('.formulaire').reset()
    }
})


function CreatCartApprenant(Donnees) {
    parent.insertAdjacentHTML('afterbegin', `
        <div class="row cartApp carte-${Donnees.prenom}" >
        <div class="col-2">
            <img src="http://placehold.it/70x70" alt="">
        </div>
        <div class="col-8">
            <div>
                <input type="text" id="name-${Donnees.id}" value="${Donnees.prenom} ${Donnees.nom}">
            </div>
            <div>
                <textarea name="" id="bio-${Donnees.id}" style="overflow:hidden; resize:none" cols="40" rows="2">${Donnees.bio}</textarea>
            </div>
        </div>
        <div class="col">
            <div class="row">
                <div class="col">
                    Niveau ${Donnees.niveau}
                </div>
            </div>
            </div>
            <span class="text-center btn-delete" onclick="removeElement('.carte-${Donnees.prenom}')">Retirer</span>
        <divc class="col">
        </divc>
    </div>`)
    let EditInputBio = document.getElementById('bio-' + Donnees.id)
    EditInputBio.addEventListener('blur', () => {
        Donnees.bio = EditInputBio.value

        DataObjet.push(Donnees)
        console.log(JSON.stringify(DataObjet));
        localStorage.setItem('List', JSON.stringify(DataObjet))
    })
}


function removeElement(Element) {
    console.log(Element);
    document.querySelector(Element).remove()

    //suppréssion dans le tableau et reconversion
    console.log('Avant suppréssion : ' + DataObjet.length);
    DataObjet.pop()
        // localStorage.setItem('List', JSON.stringify(DataObjet))
    console.log('Aprés supp : ' + DataObjet.length);



}

function FiledBlanc(element) {
    element.style.border = '1px solid red'
    element.classList.add('animate__flipInX')
    element.focus()
}

let BtnSaveAll = document.getElementById('sauvegarder');
BtnSaveAll.addEventListener('click', () => {
    document.querySelector('.ListApp').innerHTML = ''

    for (let item in DataObjet) {
        AddTaskIntoSupabase(DataObjet[item])
    }
    console.log('ok');

    localStorage.clear()
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

    fetch(`https://tenjvxuzssuicdopqfau.supabase.co/rest/v1/SchoolApp?id=eq.${id}`, {
        method: "DELETE",
        headers: {
            apikey: apiKey,
            'Authorization': `Bearer ${apiKey}`
        }
    })
}