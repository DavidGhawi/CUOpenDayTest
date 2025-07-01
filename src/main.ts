// main.ts
import './style.css'
import cuLogo from '/cu-logo.svg'

let openDayData: any[] = []

async function loadOpenDay() {
  const base = import.meta.env.BASE_URL || '/'
  const res = await fetch(`${base}api/OpenDay.json`)
  const data = await res.json()
  openDayData = data.topics || []
  return data
}

function createModal() {
  const modal = document.createElement('div')
  modal.id = 'eventModal'
  modal.className = `
    fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden
  `
  modal.innerHTML = `
    <div role="dialog" aria-modal="true" aria-labelledby="modalTitle"
         class="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-hidden p-6 relative">
      <button id="closeModalBtn"
              aria-label="Close modal"
              class="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-2xl font-bold focus:outline-none focus:ring-0 focus:border-none">
        &times;
      </button>
      <h2 id="modalTitle" class="text-2xl font-bold mb-4 text-cardiff-red">Events</h2>
      <ul id="modalContent" class="space-y-4 overflow-y-auto max-h-[65vh] pr-2"></ul>
    </div>
  `
  document.body.appendChild(modal)

  const closeModal = () => {
    modal.classList.add('hidden')
    modal.setAttribute('aria-hidden', 'true')
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
  })
  document.getElementById('closeModalBtn')?.addEventListener('click', closeModal)

  return modal
}

function formatTime(time: string | null) {
  if (!time) return ''
  return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function openModal(events: any[]) {
  const modal = document.getElementById('eventModal')!
  const content = modal.querySelector('#modalContent')!
  modal.classList.remove('hidden')
  modal.setAttribute('aria-hidden', 'false')

  if (!events.length) {
    content.innerHTML = `<li class="text-sm text-gray-500">No events available.</li>`
    return
  }

  content.innerHTML = events.map(event => `
    <li class="p-4 rounded border border-gray-200 bg-gray-50 text-left">
      <div class="font-semibold text-cardiff-red text-base mb-1">${event.title}</div>
      <div class="text-sm text-gray-700 mb-0.5">🕒 ${formatTime(event.start_time)}${event.end_time ? ` - ${formatTime(event.end_time)}` : ''}</div>
      ${event.room ? `<div class="text-sm text-gray-600">📍 ${event.room}</div>` : ''}
    </li>
  `).join('')
}

function renderCards(data: any[]) {
  const container = document.getElementById('cardGrid')!
  if (!data.length) {
    container.innerHTML = `<p class="text-gray-500 text-center col-span-full">No topics found.</p>`
    return
  }

  container.innerHTML = data.map((topic: any, idx: number) => `
    <div class="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between h-full">
      <div>
        <img src="${topic.cover_image || cuLogo}" alt="${topic.name}" class="h-32 w-full object-cover rounded mb-4" />
        <h2 class="text-2xl font-bold text-cardiff-red mb-2 leading-snug">${topic.name}</h2>
        <p class="text-gray-700 text-base leading-relaxed">${topic.description || ''}</p>
      </div>
      <div class="mt-6 flex justify-center">
        <button
          class="bg-cardiff-red text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cardiff-red text-sm"
          data-topic-index="${idx}"
        >
          View Events
        </button>
      </div>
    </div>
  `).join('')

  document.querySelectorAll('button[data-topic-index]').forEach(button => {
    const idx = parseInt((button as HTMLElement).dataset.topicIndex!)
    const topic = openDayData[idx]
    button.addEventListener('click', () => openModal(topic.programs || []))
  })
}

function renderOpenDay(data: any) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  if (!data.topics) {
    app.innerHTML = '<p class="text-red-600">No Open Day data found.</p>'
    return
  }

  createModal()

  app.innerHTML = `
    <div class="min-h-screen bg-cardiff-white font-sans px-2 py-6">
      <div class="flex flex-col gap-4 mb-8 px-2">
        <div class="flex items-center gap-4">
          <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
            <img src="${cuLogo}" alt="Cardiff University Logo" class="h-16 w-auto" />
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

      <div id="cardGrid" class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        <!-- Cards inserted here -->
      </div>
    </div>
  `

  renderCards(openDayData)

  document.getElementById('searchInput')?.addEventListener('input', (e: any) => {
    const query = e.target.value.toLowerCase()
    const filtered = openDayData.filter(t => t.name.toLowerCase().includes(query))
    renderCards(filtered)
  })
}

loadOpenDay().then(renderOpenDay)
