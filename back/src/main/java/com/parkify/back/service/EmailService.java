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
    public void sendEmail(String to, String subject,int code) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setFrom("parkify.sign.up@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        String htmlContent = """
                            <div
                            style="
                              width: 90%;
                              max-width: 600px;
                              margin: auto;
                              padding: 20px;
                              border-radius: 10px;
                              background: #ffffff;
                              font-family: Arial, Helvetica, sans-serif;
                              border: 1px solid #e0e0e0;
                              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            "
                          >
                            <div
                              style="
                                text-align: center;
                                margin-bottom: 15px;
                                border-radius: 50%;
                                overflow: hidden;
                              "
                            >
                          <h1>P</h1>
                            </div>
                
                            <h2 style="color: #2c3e50; margin: 0 0 15px 0; text-align: center">
                              Parkify Smart Parking
                            </h2>
                
                            <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0" />
                
                            <p
                              style="
                                color: #333;
                                font-size: 16px;
                                line-height: 1.6;
                                margin: 0 0 15px 0;
                                text-align: left;
                              "
                            >
                              Thank you for Choosing Us And trusting us with your car.As You reuested
                              to sign-up for our service we have generated a code to verify it is you
                            </p>
                
                            <div
                              style="
                                background: #8e2de2;
                                color: #fff;
                                padding: 15px;
                                border-radius: 6px;
                                margin: 0 0 15px 0;
                                text-align: center;
                                font-size: 18px;
                                font-weight: bold;
                              "
                            >
                              <p>Your Verification Code is</p>
                              <br />
                              <h2>""" + code + """
                            </h2>
                            </div>
                
                            <p
                              style="
                                color: #555;
                                font-size: 13px;
                                line-height: 1.4;
                                margin: 0;
                                text-align: center;
                              "
                            >
                              If you didn’t initiate this request, please ignore this email.<br />
                              © 2026 Parkify Smart Parking
                            </p>
                          </div>
                """;
        helper.setText(htmlContent,true);
        mailSender.send(mimeMessage);
    }
}
