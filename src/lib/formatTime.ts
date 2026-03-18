const formatTime = (time: number) => {
  const totalSeconds = Math.max(0, Math.floor(time));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHrs = hours.toString().padStart(2, "0");
  const formattedMin = minutes.toString().padStart(2, "0");
  const formattedSec = seconds.toString().padStart(2, "0");

  // Nếu còn hơn 1 tiếng (hours > 0), hiển thị HH:mm:ss
  // Nếu dưới 1 tiếng, hiển thị mm:ss
  if (hours > 0) {
    return `${formattedHrs}:${formattedMin}:${formattedSec}`;
  }

  return `${formattedMin}:${formattedSec}`;
};

export default formatTime;
