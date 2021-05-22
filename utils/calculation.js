export const calculateDays = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const days = Math.round(Math.abs((startDate - endDate) / oneDay));
  return days;
};

export const calculateRoomPrice = (rooms) => {
  let sum = 0;

  rooms.forEach((room) => {
    const price = room.room.price;
    const quantity = Number(room.quantity);
    const sumRooms = price * quantity;

    sum += sumRooms;
  });

  return sum;
};

export const calculateSubtotal = (price, days) => {
  return price * days;
};
