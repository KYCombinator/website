import NYTimesAIGeography from './NYTimesAIGeography'

export const reportComponents = {
  'nytimes-ai-geography': NYTimesAIGeography,
} as const

export type ReportComponentKey = keyof typeof reportComponents 