"use client";

export const getLastRead = async () => {
  const data = await fetch("http://localhost:3000/api/user");
  return data.json();
};
