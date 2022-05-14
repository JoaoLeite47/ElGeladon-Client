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
    <div class="PaletaListaItem" id="PaletaListaItem_${paleta.id}">
        <div>
            <div class="PaletaListaItem__sabor">${paleta.sabor}</div>
            <div class="PaletaListaItem__preco">R$: ${paleta.preco}</div>
            <div class="PaletaListaItem__descricao">${paleta.descricao}</div>

            
             <div class="PaletaListaItem_acoes acoes">
                <button class="acoes-editar btn" onclick="abrirModal(${paleta.id})">Editar</button>
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
    <div class="PaletaCardItem" id="PaletaListaItem_${paleta.id}">
    <div>
        <div class="PaletaCardItem__sabor">${paleta.sabor}</div>
        <div class="PaletaCardItem__preco">R$: ${paleta.preco}</div>
        <div class="PaletaCardItem__descricao">${paleta.descricao}</div>

        <div class="PaletaListaItem_acoes acoes">
        <button class="acoes-editar btn" onclick="abrirModal(${paleta.id})">Editar</button>
        <button class="acoes-apagar btn" >Apagar</button>
      </div>

    </div>
      <img class="PaletaCardItem__foto" src="${paleta.foto}" alt="${paleta.sabor}" />
</div>
`;
}

findAllPaletas(); //chama a função findAllPaletas

async function abrirModal(id = null) {
  //abrir modal

  if (id != null) {
    //se o id for diferente de null
    document.querySelector('#title-header-modal').innerText =
      'Atualizar Paleta'; //altera o titulo do modal

    document.querySelector('#button-form-modal').innerText = 'Atualizar'; //altera o botão do modal

    const response = await fetch(`${baseURL}/paleta/${id}`); //fetch é uma função nativa do js com base na roda get by id no backend
    const paleta = await response.json(); //retorna um json

    document.querySelector('#sabor').value = paleta.sabor; //altera o valor do input para o valor do sabor da paleta
    document.querySelector('#preco').value = paleta.preco; //altera o valor do input para o valor do preco da paleta
    document.querySelector('#descricao').value = paleta.descricao; //altera o valor do input para o valor do descricao da paleta
    document.querySelector('#foto').value = paleta.foto; //altera o valor do input para o valor do foto da paleta
    document.querySelector('#id').value = paleta.id;
  } else {
    document.querySelector('#title-header-modal').innerText =
      'Cadastrar Paleta'; //altera o titulo do modal de volta
    document.querySelector('#button-form-modal').innerText = 'Cadastrar'; //altera o botão do modal de volta
  }

  document.querySelector('.modal-overlay').style.display = 'flex'; //mostra o modal
}

function fecharModal() {
  //fechar modal
  document.querySelector('.modal-overlay').style.display = 'none'; //esconde o modal
  document.querySelector('#sabor').value = '';
  document.querySelector('#preco').value = 0;
  document.querySelector('#descricao').value = '';
  document.querySelector('#foto').value = '';
}

async function createPaleta(event) {
  //criar paleta
  const id = document.getElementById("id").value;
  const sabor = document.getElementById("sabor").value;
  const descricao = document.getElementById("descricao").value;
  const foto = document.getElementById("foto").value;
  const preco = +document.getElementById("preco").value;
  const paleta = {
    id,
    sabor,
    preco,
    descricao,
    foto,
  };
  const modoEdicaoAtivado = id > 0; //se o id for maior que 0 então é modo edição

  const endpoint =
    baseURL + (modoEdicaoAtivado ? `/update/${id}` : `/create/${id}`); //se for modo edição, altera o endpoint para update, se não, altera para create

  const response = await fetch(endpoint, {
    //fetch é uma função nativa do js com base na roda post no backend
    method: modoEdicaoAtivado ? 'put' : 'post', //se for modo edição, altera o metodo para put, se não, altera para post
    headers: {
      'Content-Type': 'application/json', //tipo de conteudo enviado como json
    },
    mode: 'cors', //modo de acesso
    body: JSON.stringify(paleta), //conteudo enviado
  });

  const novaPaleta = await response.json(); //retorna um json

  const html = `<div class="PaletaListaItem" id="PaletaListaItem_${paleta.id}">
  <div>
    <div class="PaletaListaItem__sabor">${novaPaleta.sabor}</div>
    <div class="PaletaListaItem__preco">R$ ${novaPaleta.preco}</div>
    <div class="PaletaListaItem__descricao">${novaPaleta.descricao}</div>

    <div class="PaletaListaItem_acoes acoes">
    <button class="acoes-editar btn" onclick="abrirModal(${paleta.id})">Editar</button>
    <button class="acoes-apagar btn" >Apagar</button>
  </div>

  </div>
    <img class="PaletaListaItem__foto" src=${
      novaPaleta.foto
    } alt=${`Paleta de ${novaPaleta.sabor}`} />
  </div>`;

  if (modoEdicaoAtivado) {
    document.querySelector(`#PaletaListaItem_${id}`).outerHTML = html; //altera o html do elemento pelo html da nova paleta
  } else {
    document.querySelector('#paletaList').insertAdjacentHTML('beforeend', html); //insere o html no html
  }

  fecharModal(); //fecha o modal
}
