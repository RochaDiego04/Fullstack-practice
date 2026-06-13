import { transport } from "../config/nodemailer";
import { confirmationTemplate } from "./templates/confirmationTemplate";

type EmailType = {
  name: string;
  email: string;
  token: string;
};

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    await transport.sendMail({
      from: "CashTrackr <admin@cashtrackr.com>",
      to: user.email,
      subject: "CashTrackr - Confirma tu cuenta",
      html: confirmationTemplate(user.name, user.token),
    });
  };
}
