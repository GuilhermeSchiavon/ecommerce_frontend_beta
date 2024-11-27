import EmailService from '../../services/EmailService'

function header(firstLine){
    return `
        <div>
            <div height="100%" bgcolor="#f3f3f3" style="height:100%;padding:0">
                <table role="presentation" width="100%" bgcolor="#f3f3f3" border="0" cellpadding="0" cellspacing="0" style="background-color:#f3f3f3;border:0 none;border-collapse:collapse">
                <tbody>
                    <tr>
                    <td dir="ltr" align="center" bgcolor="#f3f3f3" style="padding:0;border-collapse:collapse">
                        <div bgcolor="#f3f3f3" style="margin:0 auto;padding:30px 10px;background-color:#f3f3f3">
                        <table role="presentation" width="100%" align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="margin:0;padding:0;max-width:600px;background-color:#ffffff;border:0 none;border-collapse:collapse">
                            <tbody>
                            <tr>
                                <td dir="ltr" style="padding:0;border-collapse:collapse">
                                    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"
                                        style="border:0 none;border-collapse:collapse">
                                        <tbody>
                                    <tr>
                                        <td style="display:none;opacity:0;overflow:hidden;max-height:0;max-width:0;border-collapse:collapse;font-size:1px;line-height:1px;color:#ffffff">
                                        ${firstLine}
                                        &nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr>&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr>&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr>&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr>&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr>&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌<wbr>&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌
                                        </td>
                                    </tr>
                                    <tr>
                                        <td width="100%" align="left" valign="top" style="padding:0;border-collapse:collapse">
                                        <table role="presentation" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border:0 none;border-collapse:collapse">
                                            <tbody>
                                            <tr>
                                                <td width="100%" align="center" valign="top" style="padding:30px 0 0;border-collapse:collapse">
                                                    <h1>
                                                        <a href="${process.env.VUE_APP_URL}" target="_blank">
                                                            <img src="${process.env.VUE_APP_URL}/img/logo.png" alt="${process.env.VUE_APP_TITLE}" width="200" style="display:block;max-width:200px">
                                                        </a>
                                                    </h1>
                                                </td>
                                            </tr>
        `
}

function footer(){
    return `
                                <tr>
                                    <td style="padding:35px 50px 0;border-collapse:collapse">
                                    <table role="presentation" width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border:0 none;border-collapse:collapse">
                                        <tbody>
                                        <tr>
                                            <td width="100%" style="padding:25px 0;border-collapse:collapse;border-top:solid 1px #ecedef">
                                            <table role="presentation" width="100%" align="left" border="0" cellpadding="0" cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                <tbody>
                                                <tr>
                                                    <td width="20%" align="left" valign="top" style="padding:0;border-collapse:collapse">
                                                    <a href="${process.env.VUE_APP_URL}/contact" target="_blank">
                                                        <img src="${process.env.VUE_APP_URL}/img/equipe_suporte.png"
                                                        width="160" alt="Imagem da Central de Ajuda" style="display:inline-block;max-width:160px" data-bit="iit">
                                                    </a>
                                                    </td>
                                                    <td width="80%" align="left" valign="top"
                                                    style="padding:0 0 0 27px;border-collapse:collapse">
                                                    <table role="presentation" width="100%" align="left" border="0"
                                                        cellpadding="0" cellspacing="0"
                                                        style="border:0 none;border-collapse:collapse">
                                                        <tbody>
                                                        <tr>
                                                            <td  width="100%"
                                                            style="padding:0;border-collapse:collapse;font-family:'Google Sans','Open Sans',Roboto,sans-serif;font-size:25px;line-height:30px;color:#000000">
                                                            <p>Dúvidas?</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="100%" style="padding:10px 0 0;border-collapse:collapse;font-family:'Google Sans','Open Sans',Roboto,sans-serif;font-weight:600;font-size:14px;line-height:17px;color:#000000">
                                                                <a href="${process.env.VUE_APP_URL}/contact" style="color:#1a73e8;text-decoration:none" target="_blank">
                                                                    Visite a Central de Ajuda
                                                                </a>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table role="presentation" width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
                        style="margin:0;padding:0;max-width:600px;border:0 none;border-collapse:collapse">
                        <tbody>
                        <tr>
                            <td dir="ltr" style="padding:30px 50px;border-collapse:collapse">
                            <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"
                                style="border:0 none;border-collapse:collapse">
                                <tbody>
                                <tr>
                                    <td width="100%" align="left" valign="top" style="padding:10px 0 0">
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0"
                                        style="border:0 none;border-collapse:collapse">
                                        <tbody>
                                        <tr>
                                            <td width="100%" align="center" style="padding:14px 0 0;font-family:'Google Sans Text',Roboto,Arial,sans-serif;color:#3c4043;font-size:12px;line-height:14px">
                                            <p>Enviamos este <span class="il">e</span>-<span class="il">mail</span> para avisar sobre
                                                informações importantes da sua conta d${process.env.VUE_APP_ARTIGO} ${process.env.VUE_APP_TITLE}. <span
                                                class="il">Se</span> você tiver dúvidas, quiser fazer comentários ou
                                                precisar de suporte, 
                                                <a href="${process.env.VUE_APP_URL}/contact" style="color:#1a73e8;text-decoration:none" target="_blank">
                                                    acesse este link
                                                </a>.
                                                </p>
                                            <p>‌<br><br></p>
                                            <p>© ${process.env.VUE_APP_TITLE} ${ new Date().toLocaleDateString("pt-BR", {  year: "numeric" })}. Todos os direitos reservados.<br></p>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>
    `
}

