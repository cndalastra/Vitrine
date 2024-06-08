export async function generateContent(idCultura) {
    try {
        const response = await fetch('../culturas.json');
        if (!response.ok) {
            throw new Error('Erro ao buscar o JSON');
        }
        const data = await response.json();
        const d = data.find(item => item.id === idCultura);
        if (!d) {
            return '<p>Conteúdo não encontrado</p>';
        }

        const content = `
        <header>
            <div>
                <img src="./${d.img}" alt="">
            </div>
            <h1><b>${d.estacao}</b><br>${d.tituloEstacao}</h1>
            <h2>${d.cultura}</h2>
        </header>
        <footer>
            <section id="buttons">
                <button id="${d.Tab0.nome}" autofocus>${d.Tab0.nome}</button>
                <button id="${d.Tab1.nome}">${d.Tab1.nome}</button>
                <button id="${d.Tab2.nome}">${d.Tab2.nome}</button>
                <button id="${d.Tab3.nome}">${d.Tab3.nome}</button>
            </section>
            <div id="tabs">
                <div aria-label="${d.Tab0.nome}" class="show">
                    <img src="${d.Tab0.img}">
                </div>
                <div aria-label="${d.Tab1.nome}">
                    <h3>Cultivar</h3>
                    <p>${d.Tab1.cultivar}</p>
                    <hr>
                    <article>
                        ${(`<p>${d.Tab1.detalhe} </p>`)
                            .replaceAll('.', '.</p><p>')
                            .replaceAll(/(<p>)([^:]+)(:)/g, '$1<b>$2</b>$3')
                        }
                    </article>
                  
                </div>

                <div aria-label="${d.Tab2.nome}">
                    <h3>Forma de cultivo</h3>
                    <p>${d.Tab2.conducao}</p>
                    <hr>
                    <h3>Timeline</h3>
                    ${d.Tab2.itens.reduce((arr, { icone, data, titulo, assunto }) => {
            arr = `${arr}
                                <div>
                                    <span class="icon">${icone}</span>
                                    <div class="item">
                                        <span class="title">${data} - ${titulo}</span>
                                        <span class="desc">${assunto}</span>
                                    </div>
                                    <span class="line"></span>
                                </div>`
            return arr;
        }, '')
            }
                </div>
            
                <div aria-label="${d.Tab3.nome}">
                    <article>
                        <p>
                        ${d.Tab3.detalhe.replaceAll('.', '.</p><p>')}
                        </p>
                    </article>
                </div>
            </div>
        </footer>
        `;

        return content;
    } catch (error) {
        console.error('Erro ao gerar conteúdo:', error);
        return '<p>Erro ao carregar conteúdo</p>';
    }
}
