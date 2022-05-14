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

            
             <div class="PaletaListaItem_acoes acoes">
                <button class="acoes-editar btn">Editar</button>
                <button class="acoes-apagar btn" >Apagar</button>
              </div>

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

function abrirModalCadastro() {
  //abrir modal
  document.querySelector('.modal-overlay').style.display = 'flex'; //mostra o modal
}

function fecharModalCadastro() {
  //fechar modal
  document.querySelector('.modal-overlay').style.display = 'none'; //esconde o modal
  document.querySelector("#sabor").value = "";
  document.querySelector("#preco").value = 0;
  document.querySelector("#descricao").value = "";
  document.querySelector("#foto").value = "";
}

async function createPaleta(event) {
  //criar paleta
  const sabor = document.querySelector('#sabor').value;
  const preco = document.querySelector('#preco').value;
  const descricao = document.querySelector('#descricao').value;
  const foto = document.querySelector('#foto').value;

  const paleta = {
    sabor,
    preco,
    descricao,
    foto,
  };
  const response = await fetch(`${baseURL}/create`, {
    //fetch é uma função nativa do js com base na roda post no backend
    method: 'post',
    headers: {
      'Content-Type': 'application/json', //tipo de conteudo enviado como json
    },
    mode: 'cors', //modo de acesso
    body: JSON.stringify(paleta), //conteudo enviado
  });

  const novaPaleta = await response.json(); //retorna um json

  const html = `<div class="PaletaListaItem">
  <div>
    <div class="PaletaListaItem__sabor">${novaPaleta.sabor}</div>
    <div class="PaletaListaItem__preco">R$ ${novaPaleta.preco}</div>
    <div class="PaletaListaItem__descricao">${novaPaleta.descricao}</div>
  </div>
    <img class="PaletaListaItem__foto" src=${
      novaPaleta.foto
    } alt=${`Paleta de ${novaPaleta.sabor}`} />
  </div>`;

  document.querySelector('#paletaList').insertAdjacentHTML('beforeend', html); //insere o html no html


  fecharModalCadastro(); //fecha o modal 
}


