document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
    const choice = document.getElementById('choice').value.toLowerCase()
    const url = 'https://pokeapi.co/api/v2/pokemon-species/' + choice

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {

            document.getElementById('choiceName').innerText = data.name[0].toUpperCase() + data.name.slice(1)

            // document.getElementById('choiceImg').src = 
            
            fetch(data.evolution_chain.url)
                .then(res => res.json()) // parse response as JSON
                .then(data => {
                    
                    // document.getElementById('evolvesToName').innerText = 

                    console.log(data.chain.evolves_to[0].evolves_to[0].species.name)

                })

                .catch(err => {
                    console.log(`error ${err}`)
                })

        })

        .catch(err => {
            console.log(`error ${err}`)
        })

}