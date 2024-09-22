"use client";

const getUser = async () => {
  const data = await fetch("http://localhost:3000/api/user");
  return data.json();
};
