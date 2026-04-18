package com.parkify.back.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    public void sendEmail(String to, String subject, String text,int code) throws MessagingException {
        SimpleMailMessage message = new SimpleMailMessage();
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("parkify.sign.up@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        String htmlContent = """
                <div style="width:400px;margin:auto;padding:20px;
                border-radius:10px;box-shadow: 0 4px 8px #fff;background:#252525;">
                <h1 style="color:#fff">Welcome to Parkify!</h1>
                <p style="text-align:center;color:#fff;">
                please don't share this code <br> your verification code is <b style="color:#fff;">""" + code + """
                </p>
                </div>
                """;
        helper.setText(htmlContent,true);
        mailSender.send(mimeMessage);
    }
}
