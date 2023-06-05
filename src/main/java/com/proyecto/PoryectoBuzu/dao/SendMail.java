package com.proyecto.PoryectoBuzu.dao;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class SendMail {


    private final String host = "smtp.gmail.com";
    private final int port = 587;
    private final String username = "jascmen@gmail.com";
    private final String password = "yqagsclolpcuaoox";
    private final String senderEmail = "jascmen@gmail.com";
    private final String subject = "Registro en BLuzu Pets Spa";

    public void enviarCorreo(String recipientEmail) {
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
            message.setSubject(subject);
            message.setText("Felicidades, acabas de registrar en BLuzu Pets Spa.");

            Transport.send(message);

            System.out.println("Correo enviado correctamente.");
        } catch (MessagingException e) {
            System.out.println("Error al enviar el correo: " + e.getMessage());
        }
    }


}
