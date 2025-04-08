
// export const generateTimeSlots = (start, end, interval) => { // start and end are strings in 24 hour format
//   let startTime = start.split(':');
//   let endTime = end.split(':');
//   let timeSlots = [];
//   for (let i = parseInt(startTime[0]); i < parseInt(endTime[0]); i++) {
//     for (let j = 0; j < 60; j += interval) {
//       let time = `${i < 10 ? '0' + i : i}:${j < 10 ? '0' + j : j}`;
//       timeSlots.push(time);
//     }
//   }
//   return timeSlots;
// };


// 12 hour format time slots
export const generateTimeSlots = (start, end, interval) => {
    let timeSlots = [];
    let startTime = new Date(`01/01/2021 ${start}`);
    let endTime = new Date(`01/01/2021 ${end}`);
    let currentTime = startTime;
    while (currentTime <= endTime) {
        timeSlots.push(currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        currentTime = new Date(currentTime.getTime() + interval * 60000);
    }
    return timeSlots;

};




