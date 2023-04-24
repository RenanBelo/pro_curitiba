var numRestaurantes = 15;
var imagens = ["curitiba1.jpg", "curitiba2.jpg", "curitiba3.jpg", "curitiba4.jpg", "curitiba5.jpg", "curitiba6.jpg", "curitiba7.jpg", "curitiba8.jpg", "curitiba9.jpg", "curitiba10.jpg", "curitiba11.jpg", "curitiba12.jpg", "curitiba13.jpg", "curitiba14.jpeg", "curitiba15.jpg"];
function mostrarRecomendados(recomendados) {
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    if (recomendados.length === 0) {
        resultado.innerHTML = "<p>Nenhum restaurante encontrado.</p>";
        return;
    }
    for (var i = 0; i < numRestaurantes; i++) {
        var restaurante = recomendados[i][0];
        var nota= recomendados[i][1];
        var nome = restaurante.name;
        var endereco = restaurante.address;
        var pontuacao = restaurante.rating;
        var comentario = restaurante.reviews[0].content;
        var div = document.createElement("div");
        div.innerHTML = "<h3>" + nome + "</h3><p>" + endereco + "</p><p>Nota: " + nota + "</p>";
        resultado.appendChild(div);

        // Criar elemento de imagem e definir o src como o nome da imagem correspondente
        var imagemNome = imagens[i];
        var imagem = document.createElement("img");
        imagem.src = imagemNome;
        imagem.style.width = "100%";
        div.style.width = "300px";
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.appendChild(imagem);
    }
    if (numRestaurantes < recomendados.length) {
        var maisButton = document.createElement("button");
        maisButton.innerHTML = "+";
        maisButton.onclick = function() {
            numRestaurantes++;
            mostrarRecomendados(recomendados);
        };
        resultado.appendChild(maisButton);

    } 

    else {
        var maisButton = document.getElementById("maisButton");
        if (maisButton) {
            maisButton.parentNode.removeChild(maisButton);
        }
    }
}

// Função para enviar a pesquisa para a API
function enviarPesquisa() {
    var feedback = document.getElementById("feedback").value.toLowerCase();

    if (feedback === "") {
        alert("Por favor, digite o tipo de comida que você está procurando.");
        return;
    }
    if (/^\d+$/.test(feedback)) {
        alert("Por favor, digite um tipo de comida válido.");
        return;
    }

 
    
    //Embaralha a ordem das imagens aleatoriamente
    imagens = imagens.sort(() => Math.random() - 0.5);
    var script = document.createElement("script");
    script.src = "http://localhost:5000/recomendar?callback=mostrarRecomendados&feedback=" + encodeURIComponent(feedback);
    document.body.appendChild(script);
    numRestaurantes = 1;
    var maisButton = document.getElementById("maisButton");
    if (maisButton) {
        maisButton.parentNode.removeChild(maisButton);
    }
}
