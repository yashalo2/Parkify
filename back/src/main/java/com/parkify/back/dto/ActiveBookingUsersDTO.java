package com.parkify.back.dto;

public class ActiveBookingUsersDTO {
    private long id;
    private long total;
    private long thisWeek;
    private long thisMonth;

    public ActiveBookingUsersDTO(Long id,Long total, Long thisWeek, Long thisMonth) {
        this.id = id;
        this.total = total;
        this.thisWeek = thisWeek;
        this.thisMonth = thisMonth;
    }

    public long getTotal() {
        return total;
    }

    public long getThisWeek() {
        return thisWeek;
    }

    public long getThisMonth() {
        return thisMonth;
    }

}
