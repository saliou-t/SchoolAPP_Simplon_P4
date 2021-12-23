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
            for (let item in App) {
                CreatCartApprenant(App[item])
            }
        })
}

function CreatCartApprenant(Donnees) {
    let idCard = 'cart-' + Donnees.id
    let parent = document.querySelector('.ListApp')
    parent.insertAdjacentHTML('afterbegin', `
        <div class="row cartApp app">
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
            <div class="col text-end mt-n4">
                Niveau ${Donnees.niveau}
            </div>
    </div>`)

    let card = document.querySelector('.app')
    card.addEventListener('click', () => {
        document.getElementById('nom-prenom').textContent = Donnees.prenom + ' ' + Donnees.nom
        document.getElementById('bio').textContent = Donnees.bio
        document.getElementById('niveau').textContent = Donnees.niveau
        document.getElementById('')
    })
}

function getSpecifiqueElemnt() {

}