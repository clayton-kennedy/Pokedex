const pokemonName = document.querySelector('.nome-pokemon');
const pokemonNumber = document.querySelector('.numero-pokemon');
const pokemonImage = document.querySelector('.pokemon-img');
const pokemonType = document.querySelector('.tipo-pokemon');
const pokemonType2 = document.querySelector('.tipo2-pokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.buscar');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let buscarpokemon = 1;

const fetchPokemon = async (pokemon) => {
     const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

     if (APIResponse.status == 200) {
          const data = await APIResponse.json();
          return(data);
     }
}

const renderPokemon = async (pokemon) => {

     pokemonName.innerHTML = 'Carregando...';
     pokemonNumber.innerHTML = '';

     const data = await fetchPokemon(pokemon);

     if (data) {
          pokemonName.innerHTML = data.name;
          pokemonNumber.innerHTML = data.id;
          pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; 
          pokemonType.innerHTML = data['types']['0']['type']['name'];
          pokemonType2.innerHTML = data['types']['1']['type']['name'];
          input.value = '';
          buscarpokemon = data.id;
     }
     else {
          pokemonImage.style.display = 'none';
          pokemonName.innerHTML = 'Não encontrado';
          pokemonNumber.innerHTML = '';
          pokemonType.innerHTML = '';
     }
}

form.addEventListener('submit', (event) => {
     event.preventDefault();
     console.log('enviando formulário...')

     renderPokemon(input.value.toLowerCase()); /*toLowerCase para transformar todos caracteres digitados em minusculo */
     input.value = ''; /* para limpar a busca após a pesquisa */

});
buttonPrev.addEventListener('click', () => {
     if (buscarpokemon > 1){
     buscarpokemon -= 1;
     renderPokemon(buscarpokemon);
     }
});
buttonNext.addEventListener('click', () => {
     buscarpokemon += 1;
     renderPokemon(buscarpokemon);
});
renderPokemon('1');