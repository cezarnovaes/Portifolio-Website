function toggleReadMore() {
	var moreText = document.getElementById("more-text");
	var btn = document.getElementById("read-more-btn");
	
	if (moreText.style.display === "none") {
		moreText.style.display = "block";
		btn.textContent = "Read Less";
	} else {
		moreText.style.display = "none";
		btn.textContent = "Read More";
	}
}

function setupLanguageButtons() {
    // Seleciona os botões de idioma
    const portugueseBtn = document.getElementById('portuguese-btn');
    const englishBtn = document.getElementById('english-btn');

    // Adiciona os eventos onclick
    if (portugueseBtn) {
        portugueseBtn.onclick = function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link
            changeLanguage('pt'); // Altera o idioma para português
        };
    }

    if (englishBtn) {
        englishBtn.onclick = function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link
            changeLanguage('en'); // Altera o idioma para inglês
        };
    }
}

// Configura os botões quando a página for carregada
window.onload = setupLanguageButtons;
window.onload = updateContent(en);

function changeLanguage(lang) {
    if (lang === 'en') {
        updateContent(en);
    }else if( lang === 'pt'){
		updateContent(pt);
	}
}

function updateContent(data) {
    // Atualiza o cabeçalho
    document.querySelector('#header h1 a').textContent = data.header.title;
    document.querySelector('#header h1 a').href = data.header.link;

    // Atualiza o banner
    document.querySelector('#banner h2').textContent = data.banner.title;
    document.querySelector('#banner p').textContent = data.banner.description;

    // Atualiza as seções
    data.sections.forEach(section => {
        const sectionElement = document.querySelector(`#${section.id}`);
        if (sectionElement) {
            // Atualiza a imagem (se houver)
            const imageElement = sectionElement.querySelector('.image img');
            if (imageElement) {
                imageElement.src = section.image;
                imageElement.alt = section.title;
            }

            // Atualiza o título e o conteúdo
            const contentElement = sectionElement.querySelector('.content');
            if (contentElement) {
                contentElement.querySelector('h2').textContent = section.title;
                contentElement.querySelector('p').textContent = section.content;
            }

            // Atualiza os projetos (seção 'four')
            if (section.id === 'four') {
                const projectsContainer = sectionElement.querySelector('.features');
                if (projectsContainer) {
                    // Limpa o conteúdo atual dos projetos
                    projectsContainer.innerHTML = '';

                    // Adiciona cada projeto ao HTML
					section.projects.forEach(project => {
						// Cria uma string com todas as skills formatadas em elementos <p>
						const skillsHTML = project.skills 
							? project.skills.map(skill => `<p>${skill}</p>`).join('') 
							: '';
					
						// Monta o HTML do projeto
						const projectHTML = `
							<article>
								<a href="${project.githubLink}" class="image" target="_blank">
									<img src="${project.image}" alt="${project.title}" />
								</a>
								<h3 class="major">${project.title}</h3>
								<p>${project.description}</p>
								${skillsHTML ? `<span id="more-text" style="display: none;">${skillsHTML}</span> <button id="read-more-btn" onclick="toggleReadMore()" class="special">Read More</button><p></p>` : '<p></p>'}
								<a href="${project.githubLink}" class="special" target="_blank">GitHub Page</a>
							</article>
						`;
					
						// Insere o HTML no container de projetos
						projectsContainer.insertAdjacentHTML('beforeend', projectHTML);
					});
                }
            }
        }
    });

    // Atualiza o rodapé
    const footerElement = document.querySelector('#footer');
    if (footerElement) {
        footerElement.querySelector('h2').textContent = data.footer.title;
        footerElement.querySelector('p').textContent = data.footer.description;

        // Atualiza os contatos
        const contactsList = footerElement.querySelector('.contact');
        if (contactsList) {
            contactsList.innerHTML = ''; // Limpa os contatos atuais
            data.footer.contacts.forEach(contact => {
                const contactHTML = `
                    <li class="icon ${contact.type === 'email' ? 'solid fa-envelope' : 'brands fa-' + contact.type}">
                        <a href="${contact.link}" target="_blank">${contact.value}</a>
                    </li>
                `;
                contactsList.insertAdjacentHTML('beforeend', contactHTML);
            });
        }
    }
}

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);


