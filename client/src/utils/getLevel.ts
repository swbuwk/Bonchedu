
// 1 - 3 lvl +100xp
// 4 - 5 lvl +250xp
// 6 - 10 lvl +500xp
// 10 - ... lvl +1000xp

export const LEVEL_DISTRIBUTION = [
  {level: 1, exp: 100},
  {level: 4, exp: 250},
  {level: 6, exp: 500},
  {level: 10, exp: 1000},
]

export const getExpToNextLevel = (level: number) => {
  let minExp = 100
  LEVEL_DISTRIBUTION.forEach(distr => {
    if (distr.level <= level) minExp = distr.exp
  })
  return minExp
} 

export const getLevel = (experience?: number) => {
  let level = 1;
  let expLeft = 0
  let expToNextLevel = 100

  while (experience && experience > 0) {
    expToNextLevel = getExpToNextLevel(level)
    if (experience >= expToNextLevel) {
      level++;
      experience -= expToNextLevel
    } else {
      expLeft = experience
      experience = 0
    }
  }

  return {
    level,
    expLeft,
    expToNextLevel
  }
}