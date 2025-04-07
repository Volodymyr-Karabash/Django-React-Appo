export const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormat = `${hours % 12}:${minutes} ${ampm}`;
    return twelveHourFormat;
}

