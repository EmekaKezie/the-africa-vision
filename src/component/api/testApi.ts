export async function getDogs() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random", {
      cache: "no-cache",
    });

  //const response = await post;
  const data = await response.json();
  return data;
}
