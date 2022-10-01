import { useState, useEffect } from "react";

export function Details() {
  const [data, setData] = useState([]);
  const ul = document.getElementById("ul");

  function Github() {
    fetch("https://api.github.com/users/lokeon22/repos").then(async (res) => {
      const response = await res.json();
      setData(response);
    });
  }

  return (
    <div>
      <section className="text-white w-full flex flex-col items-center justify-center mt-20">
        <h2 className="text-5xl mb-6">Github Search</h2>
        <label className="flex items-center gap-2 mb-7">
          <input
            type="text"
            placeholder="Search your profile"
            className="px-2 py-1 text-black outline"
          />
          <button
            className="text-black text-xl bg-white py-1 px-6 rounded-md flex items-center justify-center hover:bg-violet-300"
            onClick={Github}
          >
            +
          </button>
        </label>
        <ul className="flex flex-col gap-3 text-xl" id="ul">
          {data.map((item) => {
            const li = document.createElement("li");
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
