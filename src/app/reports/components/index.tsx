import NYTimesAIGeography from './NYTimesAIGeography'
import KYCombinatorDemographic from './KYCombinatorDemographic'

export const reportComponents = {
  'nytimes-ai-geography': NYTimesAIGeography,
  'kycombinator-demographic': KYCombinatorDemographic,
} as const

export type ReportComponentKey = keyof typeof reportComponents 