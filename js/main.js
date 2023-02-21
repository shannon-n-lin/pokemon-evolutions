document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
    const choice = document.getElementById('choice').value.toLowerCase()
    const url = 'https://pokeapi.co/api/v2/pokemon-species/' + choice

    fetch(urlSpecies)
        .then(res => res.json()) // parse response as JSON
        .then(data => {

            // get URL to evolution chain for species
            return data.evolution_chain.url})

        .then(urlEvolution => {
            fetch(urlEvolution)
                .then(res => res.json()) 
                .then(data => {

                    // get pokemon names from evolution chain
                    let poke1 = data.chain.species.name
                    let poke2 = data.chain.evolves_to[0].species.name
                    let poke3 = data.chain.evolves_to[0].evolves_to[0].species.name

                    // add capitalized pokemon names to DOM
                    document.getElementById('poke1').innerText = poke1[0].toUpperCase() + poke1.slice(1)
                    document.getElementById('poke2').innerText = poke2[0].toUpperCase() + poke2.slice(1)
                    document.getElementById('poke3').innerText = poke3[0].toUpperCase() + poke3.slice(1)

                    // tell showSprite function where each pokemon image goes in the DOM
                    showSprite(poke1, 'poke1Img')
                    showSprite(poke2, 'poke2Img')
                    showSprite(poke3, 'poke3Img')
                })
                .catch(err => {
                    console.log(`error ${err}`)
                })   
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

    function showSprite(pokemon, img) {
        fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
            .then(res => res.json())
            .then(data => {
            
            // add pokemon to a chosen image in the DOM
            document.getElementById(img).src = data.sprites.front_default

            })
            .catch(err => {
            console.log(`error ${err}`)
            })
    }
}