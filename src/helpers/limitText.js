const limitText = (text, limit = 140) => {
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 3)}...`;
};

export default limitText;
