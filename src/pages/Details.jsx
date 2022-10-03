import { useState, useEffect } from "react";

export function Details() {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState([]);
  const [data, setData] = useState([]);
  const ul = document.getElementById("ul");

  function Github() {
    if (user.length === 0) {
      alert("Digite um perfil");
      return;
    }

    if (user.length >= 1) {
      const content = document.getElementById("content");
      content.classList.toggle("hidden");

      fetch(`https://api.github.com/users/${user}`).then(async (res) => {
        const response = await res.json();
        setProfile(response);
      });

      fetch(`https://api.github.com/users/${user}/repos`).then(async (res) => {
        const response = await res.json();
        setData(response);
      });
    }
  }

  const avatar = profile.avatar_url;

  return (
    <div>
      <section className="text-white w-full flex flex-col items-center justify-center mt-20">
        <h2 className="text-5xl mb-6">Github Search</h2>
        <label className="flex items-center gap-2 mb-7">
          <input
            type="text"
            placeholder="Search your profile"
            className="px-2 py-1 text-black outline"
            onChange={(e) => setUser(e.target.value)}
          />
          <button
            className="text-black text-xl bg-white py-1 px-6 rounded-md flex items-center justify-center hover:bg-violet-300"
            onClick={Github}
          >
            +
          </button>
        </label>
        <ul className="flex flex-col gap-3 text-xl" id="ul">
          <form className="hidden" id="content">
            <label className="flex gap-4 mb-4">
              <img src={avatar} className="w-36 h-36 rounded" />
              <div className="flex flex-col justify-end">
                <h2 className="text-xl mb-4">{profile.name}</h2>
                <span className="text-start text-gray-400 text-sm">
                  {profile.followers} Followers
                </span>
                <span className="text-start text-gray-400 text-sm">
                  {profile.public_repos} Public repos
                </span>
              </div>
            </label>
          </form>
          {data.map((item) => {
            const li = document.createElement("li");
            li.classList.add("teste");
            li.innerHTML = `
             <label class="bg-slate-800 py-3 px-3 rounded shadow-md shadow-white/30 flex gap-2 mt-4">
             <strong class="text-2xl">Project:</strong>
             <a class="text-2xl text-green-600 hover:text-green-500" href=${item.html_url} target="_blank">${item.name}</a>
             </label>
             `;
            ul.appendChild(li);
          })}
        </ul>
      </section>
    </div>
  );
}
