var apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODg4MTg4OCwiZXhwIjoxOTU0NDU3ODg4fQ.8kYZB_B7tP4HnVseFpg_KLtyI-ucHsksFcWU54PwEW4'
var apiUrl = 'https://tenjvxuzssuicdopqfau.supabase.co/rest/v1/SchoolApp'

window.addEventListener('load', () => {
    getDataIntoSupabase()
})

function getDataIntoSupabase() {
    fetch(apiUrl, {
            headers: {
                apikey: apiKey,
            },
        })
        .then((response) => response.json())
        .then((App) => {
            for (let AppC in App) {
                CreatCartApprenant(App[AppC])
            }
        })
}

function CreatCartApprenant(Donnees) {
    let idCard = 'cart-' + Donnees.id
    let parent = document.querySelector('.ListApp')
    parent.insertAdjacentHTML('afterbegin', `
        <div class="row cartApp app  animate__animated animate__rubberBand">
            <div class="col-2">
                <img src="http://placehold.it/70x70" alt="">
            </div>
            <div class="col-8">
                <div>
                    <h6>${Donnees.prenom} ${Donnees.nom}</h6>
                </div>
                <div>
                    <p class="truncate"> ${Donnees.bio}</p>
                </div>
            </div>
            <div class="col  ">
                Niveau <br> ${Donnees.niveau}
            </div>
    </div>`)

    let card = document.querySelector('.app')
    card.addEventListener('click', () => {
        localStorage.clear();
        let Apprenant = {
            'prenom': Donnees.prenom,
            'nom': Donnees.nom,
            'niveau': Donnees.niveau,
            'bio': Donnees.bio,
            'compt1': Donnees.compt1,
            'compt1_value': Donnees.compt1_value,
            'compt2': Donnees.compt2,
            'compt2_value': Donnees.compt2_value,
            'compt3': Donnees.compt3,
            'compt3_value': Donnees.compt3_value,
            'compt4': Donnees.compt4,
            'compt4_value': Donnees.compt4_value,
            'Competences': Donnees.Competences
        }
        localStorage.setItem('App', JSON.stringify(Apprenant))
        window.open('showApp.html', '_blank');
    })
}