en = {
    "header": {
      "title": "Cézar Novaes Portifolio",
      "link": "index.html"
    },
    "banner": {
      "title": "Cézar Novaes Portifolio",
      "description": "Full-Stack Development | Web Scraping | Automation"
    },
    "sections": [
      {
        "id": "one",
        "class": "spotlight style1",
        "image": "images/FotoPerfil.jpeg",
        "title": "About Me",
        "content": "Hi, I'm Cézar Novaes, a Full-Stack Developer and Web Scraping Specialist passionate about building efficient and scalable solutions. I'm currently in the 7th semester of my Bachelor's degree in Information Systems, where I focus on software development, data structures, and system architecture. I have a strong interest in automation, data extraction, and backend development, always looking for innovative ways to optimize workflows and enhance performance."
      },
      {
        "id": "two",
        "class": "spotlight style2",
        "image": "images/expertise.png",
        "title": "Professional Experience",
        "content": "I have extensive experience in full-stack development, working with Java (GWT), Node.js, and JavaScript to create dynamic and responsive applications. Additionally, I specialize in web scraping and automation, where I develop robust crawlers that extract and process data efficiently. I have also worked on API integrations, including WhatsApp and Telegram, to enable real-time notifications and automated systems. My expertise spans from ERP development to custom automation solutions, always with a focus on performance, reliability, and scalability. Let's connect and collaborate on innovative projects!"
      },
      {
        "id": "three",
        "class": "spotlight style3",
        "image": "images/future.png",
        "title": "Skills & Technologies",
        "content": "I have hands-on experience with a variety of technologies that allow me to develop efficient and scalable solutions. My tech stack includes: Programming Languages: Java, JavaScript, Node.js, C#; Web Development: GWT, HTML, CSS; Databases: MySQL, PostgreSQL; Automation & Web Scraping: Puppeteer, Selenium, API Integration; Development Tools: Git, Postman, Bruno. I'm always eager to learn and explore new technologies to stay ahead in the ever-evolving tech landscape."
      },
      {
        "id": "four",
        "class": "style1",
        "title": "Projects",
        "description": "Here are some of the projects I’ve worked on, showcasing my expertise in full-stack development, web scraping, automation, and software engineering. Each project reflects my commitment to efficiency, scalability, and problem-solving, using modern technologies to deliver impactful solutions. From intelligent data extraction to automated systems and custom web applications, I focus on building practical and high-performance solutions tailored to real-world needs. Feel free to explore my work and reach out if you have any questions!",
        "projects": [
          {
            "title": "Automated Flight Ticket Scraper & Notification System",
            "image": "images/ProjetoPassagens.png",
            "description": "I developed a web platform that automates the process of scraping airline ticket data and filtering results based on predefined criteria. The system integrates a web crawler and scraper, extracts flight information, and automatically sends notifications via WhatsApp and Telegram. Additionally, it features a real-time progress tracker for both data extraction and message dispatch.",
            "skills": [
              "Web Scraping & Automation – Extracting and processing flight data efficiently.",
              "Full-Stack Development – Building a dynamic web interface for real-time tracking.",
              "API Integration – Connecting with WhatsApp and Telegram for automated notifications.",
              "Process Optimization – Automating data filtering and message delivery for seamless user experience."
            ],
            "githubLink": "https://github.com/cezarnovaes/Projeto_Passagens"
          },
          {
            "title": "Market Pricing Analysis Platform (IEMI)",
            "image": "images/ProjetoIEMI.png",
            "description": "I developed a full-stack web platform for market price analysis, integrating data collected by over 100 web scrapers. The system features an interactive dashboard displaying key insights and various graphical interfaces for price analysis. Additionally, I contributed to the automation and management of web crawlers to ensure efficient data extraction and processing.",
            "skills": [
              "Full-Stack Development – Building a responsive and intuitive web platform for price analysis.",
              "Dashboard & Data Visualization – Designing interactive dashboards and graphical reports.",
              "Web Scraping & Automation – Developing and managing over 100 crawlers using Puppeteer, Node.js, and Java.",
              "Scalable Data Processing – Organizing automated execution and data integration into the platform."
            ],
            "githubLink": "https://iemi.com.br/ferramenta-de-pricing/"
          },
          {
            "title": "Credit Card Registration System",
            "image": "images/pic05.jpg",
            "description": "This project was developed as a 4th-semester college assignment. It is a credit card registration and management system built in Java with a MySQL database connection. The system allows users to register, view, edit, and delete credit card information, as well as validate data such as card numbers and expiration dates. It demonstrates my skills in Java programming, database management, and data validation techniques.",
            "githubLink": "https://github.com/cezarnovaes/Trabalho-Final-1"
          },
          {
            "title": "Sorting Algorithms Implementation in Python",
            "image": "images/pic06.jpg",
            "description": "This project involved the implementation of three fundamental sorting algorithms in Python: Selection Sort, Merge Sort, and Quick Sort. Each algorithm was developed from scratch to demonstrate a deep understanding of their logic, time complexity, and efficiency. The project highlights my ability to work with data structures, optimize code, and analyze algorithmic performance. It serves as a practical example of my problem-solving skills and proficiency in Python programming.",
            "githubLink": "https://github.com/cezarnovaes/Sorting"
          }
        ]
      }
    ],
    "footer": {
      "title": "Get in touch",
      "description": "I'm always open to new opportunities, collaborations, and exciting projects! If you have an idea, a proposal, or just want to chat, feel free to reach out. You can send me an email or connect with me on social media.",
      "contacts": [
        {
          "type": "email",
          "value": "cezarnovaes14@gmail.com",
          "link": "mailto:cezarnovaes14@gmail.com"
        },
        {
          "type": "linkedin",
          "value": "https://www.linkedin.com/in/cezar-novaes-12a898193/",
          "link": "https://www.linkedin.com/in/cezar-novaes-12a898193/"
        },
        {
          "type": "github",
          "value": "https://github.com/cezarnovaes",
          "link": "https://github.com/cezarnovaes"
        }
      ]
    }
  }

