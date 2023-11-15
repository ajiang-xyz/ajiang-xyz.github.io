document.getElementById("studentsTyping").addEventListener("input", (event) => {
  try {
    let studentsCount = parseInt(document.getElementById("studentsTyping").value)
    document.getElementById("studentsSliding").value = `${studentsCount}`
  } catch (error) {
    console.log(error)
  }
})

document.getElementById("studentsSliding").addEventListener("input", (event) => {
  try {
    let studentsCount = parseInt(document.getElementById("studentsSliding").value)
    document.getElementById("studentsTyping").value = `${studentsCount}`
  } catch (error) {
    console.log(error)
  }
})

document.getElementById("tablesTyping").addEventListener("input", (event) => {
  try {
    let studentsCount = parseInt(document.getElementById("tablesTyping").value)
    document.getElementById("tablesSliding").value = `${studentsCount}`
  } catch (error) {
    console.log(error)
  }
})

document.getElementById("tablesSliding").addEventListener("input", (event) => {
  try {
    let studentsCount = parseInt(document.getElementById("tablesSliding").value)
    document.getElementById("tablesTyping").value = `${studentsCount}`
  } catch (error) {
    console.log(error)
  }
})

document.getElementById("rotationsTyping").addEventListener("input", (event) => {
  try {
    let studentsCount = parseInt(document.getElementById("rotationsTyping").value)
    document.getElementById("rotationsSliding").value = `${studentsCount}`
  } catch (error) {
    console.log(error)
  }
})

document.getElementById("rotationsSliding").addEventListener("input", (event) => {
  try {
    let studentsCount = parseInt(document.getElementById("rotationsSliding").value)
    document.getElementById("rotationsTyping").value = `${studentsCount}`
  } catch (error) {
    console.log(error)
  }
})

function getGroups() {
  STUDENTS = document.getElementById("studentsTyping").value
  MAX_PER_TABLE = document.getElementById("tablesTyping").value
  ROTATIONS = document.getElementById("rotationsTyping").value
  TOTAL_SEATS = Math.ceil(STUDENTS / MAX_PER_TABLE) * MAX_PER_TABLE

  let { rotations, rotationCosts } = generateRotations()
  let conflicts = verifyGroups(rotations)
  
  const rotationsBox = document.getElementById("rotations")
  const conflictsBox = document.getElementById("conflicts")

  rotationsBox.innerHTML = ""
  conflictsBox.innerHTML = ""

  let rotationOl = document.createElement("ol")
  for (let i = 0; i < rotations.length; i++) {
    const rotation = rotations[i]
    let rotationElement = document.createElement("li")
    rotationElement.textContent = `Rotation ${i + 1}:`
    let ol = document.createElement("ol")
    for (const table of rotation) {
      let tableElement = document.createElement("li")
      tableElement.textContent = `${table.map(i => i + 1)}`
      ol.appendChild(tableElement)
    }
    rotationElement.appendChild(ol)
    rotationOl.appendChild(rotationElement)
  }
  rotationsBox.appendChild(rotationOl)

  let conflictUl = document.createElement("ul")
  for (const conflict of conflicts) {
    let conflictElement = document.createElement("li")
    conflictElement.textContent = `Conflict at ${conflict}`
    conflictUl.appendChild(conflictElement)
  }
  conflictsBox.appendChild(conflictUl)
  
}