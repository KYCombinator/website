import NYTimesAIGeography from './NYTimesAIGeography'
import KYCombinatorDemographic from './KYCombinatorDemographic'
import NewYorker from './NewYorker'

export const reportComponents = {
  'nytimes-ai-geography': NYTimesAIGeography,
  'kycombinator-demographic': KYCombinatorDemographic,
  'newyorker': NewYorker,
} as const

export type ReportComponentKey = keyof typeof reportComponents 