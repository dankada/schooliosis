// import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
  const postsContainer = document.getElementById("postsContainer");
  const loading = document.getElementById("loading");
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function fetchPosts() {
    showLoading(true);
    try {
      await sleep(5000); 
      console.log("5seconds passed!!");
 
      const res = await fetch(API_URL);

      if (!res.ok) throw new Error("Failed to fetch posts");
      

      let data = await res.json();
      // Limit to 30 posts
      data = data.slice(0, 30);
      renderPosts(data);
    } catch (err) {
      postsContainer.innerHTML = `<p class="text-red-500">Error: ${err.message}</p>`;
      console.error(err);
    } finally {
      showLoading(false);
    }
  }

  function showLoading(isLoading) {
    if (isLoading) {
      loading.classList.remove("hidden");
    } else {
      loading.classList.add("hidden");
    }
  }

  function renderPosts(posts) {
    postsContainer.innerHTML = ""; // clear container
    posts.forEach((post) => {
      const postEl = document.createElement("div");
      postEl.className = "bg-white p-4 rounded shadow";
      postEl.innerHTML = `
        <h2 class="font-semibold text-lg mb-2">${post.title}</h2>
        <p class="text-gray-700">${post.body}</p>
      `;
      postsContainer.appendChild(postEl);
    });
  }

  fetchPosts();
});