const actions = {
    async sendNewAccount({commit}, user){
        const firstLine = 'Ação necessária: Verifique seu e-mail, para confirmar sua Conta.'
        const formattedDate = new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
        const mailOptions = {
                "from":  `"${process.env.VUE_APP_TITLE}" <${process.env.VUE_APP_EMAIL}>`, // sender address
                "to": user.email,
                "subject": "SEJA BEM VINDO ✅",
                "html": header(firstLine) + `       <tr>
                                                        <td width="100%" align="center" valign="top" style="padding:30px 0 0;border-collapse:collapse">
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="100%" align="center" valign="top"
                                                style="padding:0 70px;border-collapse:collapse">
                                                <table role="presentation" width="100%" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                    <tbody>
                                                    <tr>
                                                        <td width="100%" align="center" valign="top"
                                                        style="padding:40px 0 0;border-collapse:collapse;font-family:'Google Sans',Roboto,sans-serif;font-size:24px;line-height:28px;color:#000000">
                                                        <p><span class="il">Confirme</span> <span class="il">se</span> <span
                                                            class="il">o</span> <span class="il">e</span>-<span class="il">mail</span>
                                                            <span class="il">que</span> <span class="il">está</span> <span
                                                            class="il">nos</span> <span class="il">nossos</span> registros é <span
                                                            class="il">o</span> correto</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="100%" valign="top" align="center" style="padding:44px 0 0">
                                                        <a href="${process.env.VUE_APP_URL}/confirm-account/${user.token}" aria-label="" style="text-decoration:none;display:table-cell" target="_blank">
                                                            <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                                                            style="border-collapse:initial">
                                                            <tbody>
                                                                <tr>
                                                                <td width="100%" align="center" valign="middle" bgcolor="#1a73e8"
                                                                    style="padding:11px 16px;border-radius:4px;font-family:Roboto,Arial,sans-serif;font-weight:bold;color:#ffffff;font-size:14px;line-height:17px;letter-spacing:normal">
                                                                    Verificar <span class="il">e</span>-<span class="il">mail</span>
                                                                </td>
                                                                </tr>
                                                            </tbody>
                                                            </table>
                                                        </a>
                                                        </td>
                                                    </tr>
                
                                                    <tr>
                                                        <td width="100%" align="left" valign="top"
                                                        style="padding:31px 0 0;border-collapse:collapse;font-family:'Google Sans Text',Roboto,sans-serif;font-size:16px;line-height:21px;color:#000000">
                                                        <p><span class="il">O</span> endereç<span class="il">o</span> de <span
                                                            class="il">e</span>-<span class="il">mail</span> <span
                                                            style="color:#000000;text-decoration:none">
                                                            <font><a href="#m_1062953341045519990_not-a-link"
                                                                style="color:#000000;text-decoration:none">${user.email}</a>
                                                            </font>
                                                            </span>
                                                            foi adicionado ao nosso registro n${process.env.VUE_APP_ARTIGO} ${process.env.VUE_APP_TITLE}</p>
                                                        <p style="line-height:19px">‌<br></p>
                                                        <p>Verifique <span class="il">se</span> este endereç<span class="il">o</span>
                                                        de <span class="il">e</span>-<span class="il">mail </span>
                                                        <span class="il">está</span> correto até ${ formattedDate }. Sua conta será suspenso <span class="il">se</span> <span class="il">o</span>
                                                        endereç<span class="il">o</span> de <span class="il">e</span>-<span
                                                        class="il">mail</span> nã<span class="il">o</span> for verificado até ${ formattedDate }.</p>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="100%" align="left" valign="top"
                                                style="padding:0 70px;border-collapse:collapse">
                                                <table role="presentation" width="100%" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                    <tbody>
                                                    <tr>
                                                        <td width="100%" style="padding:0;border-collapse:collapse">
                                                        <table role="presentation" width="100%" valign="middle" border="0" cellpadding="0" cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                            <tbody>
                                                            <tr>
                                                                <td width="100%" valign="middle" style="padding:37px 0 0;border-collapse:collapse">
                                                                <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td width="100%" style="padding:0;border-collapse:collapse;font-family:'Google Sans Text',Roboto,sans-serif;font-size:16px;line-height:21px;color:#000000">
                                                                        <p>Equipe do ${process.env.VUE_APP_TITLE}</p>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </td>
                                            </tr>
                ` + footer() }
        try {
            const response = await EmailService.send(mailOptions);
            return response.data
        } catch (error) {
            commit('SET_ALERT', {
                heading: 'error',
                message: error.response
            });
        }
    },
    async sendNewPassword({commit}, {userInput}){
        commit('SET_LOADING_USER', true)
        const firstLine = 'Solicitação para cadastrar uma nova senha de acesso.';
        const mailOptions = {
                "from":  `"${process.env.VUE_APP_TITLE}" <${process.env.VUE_APP_EMAIL}>`, // sender address
                "subject": "SOLICITAÇÃO DE ALTERAÇÃO DE SENHA",
            }
        const HTML = {
            'first': header(firstLine) + `</tbody>
                                                </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="100%" align="center" valign="top"
                                                style="padding:0 70px;border-collapse:collapse">
                                                <table role="presentation" width="100%" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                    <tbody>
                                                    <tr>
                                                        <td width="100%" align="center" valign="top"
                                                        style="padding:40px 0 0;border-collapse:collapse;font-family:'Google Sans',Roboto,sans-serif;font-size:24px;line-height:28px;color:#000000">
                                                        <p>
                                                        Recebemos uma solicitação para troca da senha de acesso
                                                        </p>
                                                        <p style="line-height:19px">‌<br></p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="100%" valign="top" align="center" style="padding:44px 0 0">
                                                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:initial">
                                                        <tbody>
                                                            <tr>
                                                                <td width="100%" align="center" valign="middle" bgcolor="#1a73e8" style="padding:11px 16px;border-radius:4px;font-family:Roboto,Arial,sans-serif;font-weight:bold;color:#ffffff;font-size:14px;line-height:17px;letter-spacing:normal">
                                                                    <a href="${process.env.VUE_APP_URL}/password-reset/`,
            'second': `" style="color:#fff; text-decoration:none; display:table-cell" target="_blank">
                                                                        Criar Nova senha
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                        </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td width="100%" align="left" valign="top"
                                                        style="padding:31px 0 0;border-collapse:collapse;font-family:'Google Sans Text',Roboto,sans-serif;font-size:16px;line-height:21px;color:#000000">
                                                        <p>Se você não solicitou essa troca, é possível que outra pessoa esteja tentando acessar a sua conta d${process.env.VUE_APP_ARTIGO} ${process.env.VUE_APP_TITLE}. 
                                                        <strong>Não encaminhe ou dê o código a ninguém.</strong>
                                                        </p>
                                                        <p style="line-height:19px">‌<br></p>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="100%" align="left" valign="top"
                                                style="padding:0 70px;border-collapse:collapse">
                                                <table role="presentation" width="100%" align="center" border="0" cellpadding="0"
                                                    cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                    <tbody>
                                                    <tr>
                                                        <td width="100%" style="padding:0;border-collapse:collapse">
                                                        <table role="presentation" width="100%" valign="middle" border="0" cellpadding="0" cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                            <tbody>
                                                            <tr>
                                                                <td width="100%" valign="middle" style="padding:37px 0 0;border-collapse:collapse">
                                                                <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border:0 none;border-collapse:collapse">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td width="100%" style="padding:0;border-collapse:collapse;font-family:'Google Sans Text',Roboto,sans-serif;font-size:16px;line-height:21px;color:#000000">
                                                                        <p>Equipe do ${process.env.VUE_APP_TITLE}</p>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                </td>
                                            </tr>
                ` + footer( )
        }
        const response = await EmailService.sendResetPassword(mailOptions, HTML, userInput);
        return response
    },
}

export default {
    actions
};