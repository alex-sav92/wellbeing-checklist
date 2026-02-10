const checklistItems = [
  "Drink water",
  "Go outside",
  "Move your body",
  "Eat something nourishing",
  "Take a quiet moment"
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
  progressEl.textContent = `${done} / ${checklistItems.length} done`
}

render()