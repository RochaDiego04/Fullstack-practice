import { transport } from "../config/nodemailer";
import { confirmationTemplate } from "./templates/confirmationTemplate";
import { resetPasswordTemplate } from "./templates/resetPasswordTemplate";

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

  static sendPasswordResetToken = async (user: EmailType) => {
    await transport.sendMail({
      from: "CashTrackr <admin@cashtrackr.com>",
      to: user.email,
      subject: "CashTrackr - Reestablece tu password",
      html: resetPasswordTemplate(user.name, user.token),
    });
  };
}
