// src/emailSender.js

const nodemailer = require('nodemailer');
const { decrypt } = require('./utils/encryption');
const { getUsers } = require('./database');

async function sendEmails() {
    try {
        // Obtendo todos os usuários do banco de dados
        const users = await getUsers();

        // Configuração do transporte de e-mail (substitua com suas credenciais SMTP)
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'quantumteam23@outlook.com',
                pass: 'quantumteam2023'
            },
            tls: {
                rejectUnauthorized: false // Desabilitar verificação de certificado SSL
            }
        });

        // Definindo o tamanho máximo do batch de e-mails
        const maxBatchSize = 5;
        const delayBetweenEmails = 1000; // 1 segundo de atraso entre os e-mails

        // Iterando sobre os usuários e enviando e-mails
        for (let i = 0; i < users.length; i += maxBatchSize) {
            const batch = users.slice(i, i + maxBatchSize);
            await Promise.all(batch.map(async (user, index) => {
                const decryptedName = decrypt(user.nome);
                const decryptedEmail = decrypt(user.email);

                // Configurando o assunto do e-mail
                const subject = 'Alerta de comprometimento de dados';

                // Configurando o texto do e-mail com o nome do usuário
                const text = `Caro (a) ${decryptedName},\n\nViemos por meio deste e-mail alertar sobre o comprometimento da nossa base de dados, portanto, aconselhamos fortemente a mudança de suas credenciais e dados no nosso sistema. As devidas providências já estão sendo tomadas.\n\nAgradecemos a compreensão.`;

                // Configurando o e-mail
                const mailOptions = {
                    from: 'quantumteam23@outlook.com',
                    to: decryptedEmail,
                    subject: subject,
                    text: text
                };

                // Enviando o e-mail com atraso entre cada um
                await new Promise(resolve => setTimeout(resolve, index * delayBetweenEmails));
                const info = await transporter.sendMail(mailOptions);
                console.log(`E-mail enviado para ${decryptedEmail}: ${info.messageId}`);
            }));
        }
    } catch (error) {
        console.error('Erro ao enviar e-mails:', error);
    }
}

module.exports = { sendEmails };
