package com.proyecto.PoryectoBuzu.dao;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;

public class SendMail {


    private final String host = "smtp.gmail.com";
    private final int port = 587;
    private final String username = "dobleatila@gmail.com";
    private final String password = "cfznnorooebvbbhw";
    private final String senderEmail = "dobleatila@gmail.com";
    private final String subject = "Correo registrado en BLuzu Pets Spa";

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

            // Crear contenido HTML
            String htmlContent = "<div style=\"text-align: center;\">"
                    + "<h1 style=\"font-size: 36px; font-weight: bold; color: #ff0080;\">BluzuPetsPa</h1>"
                    + "<p style=\"font-size: 18px;\">Tu correo electrónico ha sido registrado exitosamente. Ahora podrás acceder con la contraseña que ingresaste.</p>"
                    + "<p style=\"font-size: 18px;\">Estamos felices que formes parte de nuestra familia. Te brindaremos todo lo que necesites para cuidar y engreír a esa mascota especial que te acompaña en todo momento.</p>"
                    + "</div>";

            // Establecer contenido HTML en el mensaje
            message.setContent(htmlContent, "text/html; charset=utf-8");

            // Enviar el mensaje
            Transport.send(message);

            System.out.println("Correo enviado correctamente.");
        } catch (MessagingException e) {
            System.out.println("Error al enviar el correo: " + e.getMessage());
        }
    }



}
