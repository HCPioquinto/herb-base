

export const checkObjectLength = obj => {
  return Object.keys(obj).length;
}

export const formatDate = dateInSeconds => {
  const dateInMilliSeconds = dateInSeconds * 1000;
  const date = new Date(dateInMilliSeconds);
  const formattedDate = date.toLocaleString('default', 
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('default');


  return `${formattedDate} ${formattedTime}`;
}