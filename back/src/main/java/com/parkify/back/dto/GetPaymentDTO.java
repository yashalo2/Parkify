package com.parkify.back.dto;
import java.time.Instant;
import com.parkify.back.model.PaymentStatus;
public class GetPaymentDTO {
        private long id;
        private String date;
        private String  status;
        private String area;
        private int level;
        private String spot;
        private double price;

        public long getId() {
            return id;
        }

        public String getDate() {
            return date;
        }

        public String getStatus() {
            return status;
        }

        public String getArea() {
            return area;
        }

        public int getLevel() {
            return level;
        }

        public String getSpot() {
            return spot;
        }

        public double getPrice() {
            return price;
        }

        public GetPaymentDTO(long id, Instant date, PaymentStatus status, String area, int level, String spot, double price) {
            this.id = id;
            this.date = date.toString();
            this.status = status.toString();
            this.area = area;
            this.level = level;
            this.spot = spot;
            this.price = price;
        }


}