pt = {
    "header": {
      "title": "Portifólio de Cézar Novaes",
      "link": "index.html"
    },
    "banner": {
      "title": "Portifólio de Cézar Novaes",
      "description": "Desenvolvimento Full-Stack | Web Scraping | Automação"
    },
    "sections": [
      {
        "id": "one",
        "class": "spotlight style1",
        "image": "images/FotoPerfil.jpeg",
        "title": "Sobre Mim",
        "content": "Olá, eu sou Cézar Novaes, um Desenvolvedor Full-Stack e Especialista em Web Scraping, apaixonado por construir soluções eficientes e escaláveis. Atualmente, estou no 7º semestre do meu Bacharelado em Sistemas de Informação, onde me concentro em desenvolvimento de software, estruturas de dados e arquitetura de sistemas. Tenho um grande interesse em automação, extração de dados e desenvolvimento backend, sempre buscando maneiras inovadoras de otimizar fluxos de trabalho e melhorar o desempenho."
      },
      {
        "id": "two",
        "class": "spotlight style2",
        "image": "images/expertise.png",
        "title": "Experiência Profissional",
        "content": "Tenho ampla experiência em desenvolvimento full-stack, trabalhando com Java (GWT), Node.js e JavaScript para criar aplicações dinâmicas e responsivas. Além disso, sou especialista em web scraping e automação, onde desenvolvo crawlers robustos que extraem e processam dados de forma eficiente. Também trabalhei com integrações de API, incluindo WhatsApp e Telegram, para permitir notificações em tempo real e sistemas automatizados. Minha expertise abrange desde o desenvolvimento de ERPs até soluções personalizadas de automação, sempre com foco em desempenho, confiabilidade e escalabilidade. Vamos nos conectar e colaborar em projetos inovadores!"
      },
      {
        "id": "three",
        "class": "spotlight style3",
        "image": "images/future.png",
        "title": "Habilidades & Tecnologias",
        "content": "Tenho experiência prática com uma variedade de tecnologias que me permitem desenvolver soluções eficientes e escaláveis. Linguagens de Programação: Java, JavaScript, Node.js, C#; Desenvolvimento Web: GWT, HTML, CSS; Bancos de Dados: MySQL, PostgreSQL; Automação & Web Scraping: Puppeteer, Selenium, Integração de API; Ferramentas de Desenvolvimento: Git, Postman, Bruno. Estou sempre ansioso para aprender e explorar novas tecnologias para me manter à frente no cenário tecnológico em constante evolução."
      },
      {
        "id": "four",
        "class": "style1",
        "title": "Projetos",
        "description": "Aqui estão alguns dos projetos nos quais trabalhei, mostrando minha expertise em desenvolvimento full-stack, web scraping, automação e engenharia de software. Cada projeto reflete meu compromisso com eficiência, escalabilidade e resolução de problemas, utilizando tecnologias modernas para entregar soluções impactantes. Desde extração inteligente de dados até sistemas automatizados e aplicações web personalizadas, meu foco é construir soluções práticas e de alto desempenho adaptadas às necessidades do mundo real. Sinta-se à vontade para explorar meu trabalho e entrar em contato se tiver alguma dúvida!",
        "projects": [
          {
            "title": "Sistema de Raspagem e Notificação Automatizada de Passagens Aéreas",
            "image": "images/ProjetoPassagens.png",
            "description": "Desenvolvi uma plataforma web que automatiza o processo de raspagem de dados de passagens aéreas e filtra os resultados com base em critérios predefinidos. O sistema integra um crawler e scraper, extrai informações de voos e envia notificações automaticamente via WhatsApp e Telegram. Além disso, possui um rastreador de progresso em tempo real para a extração de dados e o envio de mensagens.",
            "skills": [
              "Web Scraping & Automação – Extração e processamento eficiente de dados de voos.",
              "Desenvolvimento Full-Stack – Construção de uma interface web dinâmica para rastreamento em tempo real.",
              "Integração de API – Conexão com WhatsApp e Telegram para notificações automatizadas.",
              "Otimização de Processos – Automação da filtragem de dados e entrega de mensagens para uma experiência de usuário perfeita."
            ],
            "githubLink": "https://github.com/cezarnovaes/Projeto_Passagens"
          },
          {
            "title": "Plataforma de Análise de Preços de Mercado (IEMI)",
            "image": "images/ProjetoIEMI.png",
            "description": "Desenvolvi uma plataforma web full-stack para análise de preços de mercado, integrando dados coletados por mais de 100 robôs de web scraping. O sistema conta com um dashboard interativo exibindo insights principais e diversas interfaces gráficas para análise de preços. Além disso, atuei na automação e gerenciamento dos crawlers para garantir uma extração e processamento eficiente dos dados.",
            "skills": [
              "Desenvolvimento Full-Stack – Construção de uma plataforma web responsiva e intuitiva para análise de preços.",
              "Dashboard & Visualização de Dados – Criação de dashboards interativos e relatórios gráficos.",
              "Web Scraping & Automação – Desenvolvimento e gerenciamento de mais de 100 crawlers usando Puppeteer, Node.js e Java.",
              "Processamento de Dados Escalável – Organização da execução automatizada e integração dos dados na plataforma."
            ],
            "githubLink": "https://iemi.com.br/ferramenta-de-pricing/"
          },          
          {
            "title": "Sistema de Cadastro de Cartões de Crédito",
            "image": "images/pic05.jpg",
            "description": "Este projeto foi desenvolvido como uma tarefa do 4º semestre da faculdade. É um sistema de cadastro e gerenciamento de cartões de crédito construído em Java com conexão a um banco de dados MySQL. O sistema permite que os usuários cadastrem, visualizem, editem e excluam informações de cartões de crédito, além de validar dados como números de cartão e datas de validade. Ele demonstra minhas habilidades em programação Java, gerenciamento de banco de dados e técnicas de validação de dados.",
            "githubLink": "https://github.com/cezarnovaes/Trabalho-Final-1"
          },
          {
            "title": "Implementação de Algoritmos de Ordenação em Python",
            "image": "images/pic06.jpg",
            "description": "Este projeto envolveu a implementação de três algoritmos fundamentais de ordenação em Python: Selection Sort, Merge Sort e Quick Sort. Cada algoritmo foi desenvolvido do zero para demonstrar um entendimento profundo de sua lógica, complexidade de tempo e eficiência. O projeto destaca minha capacidade de trabalhar com estruturas de dados, otimizar código e analisar o desempenho de algoritmos. Serve como um exemplo prático das minhas habilidades de resolução de problemas e proficiência em programação Python.",
            "githubLink": "https://github.com/cezarnovaes/Sorting"
          }
        ]
      }
    ],
    "footer": {
      "title": "Entre em Contato",
      "description": "Estou sempre aberto a novas oportunidades, colaborações e projetos emocionantes! Se você tem uma ideia, uma proposta ou apenas quer conversar, sinta-se à vontade para entrar em contato. Você pode me enviar um e-mail ou se conectar comigo nas redes sociais.",
      "contacts": [
        {
          "type": "email",
          "value": "cezarnovaes14@gmail.com",
          "link": "mailto:cezarnovaes14@gmail.com"
        },
        {
          "type": "linkedin",
          "value": "https://www.linkedin.com/in/cezar-novaes-12a898193/",
          "link": "https://www.linkedin.com/in/cezar-novaes-12a898193/"
        },
        {
          "type": "github",
          "value": "https://github.com/cezarnovaes",
          "link": "https://github.com/cezarnovaes"
        }
      ]
    }
  }