export const resetPasswordTemplate = (name: string, token: string) => `
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:40px 0;">
      <tr>
        <td align="center">
          <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background-color:#1e293b;padding:28px 40px;">
                <p style="margin:0;font-size:26px;font-weight:800;color:#22c55e;letter-spacing:-0.5px;">CashTrackr</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px 40px;">
                <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#1e293b;">Hola, ${name} 👋</h2>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;">
                  Recibimos una solicitud para restablecer la contraseña de tu cuenta. Usa el siguiente código para continuar:
                </p>

                <!-- Token box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                  <tr>
                    <td align="center" style="background-color:#f1f5f9;border-radius:8px;padding:20px;">
                      <span style="font-size:36px;font-weight:800;letter-spacing:10px;color:#1e293b;">${token}</span>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;">
                  O haz clic en el botón para restablecer tu contraseña directamente:
                </p>

                <!-- Button -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                  <tr>
                    <td align="center">
                      <a href="${process.env.FRONTEND_URL}/auth/new-password"
                         style="display:inline-block;background-color:#22c55e;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;padding:14px 32px;">
                        Restablecer Password
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 20px;" />

                <p style="margin:0;font-size:13px;line-height:1.5;color:#94a3b8;">
                  Si no solicitaste un cambio de contraseña puedes ignorar este mensaje. El código expira en <strong>10 minutos</strong>.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f8fafc;padding:16px 40px;border-top:1px solid #e2e8f0;">
                <p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">
                  © ${new Date().getFullYear()} CashTrackr. Todos los derechos reservados.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
`;
