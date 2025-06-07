export function formatTimeSince(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} 년 전`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} 개월 전`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} 일 전`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} 시간 전`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} 분 전`;
  }

  return `${seconds} 초 전`;
}
