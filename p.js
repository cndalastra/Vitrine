const generateContent = async (idCultura) => {
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
                <span></span>
                <img src="../images/culturas/${d.img}" alt="">
                <a href="../index.html"><button>list</button></a>
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
                    <img src="../images/culturas/${d.Tab0.img}">
                </div>
                <div aria-label="${d.Tab1.nome}">
                    <h3>Nome</h3>
                    <p>${d.Tab1.cultivar}</p>
                    <hr>
                    <h3>Caracteristicas</h3>
                    <article>
                        ${(`<li>${d.Tab1.detalhe} </li>`)
                .replaceAll('.', '.</li><li>')
                .replaceAll(/(<li>)([^:]+)(:)/g, '$1<b>$2</b>$3')
            }
                    </article>
                  
                </div>

                <div aria-label="${d.Tab2.nome}">
                    <h3>Forma de cultivo</h3>
                    <p>${d.Tab2.conducao}</p>
                    <hr>
                    <h3>Timeline</h3>
                    ${d.Tab2.itens
                        .sort((a, b) => {
                            const [diaA, mesA, anoA] = a.data.split('/').map(Number);
                            const [diaB, mesB, anoB] = b.data.split('/').map(Number);

                            const dataA = new Date(anoA, mesA - 1, diaA);
                            const dataB = new Date(anoB, mesB - 1, diaB);

                            return dataA - dataB;
                        })
                        .reduce((arr, { icone, data, titulo, assunto }) => {
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

const action = async (e) => {
    Array.from(document.getElementById('tabs').children).forEach(tag => {
        tag.classList.remove('show');
        if (e.target.id === tag.getAttribute('aria-label')) {
            tag.classList.add('show');
        }
    });
}

export const init = async () => {
    const fileName = location.href.split('/').pop().replace('.html', '')
    document.title = fileName
    const content = await generateContent(fileName);
    document.getElementById('content').innerHTML = content;
    document.getElementById('buttons').addEventListener('click', (e) => action(e));
}