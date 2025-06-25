(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const o="/CUOpenDayTest/vite.svg",l="/CUOpenDayTest/tailwindcss-mark.svg",c="/CUOpenDayTest/typescript.svg";async function d(){return await(await fetch("/api/OpenDay.json")).json()}function f(a){const i=document.querySelector("#app");if(!a.topics){i.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}i.innerHTML=`
    <div class="demo-banner w-full bg-yellow-300 text-black flex flex-col sm:flex-row items-center justify-between px-4 py-2 mb-6 gap-2 border-b-2 border-yellow-500">
      <div class="font-bold text-lg flex-1 text-center sm:text-left">This is a demo app</div>
      <div class="flex flex-row items-center gap-3 justify-center">
        <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">
          <img src="${o}" alt="Vite Logo" class="h-8 w-auto" />
        </a>
        <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
          <img src="${l}" alt="Tailwind CSS Logo" class="h-8 w-auto" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
          <img src="${c}" alt="TypeScript Logo" class="h-8 w-auto" />
        </a>
      </div>
    </div>
    <div class="min-h-screen bg-cardiff-white font-sans px-2 py-6">
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
          <img src="/cu-logo.svg" alt="Cardiff University Logo" class="h-16 w-auto" />
        </a>
      </div>
      <h1 class="text-3xl sm:text-5xl font-bold text-cardiff-red mb-8 text-center">Cardiff University Open Day</h1>
      <div class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        ${a.topics.map(r=>r&&r.name?`
          <div class="bg-cardiff-grey rounded-lg shadow p-6 flex flex-col">
            <img src="${r.cover_image||"/cu-logo.svg"}" alt="${r.name}" class="h-32 w-full object-cover rounded mb-4" />
            <h2 class="text-xl font-bold text-cardiff-red mb-2">${r.name}</h2>
            <p class="text-cardiff-dark mb-2">${r.description||""}</p>
            ${r.programs&&r.programs.length?`
              <div class="mt-2">
                <h3 class="font-semibold text-cardiff-dark mb-1">Events:</h3>
                <ul class="list-disc list-inside text-sm">
                  ${r.programs.map(t=>t&&t.title?`<li><span class="font-semibold">${t.title}</span>${t.start_time?` <span class='text-xs text-cardiff-dark'>(${new Date(t.start_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}${t.end_time?" - "+new Date(t.end_time).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""})</span>`:""}${t.room?`, <span class='text-xs'>${t.room}</span>`:""}</li>`:"").join("")}
                </ul>
              </div>
            `:""}
          </div>
        `:"").join("")}
      </div>
    </div>
  `}d().then(f);
