package com.parkify.back.dto;

public class UserBookingHistoryDTO {
    private long total;
    private long thisWeek;
    private long thisMonth;

    public UserBookingHistoryDTO(Long total, Long thisWeek, Long thisMonth) {
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
