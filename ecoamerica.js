document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Dados dos produtos
    const produtos = [
        {
            id: 1,
            nome: "Calça Jeans Ecológica",
            descricao: "Calça jeans sustentável feita de plástico reciclado.",
            preco: "R$ 200,00",
            imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
            detalhes: ["Tamanho M", "Cor: Azul", "Material: Plástico reciclado"]
        },
        {
            id: 2,
            nome: "Jaqueta Sustentável",
            descricao: "Jaqueta ecológica feita de materiais reciclados.",
            preco: "R$ 350,00",
            imagem: "https://cdn.iset.io/assets/66687/produtos/20517/ecb22c9dd5456dce658408b9aeec428e685c3eb300ef3.png",
            detalhes: ["Tamanho L", "Cor: Preta", "Material: Fibras recicladas"]
        },
        {
            id: 3,
            nome: "Bolsa Ecológica",
            descricao: "Bolsa sustentável produzida com fibras recicladas.",
            preco: "R$ 150,00",
            imagem: "https://anellimn.com/cdn/shop/files/BolsaJeansFemininaAlcaCorrenteElegante_2.webp?v=1748549021",
            detalhes: ["Tamanho Único", "Cor: Verde", "Material: Fibras naturais"]
        }
    ];

    // Função para alternar entre abas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Criar cards apenas se for a aba de produtos
            if (targetTab === 'produtos') {
                criarCards();
            } else {
                // Remove os cards se não for a aba de produtos
                const container = document.getElementById('container-cards');
                if (container) {
                    container.innerHTML = '';
                }
            }
        });
    });

    // Função para criar os cards de produtos
    function criarCards() {
        const container = document.getElementById('container-cards');
        
        // Verifica se o container existe e se já não tem cards
        if (!container || container.innerHTML !== '') {
            return;
        }
        
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}" class="card-imagem">
                <div class="card-conteudo">
                    <h3 class="card-titulo">${produto.nome}</h3>
                    <p class="card-descricao">${produto.descricao}</p>
                    <p class="card-preco">${produto.preco}</p>
                    <div class="card-botoes">
                        <button class="card-btn btn-detalhes" data-id="${produto.id}">Ver Detalhes</button>
                        <button class="card-btn btn-comprar" data-id="${produto.id}">Comprar</button>
                    </div>
                    <div id="detalhes-${produto.id}" class="detalhes-produto">
                        <ul class="detalhes-lista">
                            ${produto.detalhes.map(detalhe => <li>${detalhe}</li>).join('')}
                        </ul>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });

        // Adiciona event listeners para os botões dos cards
        document.querySelectorAll('.btn-detalhes').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                mostrarDetalhes(id);
            });
        });

        document.querySelectorAll('.btn-comprar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                comprarProduto(id);
            });
        });
    }

    // Adicionar event listeners para os cards de produtos existentes na seção
    const cards = document.querySelectorAll('#produtos .card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('h3').textContent;
            const size = card.getAttribute('data-size');
            const color = card.getAttribute('data-color');
            const photo = card.getAttribute('data-photo');
            const info = card.getAttribute('data-info');

            const newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.write(`<!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <title>${name}</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            background-color: #f0f4f8;
                            color: #3b2e5a;
                            line-height: 1.6;
                            padding: 2rem;
                            text-align: center;
                        }
                        h1 {
                            color: #5a4b8b;
                            margin-bottom: 1rem;
                        }
                        img {
                            max-width: 300px;
                            border-radius: 8px;
                            box-shadow: 0 0 8px rgba(90, 75, 139, 0.1);
                            margin-bottom: 1rem;
                        }
                        p {
                            font-size: 1.1rem;
                            margin: 0.5rem 0;
                        }
                        strong {
                            color: #6e5bbd;
                        }
                    </style>
                </head>
                <body>
                    <h1>${name}</h1>
                    <img src="${photo}" alt="${name}">
                    <p><strong>Tamanho:</strong> ${size}</p>
                    <p><strong>Cor:</strong> ${color}</p>
                    <p><strong>Informações:</strong> ${info}</p>
                </body>
                </html>`);
                newWindow.document.close();
            } else {
                alert('Não foi possível abrir a nova guia. Por favor, permita pop-ups para este site.');
            }
        });
    });

    // Manipulação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            // Show the success message
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Optionally, clear the form fields
            contactForm.reset();
        });
    }

    // Funções auxiliares
    function mostrarDetalhes(id) {
        const detalhes = document.getElementById(detalhes-${id});
        if (detalhes) {
            if (detalhes.style.display === 'block') {
                detalhes.style.display = 'none';
            } else {
                // Fecha outros detalhes abertos
                document.querySelectorAll('.detalhes-produto').forEach(d => {
                    d.style.display = 'none';
                });
                detalhes.style.display = 'block';
            }
        }
    }

    function comprarProduto(id) {
        const produto = produtos.find(p => p.id === parseInt(id));
        if (produto) {
            alert(Você adicionou "${produto.nome}" ao carrinho!\nPreço: ${produto.preco});
        }
    }

    // Tornar funções disponíveis globalmente (para os onclick nos botões)
    window.mostrarDetalhes = mostrarDetalhes;
    window.comprarProduto = comprarProduto;
});
