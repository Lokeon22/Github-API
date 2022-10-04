import { useState, useEffect } from "react";

export function Details() {
  const [user, setUser] = useState("");
  const [profile, setProfile] = useState([]);
  const [data, setData] = useState([]);

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
    }
  }

  const content = () => {
    const test = document.getElementById("test");
    test.classList.toggle("hidden");

    fetch(`https://api.github.com/users/${user}/repos`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

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
              <img
                src={avatar}
                className="w-36 h-36 cursor-pointer rounded"
                onClick={content}
              />
              <div className="flex flex-col justify-end">
                <h2 className="text-xl mb-4">{profile.name}</h2>
                <span className="text-start text-gray-400 text-sm">
                  {profile.followers} Followers
                </span>
                <span className="text-start text-gray-400 text-sm">
                  {profile.public_repos} Public repos
                </span>
                <span className="text-start text-gray-400 text-xs mt-4">
                  Clique na foto para mostrar seus projetos
                </span>
              </div>
            </label>
          </form>
          <form className="hidden" id="test">
            {data.map((item, key) => {
              return (
                <li key={key}>
                  <label className="bg-slate-800 py-3 px-3 rounded shadow-md shadow-white/30 flex gap-2 mt-4">
                    <strong className="text-2xl">Project:</strong>
                    <a
                      className="text-2xl text-green-600 hover:text-green-500"
                      href={item.html_url}
                      target="_blank"
                    >
                      {item.name}
                    </a>
                  </label>
                </li>
              );
            })}
          </form>
        </ul>
      </section>
    </div>
  );
}
