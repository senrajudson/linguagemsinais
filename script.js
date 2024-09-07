const pesquisar = () => {
    let section = document.getElementById("resultados-pesquisa")
    let missao = document.getElementById("missao")
    let campoPesquisa = document.getElementById("campo-pesquisa").value.trim()
    let encontrouResultados = false;
    // console.log(campoPesquisa)
    let resultados = ""

    if (campoPesquisa == "") {
        section.innerHTML = "<h2>Nenhum tópico foi encontrado</h2>"
        return
    }

    let title = ""
    campoPesquisa = campoPesquisa.toLowerCase()

    for (let i = 0; i < dados.length; i++) {
        title = dados[i].title.toLowerCase()
        article = ""
        if (dados[i].articles != "") {
            article = dados[i].articles[0].topics.toLowerCase()
        }
        if (title.includes(campoPesquisa) || article.includes(campoPesquisa)) {
            encontrouResultados = true;
            // console.log(dados[i].title.includes(campoPesquisa))
            if (dados[i].img != "") {
                resultados +=    `
                <section class="item-resultado">
                    <h2>${dados[i].title}</h2>
                    <p>${dados[i].paragraph}</p>
                    <img src=${dados[i].img} alt=${dados[i].img_label} class="img-no-article">
                    <figcaption class="label-no-article">${dados[i].img_label}</figcaption>
                </section>
            `
                continue
            }
            
            if (dados[i].articles == "") {
                if (dados[i].img == "") {
                    resultados +=    `
                    <section class="item-resultado">
                        <h2>${dados[i].title}</h2>
                        <p>${dados[i].paragraph}</p>
                    </section>
                `
                }
                continue
            }

            let link = ""
            if (dados[i].links != "") {
                let list = ""
                for (let k = 0; k < dados[i].links.length; k++) {
                    list += `
                    <li>${dados[i].links[k].link}</li>
                    ` 
                 }

                 link += `
                 <ul>
                 ${list}
                 </ul>
                 `
             }
    
            if (dados[i].articles != "") {
                let article = ""
                for (let j = 0; j < dados[i].articles.length; j++) {
                    if (dados[i].articles[j].img != "") {
                        article += `
                            <h4>${dados[i].articles[j].subtitle}</h4>
                            <img src=${dados[i].articles[j].img} alt=${dados[i].articles[j].img_label}>
                            <figcaption>${dados[i].articles[j].img_label}</figcaption>
                            <p>${dados[i].articles[j].paragraph}</p>
                            `
                        continue
                    }
                    if (dados[i].articles[j].video != "") {
                        article += `
                            <h4>${dados[i].articles[j].subtitle}</h4>
                            <video src=${dados[i].articles[j].video} controls autoplay loop></video>
                            <p>${dados[i].articles[j].paragraph}</p>
                            `
                        continue
                    }
                    if (dados[i].articles[j].topics === undefined) {
                        article += `
                            <h4>${dados[i].articles[j].subtitle}</h4>
                            <p>${dados[i].articles[j].paragraph}</p>
                    `
                    }
                }

                // if (dados[i].articles[j].topics === undefined) 
                // console.log(dados[i].articles[j].topics)
                resultados +=    `
                <section class="item-resultado">
                    <h2>${dados[i].title}</h2>
                    <p>${dados[i].paragraph}</p>
                    ${link}
                    ${article}
                </section>
            `
                // }
                // console.log(article)
            }
        }
    }

    if (!encontrouResultados) {
        resultados = "<h2>Nenhum tópico foi encontrado</h2>"
    }
    missao.style.display="block"
    section.innerHTML=resultados
    missao.style.display = 'none'
}

