// تبدیل HH:mm به دقیقه از ابتدای روز
function timeStringToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

// اختلاف دقیقه بین دو تاریخ
function diffInMinutes(startDate, endDate) {
  const diffMs = endDate - startDate;
  return Math.floor(diffMs / (1000 * 60));
}

// اختلاف ساعت اعشاری
function diffInHours(startDate, endDate) {
  const diffMs = endDate - startDate;
  return diffMs / (1000 * 60 * 60);
}

// گرفتن روز هفته (0 تا 6)
function getDayOfWeek(date) {
  return date.getDay();
}

// بررسی اینکه زمان فعلی داخل بازه است یا نه
function isWithinTimeRange(currentDate, startTime, endTime) {
  if (!startTime || !endTime) return true;

  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();

  const startMinutes = timeStringToMinutes(startTime);
  const endMinutes = timeStringToMinutes(endTime);

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

module.exports = {
  timeStringToMinutes,
  diffInMinutes,
  diffInHours,
  getDayOfWeek,
  isWithinTimeRange,
};
