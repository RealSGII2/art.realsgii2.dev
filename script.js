const e = q => document.querySelector(q);
const ea = q => document.querySelectorAll(q);

const hero = e(".heroBanner");

document.body.addEventListener("scroll", () => {
  const scroll = document.body.scrollTop;

  hero.style.top = scroll * 0.5 + "px";
  hero.style.transform = `scale(${1 + scroll * 0.0005})`;
  hero.style.filter = `blur(${Math.round(scroll * 0.05)}px)`;

  if (scroll / window.innerHeight > 0.95) {
    e(".appbar").classList.add("scrolled");
  } else {
    e(".appbar").classList.remove("scrolled");
  }
});

const cols = Array.from(ea(".imgCol"));

const test = false;

let url = "";

if (!test) {
  fetch("https://e926.net/posts.json?tags=realsgii2&limit=15").then(async r => {
    const { posts } = await r.json();

    posts.map((post, index) => {
      const col = cols[index % 4];

      const a = document.createElement("a");
      a.className = "imgPost";
      a.href = "#";

      a.addEventListener("click", () => {
        e(".lightBox img").src = post.file.url;
        url = `https://e926.net/posts/${post.id}`;
        e(".lightBox").style.display = "flex";
      });

      const img = document.createElement("img");
      img.src = post.file.url;

      a.appendChild(img);

      col.appendChild(a);
    });
  });
}

e(".lightBox button:not(.cta)").addEventListener("click", () => {
  e(".lightBox").style.display = "none";
});

e(".lightBox button.cta").addEventListener("click", () => {
  window.open(url, "_blank");
});