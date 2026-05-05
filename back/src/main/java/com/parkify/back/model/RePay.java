package com.parkify.back.model;

import jakarta.persistence.*;

@Entity
@Table(name="RePay")
public class RePay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int timeOut;
    @Enumerated(EnumType.STRING)
    private TimeOut type;
    @PrePersist
    public void prePersist() {
        type = TimeOut.Day;
        timeOut = 1;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public int getTimeOut() {
        return timeOut;
    }

    public void setTimeOut(int timeOut) {
        this.timeOut = timeOut;
    }

    public TimeOut getType() {
        return type;
    }

    public void setType(TimeOut type) {
        this.type = type;
    }
}
