const baseURL = 'http://localhost:3000/paletas'; //url base rodando em servidor local

async function findAllPaletas() {
  //no front end não é aconselhavel usar arrow
  const response = await fetch(`${baseURL}/todas-paletas`); //fetch é uma função nativa do js

  const paletas = await response.json(); //retorna um json

  paletas.forEach(function (paleta) {
    //para cada paleta na lista será interada um elemento novo em html
    document.querySelector('#paletaList').insertAdjacentHTML(
      'beforeend',
      `
    <div class="PaletaListaItem">
        <div>
            <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem__preco">R$: ${paleta.preco}</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>
        </div>
          <img class="PaletaListaItem__foto" src="${paleta.foto}" alt="${paleta.sabor}" />
    </div>
        `,
    );
  });
}

async function findByIdPaletas() {
  //busca por id
  const id = document.querySelector('#idPaleta').value; //pega o valor do input

  const response = await fetch(`${baseURL}/paleta/${id}`); //fetch é uma função nativa do js com base na roda get by id no backend
  const paleta = await response.json(); //retorna um json

  const paletaEscolhidaDiv = document.querySelector('#paletaEscolhida'); //pega o elemento e intera como html
  paletaEscolhidaDiv.innerHTML = ` 
    <div class="PaletaCardItem">
    <div>
        <div class="PaletaCardItem__sabor">${paleta.sabor}</div>
        <div class="PaletaCardItem__preco">R$: ${paleta.preco}</div>
        <div class="PaletaCardItem__descricao">${paleta.descricao}</div>
    </div>
      <img class="PaletaCardItem__foto" src="${paleta.foto}" alt="${paleta.sabor}" />
</div>
`;
}

findAllPaletas();
