import { useState } from "react";

export const AppDate = ({ day, month, year, setDay, setMonth, setYear }) => {
    const handleNext = () => {
        if (year % 4 == 0) {
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                    if (day == 31) {
                        setDay(1)
                        setMonth(month + 1)
                    } else {
                        setDay(day + 1)
                    }
                    break
                case 12:
                    if (day == 31) {
                        setDay(1)
                        setMonth(1)
                        setYear(year + 1)
                    } else {
                        setDay(day + 1)
                    }
                    break
                case 4:
                case 6:
                case 9:
                case 11:
                    if (day == 30) {
                        setDay(1)
                        setMonth(month + 1)
                    } else {
                        setDay(day + 1)
                    }
                    break
                case 2:
                    if (day == 29) {
                        setDay(1)
                        setMonth(month + 1)
                    } else {
                        setDay(day + 1)
                    }
                    break
            }
        } else {
            switch (month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                    if (day == 31) {
                        setDay(1)
                        setMonth(month + 1)
                    } else {
                        setDay(day + 1)
                    }
                    break
                case 12:
                    if (day == 31) {
                        setDay(1)
                        setMonth(1)
                        setYear(year + 1)
                    } else {
                        setDay(day + 1)
                    }
                    break
                case 4:
                case 6:
                case 9:
                case 11:
                    if (day == 30) {
                        setDay(1)
                        setMonth(month + 1)
                    } else {
                        setDay(day + 1)
                    }
                    break
                case 2:
                    if (day == 28) {
                        setDay(1)
                        setMonth(month + 1)
                    } else {
                        setDay(day + 1)
                    }
            }
        }
    }

    const handlePrev = () => {
        if (year % 4 == 0) {
            switch (month) {
                case 1:
                    if (day == 1) {
                        setDay(31)
                        setMonth(12)
                        setYear(year - 1)
                    } else {
                        setDay(day - 1)
                    }
                    break
                case 12:
                case 10:
                case 8:
                case 7:
                case 5:
                    if (day == 1) {
                        setDay(30)
                        setMonth(month - 1)
                    } else {
                        setMonth(month - 1)
                    }
                    break
                case 11:
                case 9:
                case 6:
                case 4:
                case 2:
                    if (day == 1) {
                        setDay(31)
                        setMonth(month - 1)
                    } else {
                        setDay(day - 1)
                    }
                    break
                case 3:
                    if (day == 1) {
                        setDay(29)
                        setMonth(month - 1)
                    } else {
                        setDay(day - 1)
                    }
            }
        } else {
            switch (month) {
                case 1:
                    if (day == 1) {
                        setDay(31)
                        setMonth(12)
                        setYear(year - 1)
                    } else {
                        setDay(day - 1)
                    }
                    break
                case 12:
                case 10:
                case 8:
                case 7:
                case 5:
                    if (day == 1) {
                        if (month == 2 || month == 4 || month == 6 || month == 8 || month == 9 || month == 11) {
                            setDay(31)
                            setMonth(month - 1)
                        } else {
                            setDay(30)
                            setMonth(month - 1)
                        }
                    } else {
                        setDay(day - 1)
                    }
                    break
                case 11:
                case 9:
                case 6:
                case 4:
                case 2:
                    if (day == 1) {
                        setDay(31)
                        setMonth(month - 1)
                    } else {
                        setDay(day - 1)
                    }
                    break
                case 3:
                    if (day == 1) {
                        setDay(28)
                        setMonth(month - 1)
                    } else {
                        setDay(day - 1)
                    }
            }
        }
    }

    return (
        <>
            <box-icon name='chevron-left' size="md" onClick={handlePrev} />
            <span className="date_value">{`${day}/${month}/${year}`}</span>
            <box-icon name='chevron-right' size="md" onClick={handleNext} />
        </>
    )
}
