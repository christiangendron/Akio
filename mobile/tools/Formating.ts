export function roundedCount(count:number) {
  if (count > 1000) {
    return Math.round(count / 1000) + 'k';
  }
  return count;
}

export function timeSince(createdUtc:number):string {
  const date = new Date(createdUtc * 1000);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + 'y';
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + 'm';
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + 'd';
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + 'h';
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + 'm';
  }

  return Math.floor(seconds) + 's';
}

export function shortenString(str: string, charLimit: number) {
  if (str.length > charLimit) {
    return str.slice(0, charLimit) + '...';
  } else {
    return str;
  }
}
