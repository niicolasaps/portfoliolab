export type Locale = 'pt' | 'en';

const browser = typeof window !== 'undefined';

export function getInitialLocale(): Locale {
	if (!browser) return 'pt';
	const saved = (localStorage.getItem('locale') as Locale | null) ?? null;
	if (saved) return saved;
	const nav = navigator.language?.toLowerCase() ?? 'pt';
	return nav.startsWith('pt') ? 'pt' : 'en';
}

export function getLocale(): Locale {
	if (!browser) return 'pt';
	const saved = localStorage.getItem('locale') as Locale | null;
	return saved === 'pt' || saved === 'en' ? saved : getInitialLocale();
}

export function switchLocale(next: Locale) {
	if (!browser) return;
	localStorage.setItem('locale', next);
	document.documentElement.lang = next;
	window.dispatchEvent(new CustomEvent('localechange', { detail: next }));
}

type Dict = Record<string, string>;

type Dictionaries = Record<Locale, Dict>;

export const dictionaries: Dictionaries = {
	pt: {
		// Brand / Hero
		'brand.name': 'Nicolas Almeida',
		'hero.intro':
			'Estudante de Engenharia de Software na PUC Minas, apaixonado por tecnologia e afins, sempre em busca de aprendizado e desenvolvimento',

		// Navigation
		'nav.home': 'Home',
		'nav.about': 'Sobre mim',
		'nav.projects': 'Projetos',
		'nav.experiences': 'Experiências',
		'nav.contact': 'Contato',

		// A11y
		'aria.open_menu': 'Abrir menu',
		'aria.switch_to_pt': 'Mudar para Português',
		'aria.switch_to_en': 'Switch to English',

		// Footer
		'footer.quote': 'Citação',
		'footer.quote_text': 'A melhor forma de prever o futuro é inventá-lo.',
		'footer.quote_author': '- Alan Kay',
		'footer.navigation': 'Navegação',
		'footer.connect': 'Conecte-se',
		'footer.about': 'Sobre',
		'footer.projects': 'Projetos',
		'footer.experiences': 'Experiências',
		'footer.contact': 'Contato',
		'footer.rights': 'Todos os direitos reservados.',

		// About section
		'about.title': 'Sobre mim',
		'about.who': 'Quem sou eu',
		'about.who_text':
			'Olá! Sou o Nicolas e desde pequeno sempre fui apaixonado pela área de tecnologia, foi então a partir dos meus 12 anos que comecei a estudar e me interessar cada vez mais na área, aos 15 anos virei técnico em hardware e sistemas operacionais. Aos 19 anos entrei para a PUC Minas para aprimorar mais meu conhecimento, dessa vez expandindo para área de programação e desenvolvimento para cada vez mais ficar melhor e mais completo.',
		'about.skills': 'Habilidades',

		// Projects & Experience
		'projects.title': 'Projetos',
		'projects.1.title': 'MyFood',
		'projects.1.desc': 'Este projeto visa desenvolver uma alternativa para a população facilmente poder realizar todos os passos de um pedido em um restaurante, da seleção do prato, até sua avaliação.',
		'projects.2.title': 'Aqua Vida',
		'projects.2.desc': 'Este projeto visa desenvolver uma alternativa para os envolvidos de um serviços de tratamento de água possam executar todos os passos, desde o cadastro dos clientes, ate a efetivação de contratos de serviços.',
		'projects.3.title': 'Projeto 3',
		'projects.3.desc': 'Descrição do projeto, tecnologias utilizadas e objetivos alcançados.',
		'experiences.title': 'Experiências',
		'experiences.1.role': 'Estagiário de Testes',
		'experiences.1.company': 'Teknisa',
		'experiences.1.period': '2025 - Presente',
		'experiences.1.desc':
			'Realizou testes manuais no sistema HCM Folha, um sistema de gestão de folha de pagamento e ponto de frequência, garantindo a qualidade e funcionalidade do software. Atuou na criação e execução de casos de teste, identificação e documentação de defeitos, além de colaborar com a equipe de desenvolvimento para resolver problemas encontrados. Participou ativamente de reuniões diárias e revisões de sprint, contribuindo para a melhoria contínua dos processos de teste e desenvolvimento ágil.',
		'experiences.2.role': 'Desenvolvedor Full-stack',
		'experiences.2.company': 'Startup ABC',
		'experiences.2.period': '2020 - 2022',
		'experiences.2.desc':
			'Desenvolvimento completo de aplicações web, desde o front-end até o back-end, incluindo banco de dados e APIs.',

		// Project detail page translations
		'projects.not_found': 'Projeto não encontrado',
		'projects.back_to_projects': 'Voltar aos Projetos',
		'projects.view_live': 'Ver Projeto',
		'projects.view_code': 'Ver Código',
		'projects.technologies': 'Tecnologias',
		'projects.description': 'Descrição',
		'projects.features': 'Funcionalidades',
		'projects.ongoing': 'Em andamento',
		'projects.status.completed': 'Concluído',
		'projects.status.in-progress': 'Em Progresso',
		'projects.status.planned': 'Planejado',

		'projects.see_more': 'Ver mais',

		// Detailed descriptions and features
		'projects.1.detailed_desc':
			'Este projeto visa desenvolver uma alternativa para a população facilmente poder realizar todos os passos de um pedido em um restaurante, da seleção do prato, até sua avaliação. Nesse projeto pude colocar em prática todo o processo de uma criação de software com back end em Spring Boot, realização de diagramas DER, processos BPMN, entre outros, pude trabalhar com Svelte, Java Spring Boot e PostgreSQL. Foram realizados testes manuais e automatizados com JUnit.',
		'projects.1.feature1': 'Interface responsiva e intuitiva',
		'projects.1.feature2': 'Spring Boot RESTful API robusta',
		'projects.1.feature3': 'Módulo de pagamento seguro',

		'projects.2.detailed_desc':
			'Este projeto visa desenvolver uma alternativa para os envolvidos de um serviços de tratamento de água possam executar todos os passos, desde o cadastro dos clientes, ate a efetivação de contratos de serviços.',
		'projects.2.feature1': 'Componentes Svelte reutilizáveis',
		'projects.2.feature2': 'Tipagem completa com TypeScript',
		'projects.2.feature3': 'Bundle otimizado e performático',

		'projects.3.detailed_desc':
			'Aplicação mobile-first construída com Vue.js e Firebase, oferecendo sincronização em tempo real e experiência offline. Integração completa com serviços de nuvem.',
		'projects.3.feature1': 'Sincronização em tempo real',
		'projects.3.feature2': 'Funcionalidade offline',
		'projects.3.feature3': 'Integração com Firebase',

		'contact.title': 'Contato',
		'contact.open_to_work': 'Aberto para trabalho e colaborações',
		'contact.email_label': 'EMAIL',
		'contact.location_label': 'LOCALIZAÇÃO',
		'contact.location_value': 'Belo Horizonte - MG',
		'form.name': 'Nome',
		'form.email': 'Email',
		'form.message': 'Mensagem',
		'form.placeholder.name': 'Insira seu nome',
		'form.placeholder.email': 'Insira seu email',
		'form.placeholder.message': 'Digite sua mensagem',
		'form.submit': 'Enviar',

		'projects.page.title': 'Projetos - Portfólio',
		'projects.page.description': 'Explore meu portfólio de projetos de desenvolvimento web',

		// Main heading and description
		'projects.heading.my': 'Meus',
		'projects.heading.projects': 'Projetos',
		'projects.description2':
			'Explore meu portfólio de projetos de desenvolvimento web, apresentando tecnologias modernas e soluções inovadoras.',

		// Filter buttons
		'projects.filter.all': 'Todos',

		// Empty state
		'projects.empty.title': 'Nenhum projeto encontrado',
		'projects.empty.description': 'Tente ajustar seus filtros ou volte mais tarde.',

		// Accessibility
		'projects.image.alt': 'Imagem do projeto'
	},
	en: {
		// Brand / Hero
		'brand.name': 'Nicolas Almeida',
		'hero.intro':
			'Software Engineering student at PUC Minas, passionate about technology and related subjects, always seeking learning and development.',

		// Navigation
		'nav.home': 'Home',
		'nav.about': 'About',
		'nav.projects': 'Projects',
		'nav.experiences': 'Experience',
		'nav.contact': 'Contact',

		// A11y
		'aria.open_menu': 'Open menu',
		'aria.switch_to_pt': 'Switch to Portuguese',
		'aria.switch_to_en': 'Switch to English',

		// Footer
		'footer.quote': 'Quote',
		'footer.quote_text': 'The best way to predict the future is to invent it.',
		'footer.quote_author': '- Alan Kay',
		'footer.navigation': 'Navigation',
		'footer.connect': 'Connect',
		'footer.about': 'About',
		'footer.projects': 'Projects',
		'footer.experiences': 'Experience',
		'footer.contact': 'Contact',
		'footer.rights': 'All rights reserved.',

		// About section
		'about.title': 'About me',
		'about.who': 'Who am I',
		'about.who_text':
			'Hello! My name is Nicolas, and since I was a child, I have always been passionate about technology. At the age of 12, I began studying and becoming increasingly interested in the field. By the time I was 15, I had become a technician in hardware and operating systems. At 19, I joined PUC Minas to further enhance my knowledge, this time expanding into programming and development in order to become better and more well-rounded.',
		'about.skills': 'Skills',

		// Projects & Experience
		'projects.title': 'Projects',
		'projects.1.title': 'MyFood',
		'projects.1.desc': 'This project aims to develop an alternative for the population to easily carry out all the steps of ordering at a restaurant, from selecting the dish to its evaluation.',
		'projects.2.title': 'Aqua Vida',
		'projects.2.desc': 'This project aims to develop an alternative for those involved in water treatment services to carry out all the steps, from customer registration to the execution of service contracts.',
		'projects.3.title': 'Project 3',
		'projects.3.desc': 'Project description, tech used and goals achieved.',
		'experiences.title': 'Experience',
		'experiences.1.role': 'Testing Intern',
		'experiences.1.company': 'Teknisa',
		'experiences.1.period': '2025 - Present',
		'experiences.1.desc':
			'Performed manual testing on the HCM Payroll system, a payroll and time tracking management system, ensuring software quality and functionality. Contributed to the creation and execution of test cases, identification and documentation of defects, and collaborated with the development team to resolve identified issues. Actively participated in daily meetings and sprint reviews, contributing to the continuous improvement of testing processes and agile development.',
		'experiences.2.role': 'Full-stack Developer',
		'experiences.2.company': 'Startup ABC',
		'experiences.2.period': '2020 - 2022',
		'experiences.2.desc':
			'End-to-end web development from front-end to back-end, including databases and APIs.',

		// Project detail page translations
		'projects.not_found': 'Project not found',
		'projects.back_to_projects': 'Back to Projects',
		'projects.view_live': 'View Live',
		'projects.view_code': 'View Code',
		'projects.technologies': 'Technologies',
		'projects.description': 'Description',
		'projects.features': 'Features',
		'projects.ongoing': 'Ongoing',
		'projects.status.completed': 'Completed',
		'projects.status.in-progress': 'In Progress',
		'projects.status.planned': 'Planned',

		'projects.see_more': 'See more',

		// Detailed descriptions and features
		'projects.1.detailed_desc':
			'This project aims to develop an alternative for customers to easily go through all the steps of placing an order in a restaurant, from selecting a dish to providing feedback. In this project, I was able to put into practice the entire software development process, with a backend built in Spring Boot, creation of ER diagrams, BPMN processes, among others. I worked with Svelte, Java Spring Boot, and PostgreSQL. Both manual and automated tests with JUnit were carried out.',
		'projects.1.feature1': 'Responsive and intuitive interface',
		'projects.1.feature2': 'Spring Boot Robust RESTful API',
		'projects.1.feature3': 'Secure payment module',

		'projects.2.detailed_desc':
			'Application developed with Svelte and TypeScript, demonstrating the efficiency and simplicity of the framework. Focus on reusable components and strong typing.',
		'projects.2.feature1': 'Reusable Svelte components',
		'projects.2.feature2': 'Complete TypeScript typing',
		'projects.2.feature3': 'Optimized and performant bundle',

		'projects.3.detailed_desc':
			'Mobile-first application built with Vue.js and Firebase, offering real-time synchronization and offline experience. Complete integration with cloud services.',
		'projects.3.feature1': 'Real-time synchronization',
		'projects.3.feature2': 'Offline functionality',
		'projects.3.feature3': 'Firebase integration',
		// Contact
		'contact.title': 'Contact',
		'contact.open_to_work': 'Open to work & Collabs',
		'contact.email_label': 'EMAIL',
		'contact.location_label': 'LOCATION',
		'contact.location_value': 'Belo Horizonte - MG',

		// Form
		'form.name': 'Name',
		'form.email': 'Email',
		'form.message': 'Message',
		'form.placeholder.name': 'Please enter your name',
		'form.placeholder.email': 'Please enter your email',
		'form.placeholder.message': 'Enter your message',
		'form.submit': 'Submit',
		'projects.page.title': 'Projects - Portfolio',
		'projects.page.description': 'Explore my portfolio of web development projects',

		// Main heading and description
		'projects.heading.my': 'My',
		'projects.heading.projects': 'Projects',
		'projects.description2':
			'Explore my portfolio of web development projects, showcasing modern technologies and innovative solutions.',

		// Filter buttons
		'projects.filter.all': 'All',

		// Empty state
		'projects.empty.title': 'No projects found',
		'projects.empty.description': 'Try adjusting your filters or check back later.',

		// Accessibility
		'projects.image.alt': 'Project image'
	}
};

export function translate(key: string, locale?: Locale): string {
	const l = locale ?? getLocale();
	return dictionaries[l]?.[key] ?? key;
}
