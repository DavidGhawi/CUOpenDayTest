(function(){const d=document.createElement("link").relList;if(d&&d.supports&&d.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const y="/CUOpenDayTest/cu-logo.svg";let p=[],m=[],g=null;async function h(){const a=await(await fetch("/CUOpenDayTest/api/OpenDay.json")).json();return p=a.topics||[],a}function w(){const n=document.createElement("div");n.id="eventModal",n.className=`
    fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden
  `,n.innerHTML=`
    <div role="dialog" aria-modal="true" aria-labelledby="modalTitle"
         class="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
      <button id="closeModalBtn"
              aria-label="Close modal"
              class="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold focus:outline-none focus:ring-0 focus:border-none">
        &times;
      </button>
      <h2 id="modalTitle" class="text-2xl font-bold mb-4 text-cardiff-red">My Calendar</h2>

      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="subjectSelect">Choose Topic:</label>
          <select id="subjectSelect" class="w-full border border-gray-300 rounded px-3 py-2"></select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="eventSelect">Available Events:</label>
          <select id="eventSelect" class="w-full border border-gray-300 rounded px-3 py-2"></select>
        </div>

        <button id="addEventBtn" class="bg-cardiff-red text-white px-4 py-2 rounded hover:bg-red-700">Add to My Calendar</button>

        <div id="overlapWarning" class="hidden border border-yellow-400 bg-yellow-50 text-yellow-800 p-4 rounded">
          <p id="overlapText" class="mb-3 text-sm"></p>
          <div class="flex justify-end gap-2">
            <button id="cancelAdd" class="bg-gray-300 px-3 py-1 rounded">Cancel</button>
            <button id="confirmAdd" class="bg-green-600 text-white px-3 py-1 rounded">Yes, Add Anyway</button>
          </div>
        </div>

        <div id="calendarList" class="space-y-4 mt-4"></div>
      </div>
    </div>
  `,document.body.appendChild(n);const d=document.getElementById("subjectSelect"),a=document.getElementById("eventSelect"),s=document.getElementById("calendarList"),e=document.getElementById("overlapWarning"),t=document.getElementById("overlapText");function i(){d.innerHTML="",p.forEach((r,c)=>{const o=document.createElement("option");o.value=c.toString(),o.textContent=r.name,d.appendChild(o)}),l()}function l(){a.innerHTML="";const r=p[parseInt(d.value)];r&&r.programs.forEach((c,o)=>{const f=document.createElement("option");f.value=o.toString(),f.textContent=`${c.title} (${v(c.start_time)} - ${v(c.end_time)})`,a.appendChild(f)})}d.addEventListener("change",l),document.getElementById("addEventBtn").addEventListener("click",()=>{const r=parseInt(d.value),c=parseInt(a.value),o=p[r].programs[c],f=m.find(x=>E(x,o));if(f){g=o,t.innerHTML=`<strong>Warning:</strong> "${o.title}" overlaps with "${f.title}".`,e.classList.remove("hidden");return}m.push(o),u(),l()}),document.getElementById("cancelAdd").addEventListener("click",()=>{g=null,e.classList.add("hidden")}),document.getElementById("confirmAdd").addEventListener("click",()=>{g&&(m.push(g),u(),l(),e.classList.add("hidden"),g=null)});function u(){if(s.innerHTML="",!m.length){s.innerHTML='<p class="text-sm text-gray-500">No events added yet.</p>';return}m.forEach((r,c)=>{const o=document.createElement("div");o.className="p-3 border-l-4 border-cardiff-red bg-gray-50 rounded shadow-sm",o.innerHTML=`
        <div class="flex justify-between items-start">
          <span><strong>${r.title}</strong><br>${v(r.start_time)} - ${v(r.end_time)}${r.room?", "+r.room:""}</span>
          <button class="text-sm text-red-600 hover:underline" onclick="removeEvent(${c})">Remove</button>
        </div>
      `,s.appendChild(o)})}window.removeEvent=function(r){m.splice(r,1),u(),l()},i();const b=()=>{n.classList.add("hidden"),n.setAttribute("aria-hidden","true")};return n.addEventListener("click",r=>{r.target===n&&b()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&b()}),document.getElementById("closeModalBtn")?.addEventListener("click",b),n}function E(n,d){const a=new Date(n.start_time).getTime(),s=new Date(n.end_time).getTime(),e=new Date(d.start_time).getTime(),t=new Date(d.end_time).getTime();return a<t&&e<s}function v(n){return n?new Date(n).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):""}function L(n){const d=document.querySelector("#app");if(!n.topics){d.innerHTML='<p class="text-red-600">No Open Day data found.</p>';return}w(),d.innerHTML=`
    <div class="min-h-screen bg-cardiff-white font-sans px-2 py-6">
      <div class="flex flex-col gap-4 mb-8 px-2">
        <div class="flex items-center gap-4">
          <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
            <img src="${y}" alt="Cardiff University Logo" class="h-16 w-auto" />
          </a>
          <h1 class="text-3xl sm:text-4xl font-bold text-cardiff-red">Cardiff University Open Day</h1>
        </div>

        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div class="relative w-full sm:w-96">
            <input
              id="searchInput"
              type="text"
              placeholder="Search topics..."
              aria-label="Search topics"
              class="border border-gray-300 rounded-lg pl-12 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cardiff-red"
            />
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 fill-current"
            >
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/>
            </svg>
          </div>

          <button
            id="calendarButton"
            class="bg-cardiff-red text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            My Calendar
          </button>
        </div>
      </div>

      <div id="cardGrid" class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr"></div>
    </div>
  `;const a=document.getElementById("cardGrid");function s(e){if(!e.length){a.innerHTML='<p class="text-gray-500 text-center col-span-full">No topics found.</p>';return}a.innerHTML=e.map((t,i)=>`
      <div class="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between h-full">
        <div>
          <img src="${t.cover_image||y}" alt="${t.name}" class="h-32 w-full object-cover rounded mb-4" />
          <h2 class="text-2xl font-bold text-cardiff-red mb-2 leading-snug">${t.name}</h2>
          <p class="text-gray-700 text-base leading-relaxed">${t.description||""}</p>
        </div>
        <div class="mt-6 flex justify-center">
          <button
            class="bg-cardiff-red text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cardiff-red text-sm"
            data-topic-index="${i}"
          >
            Open Calendar
          </button>
        </div>
      </div>
    `).join(""),document.querySelectorAll("button[data-topic-index]").forEach(t=>{const i=parseInt(t.dataset.topicIndex);t.addEventListener("click",()=>{const l=document.getElementById("eventModal"),u=document.getElementById("subjectSelect");u.value=i.toString(),u.dispatchEvent(new Event("change")),l.classList.remove("hidden"),l.setAttribute("aria-hidden","false")})})}s(p),document.getElementById("calendarButton")?.addEventListener("click",()=>{const e=document.getElementById("eventModal");e.classList.remove("hidden"),e.setAttribute("aria-hidden","false")}),document.getElementById("searchInput")?.addEventListener("input",e=>{const t=e.target.value.toLowerCase(),i=p.filter(l=>l.name.toLowerCase().includes(t));s(i)})}h().then(L);
