const checklistItems = [
  "Drink 2L water",
  "Spirituality content",
  "Move your body",
  "Eat something nourishing",
  "Read ~50 pages of a book",
  "Practice reflection, gratitude",
  "Do something nice for your body",
  "Improve your space",
  "One thing to bring joy",
  "Interact with someone",
  "10 mins for professional development"
]

const checklistEl = document.getElementById("checklist")
const progressEl = document.getElementById("progress")
const dateEl = document.getElementById("date")

const today = new Date().toISOString().split("T")[0]
const storageKey = `wellbeing-${today}`

dateEl.textContent = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric"
})

let state = JSON.parse(localStorage.getItem(storageKey)) 
  ?? Array(checklistItems.length).fill(false)

function render() {
  checklistEl.innerHTML = ""

  checklistItems.forEach((item, index) => {
    const li = document.createElement("li")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = state[index]
    checkbox.addEventListener("change", () => {
      state[index] = checkbox.checked
      localStorage.setItem(storageKey, JSON.stringify(state))
      updateProgress()
    })

    const label = document.createElement("label")
    label.textContent = item

    li.appendChild(checkbox)
    li.appendChild(label)
    checklistEl.appendChild(li)
  })

  updateProgress()
}

function updateProgress() {
  const done = state.filter(Boolean).length
  const total = checklistItems.length

  progressEl.textContent = `${done} / ${total} done`

  if (done === total && !hasCelebrated) {
    celebrate()
    hasCelebrated = true
  }

  if (done < total) {
    hasCelebrated = false
  }
}

function celebrate() {
  const confetti = document.createElement("div")
  confetti.className = "confetti"

  const colors = ["#a8d5ba", "#f6c1cc", "#cdb4db", "#ffd6a5"]

  for (let i = 0; i < 20; i++) {
    const piece = document.createElement("span")
    piece.style.setProperty("--x", `${Math.random() * 200 - 100}px`)
    piece.style.setProperty("--c", colors[i % colors.length])
    piece.style.left = `${Math.random() * 100}px`
    piece.style.animationDelay = `${Math.random() * 0.3}s`
    confetti.appendChild(piece)
  }

  document.body.appendChild(confetti)

  setTimeout(() => confetti.remove(), 1600)
}

render()