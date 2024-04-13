export const saveToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));

  return true;
};

export const fetchFromLS = (key) => {
  const storedData = localStorage.getItem(key);

  if (storedData) {
    const data = JSON.parse(storedData);
    return data;
  }
  return null;
};

export const removeFromLS = (key = null) => {
  if (key) {
    localStorage.removeItem(key);
  } else {
    localStorage.clear();
  }
  return true;
};
