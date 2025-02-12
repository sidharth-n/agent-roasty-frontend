const NAMES = {
  roasters: ["Mike", "Sarah", "Alex", "Emma", "Chris"],
  targets: ["Safe", "Venice", "ElizaOS", "OpenAI", "Claude"],
} as const

type NameType = keyof typeof NAMES

export const getRandomName = (type: NameType): string => {
  const names = NAMES[type]
  return names[Math.floor(Math.random() * names.length)]
}
