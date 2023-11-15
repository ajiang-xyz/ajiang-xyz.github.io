const GENERATIONS = 45
const RANDOM_MUTATIONS = 5
const MAX_DESCENDANTS_PER_GENERATION = 75

function range(min, max) {
  if (!max) {max = min; min = 0}
  return new Array(max - min).fill().map((_, i) => i + min)
}

function shuffle(array) {
  // Fischer-Yates
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function chunkIntoSize(array, size) {
  const chunked = []
  for (let i = 0; i < Math.ceil(array.length / size); i++) {
    chunked.push(array.slice(i * size, (i+1) * size))
  }
  return chunked
}

function forEachPair(array, callback) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      callback(array[i], array[j])
    }
  }
}

function calculateCost(rotation, weights) {
  let costs = []
  for (const group of rotation) {
    let cost = 0

    // Squared so worse individuals are punished more
    forEachPair(group, (a, b) => cost += Math.pow(weights[a][b], 2))
    costs.push(cost)
  }

  return {
    groups: rotation,
    costs: costs,
    totalCost: costs.reduce((a, b) => a + b)
  }
}

function generateIndividual() {
  const students = range(0, TOTAL_SEATS)
  // Fill remaining spots with EMPTY
  return chunkIntoSize(shuffle(students), MAX_PER_TABLE)
}

function generateMutations(individuals, weights) {
  // Individuals are trivial mutations of themselves
  const mutations = individuals.slice()
  for (const individual of individuals) {
    // Determine the least fit group within the individual. In this case, b.cost - a.cost because we want the worst individuals first
    const sorted = individual.groups.map((group, i) => ({group: group, cost: individual.costs[i]})).sort((a, b) => b.cost - a.cost).map(a => a.group)

    // Swap someone in the group w/ highest cost to another group
    for (let i = 0; i < MAX_PER_TABLE; i++) {
      for (let j = MAX_PER_TABLE; j < TOTAL_SEATS; j++) {
        const swapped = [].concat(...sorted)
        let tmp = swapped[i]
        swapped[i] = swapped[j]
        swapped[j] = tmp
        mutations.push(calculateCost(chunkIntoSize(swapped, MAX_PER_TABLE), weights))
      }
    }

    // Generate random individuals to break out of local minima
    for (let i = 0; i < RANDOM_MUTATIONS; i++) mutations.push(calculateCost(generateIndividual(), weights))
  }

  return mutations
}

function updateWeights(rotation, weights) {
  for (const group of rotation) {
    forEachPair(group, (a, b) => {weights[a][b] = weights[b][a] = (weights[a][b] + 1)})
  }
}

function getUnion(a, b) {
  // idk JS doesnt have sets
  return a.filter(_ => b.includes(_))
}

function arrayEquals(a, b) {
  return a.every((v, i) => v === b[i])
}

function verifyGroups(rotations) {
  // is brokey!!!
  const history = range(TOTAL_SEATS).map(() => new Array())
  const conflicts = []

  for (let i = 0; i < rotations.length; i++ ) {
    const groups = rotations[i]
    for (let j = 0; j < groups.length; j++) {
      const group = groups[j]
      for (let k = 0; k < group.length; k++) {
        const member = group[k]
        const seen = history[member]
        let matches = getUnion(group, seen)
        // console.log(matches, group, seen)
        if (matches.length > 0) {
          conflicts.push(`Rotation ${i + 1}, Group ${j + 1}: ${member + 1} and ${matches[0] + 1}`)
        }
        // console.log(unseen, differences)
        const copy = group.slice()
        copy.splice(copy.indexOf(member), 1)
        history[member].push(...copy)
      }
    }
  }

  // risky but surely u wont get that unlucky right?? yes okay i did get that unlucky
  // return conflicts.filter((_, i) => i % 2 == 0)
  return conflicts
}

function generateRotations() {
  // Each student gets their own array of weights relative to other students
  const weights = range(TOTAL_SEATS).map(() => range(TOTAL_SEATS).fill(0))

  const rotations = []
  const rotationCosts = []

  for (let rotation = 0; rotation < ROTATIONS; rotation++) {
    let bestIndividuals = range(5).map(() => calculateCost(generateIndividual(), weights))
    for (let generation = 0; generation < GENERATIONS; generation++) {
      // Holy shit we found it
      if (bestIndividuals[0].totalCost == 0) break

      // In this case, a.cost - b.cost because we want the best individuals first
      const candidates = generateMutations(bestIndividuals, weights).sort((a, b) => a.totalCost - b.totalCost)
      const lowestCost = candidates[0].totalCost
      bestIndividuals = shuffle(candidates.filter((candidate) => candidate.totalCost == lowestCost)).slice(0, MAX_DESCENDANTS_PER_GENERATION)
    }

    rotations.push(bestIndividuals[0].groups)
    rotationCosts.push(bestIndividuals[0].totalCost)
    updateWeights(bestIndividuals[0].groups, weights)
  }

  return { rotations: rotations, rotationCosts: rotationCosts}
}

let STUDENTS = 32
let MAX_PER_TABLE = 5
let ROTATIONS = 4

let TOTAL_SEATS = Math.ceil(STUDENTS / MAX_PER_TABLE) * MAX_PER_TABLE


// const { rotations, rotationCosts } = generateRotations()
// const conflicts = verifyGroups(rotations)

// console.log(rotations)
// console.log(conflicts)