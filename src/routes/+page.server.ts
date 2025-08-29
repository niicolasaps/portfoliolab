// src/routes/contact/+page.server.js
import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

// O Nodemailer não é mais necessário, foi removido.
// const transporter = nodemailer.createTransport({ ... });

// Inicializa o Resend com sua chave de API das variáveis de ambiente
const resend = new Resend(env.RESEND_API_KEY);

// Funções de ajuda (sem alteração)
function isValidEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function sanitizeInput(input: string | FormDataEntryValue | null) {
	return input?.toString().trim().replace(/[<>]/g, '') || '';
}

export const actions = {
	send: async ({ request }) => {
		try {
			const data = await request.formData();
			const name = sanitizeInput(data.get('name'));
			const email = sanitizeInput(data.get('email'));
			const message = sanitizeInput(data.get('message'));

			// Validações básicas (é uma boa prática reativá-las)
			if (!email || !isValidEmail(email)) {
				return fail(400, { message: 'É necessário um endereço de email válido.' });
			}
			if (!name || !message) {
				return fail(400, { message: 'O nome e a mensagem são obrigatórios.' });
			}

			// ---- LÓGICA DE ENVIO COM RESEND ----
			const { error } = await resend.emails.send({
				// IMPORTANTE: Mude para seu email verificado no Resend para melhor entrega,
				// ou use o padrão 'onboarding@resend.dev' para testes.
				from: 'Contato Portfolio <onboarding@resend.dev>',
				
				// Seu email para onde a mensagem será enviada
				to: 'nicolasalmeida.ps@gmail.com',
				
				// Assunto do email que você receberá
				subject: `Nova mensagem do Portfolio de: ${name}`,
				
				// O corpo do email em HTML
				html: `
                  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                    <h2>Nova mensagem recebida do seu portfolio!</h2>
                    <hr>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <h3>Mensagem:</h3>
                    <p style="white-space: pre-wrap; background-color: #f8f9fa; padding: 15px; border-radius: 5px;">${message}</p>
                  </div>
                `,
				
				// ESSENCIAL: Permite que você clique em "Responder" no seu email
				// e a resposta vá diretamente para o email do usuário.
				replyTo: email
			});

			// Verifica se o Resend retornou um erro específico
			if (error) {
				console.error('Erro do Resend:', error);
				return fail(500, { message: 'Ocorreu um erro ao enviar o email.' });
			}

			console.log('Mensagem enviada com sucesso!');
			return {
				success: true,
				message: 'Mensagem enviada com sucesso!'
			};
		} catch (error) {
			console.error('Erro na action de envio:', error);
			// Retorna um erro genérico para o cliente
			return fail(500, { message: 'Ocorreu um erro inesperado.' });
		}
	}
};