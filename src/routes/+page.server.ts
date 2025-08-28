// src/routes/contact/+page.server.js
import { fail, type Actions } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
// import { Resend } from 'resend';

const transporter = nodemailer.createTransport({
	 service: "gmail",
        auth: {
            user: "nicolasalmeida.ps@gmail.com",
            pass: env.GMAIL_PASSWORD,
        },
});

// const resend = new Resend(env.RESEND_API_KEY);

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

			console.log(data);
			const name = sanitizeInput(data.get('name'));
			const email = sanitizeInput(data.get('email'));
			const message = sanitizeInput(data.get('message'));

			// if (!name || name.length < 2) {
            //     console.log("ERRO")
			// 	return fail(400, { message: 'Name is required and must be at least 2 characters long' });
			// }

			if (!email || !isValidEmail(email)) {
                console.log("ERRO")
				return fail(400, { message: 'Valid email address is required' });
			}

			// if (!message || message.length < 10) {
            //     console.log("ERRO")
			// 	return fail(400, {
			// 		message: 'Message is required and must be at least 10 characters long'
			// 	});
			// }

			// await transporter.verify();

			const mailOptions = {
				from: '"NicolasTeste" <nickbrpvp@gmail.com>',
				to: 'nicolasalmeida.ps@gmail.com',
				subject: `New Contact Form Message from ${name}`,
				html: `
					<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
						<h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
							New Contact Form Submission
						</h2>
						
						<div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
							<h3 style="margin-top: 0; color: #007bff;">Contact Details:</h3>
							<p><strong>Name:</strong> ${name}</p>
							<p><strong>Email:</strong> ${email}</p>
						</div>
						
						<div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
							<h3 style="margin-top: 0; color: #007bff;">Message:</h3>
							<p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
						</div>
						
						<div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #6c757d;">
							<p><strong>Sent from:</strong> Contact Form</p>
							<p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
							<p><strong>Reply to:</strong> ${email}</p>
						</div>
					</div>
				`
			};

			const info = await transporter.sendMail(mailOptions);

			console.log('Message sent: %s', info);

			return {
				success: true,
				message: 'Message sent successfully!'
			};
		} catch (error) {
			console.error('Error sending email:', error);
		}
	}
} satisfies Actions