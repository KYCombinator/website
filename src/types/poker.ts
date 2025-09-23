// === Types (mirror your API responses) ===
interface Blockhead { 
    name: string, 
    nickname: string
    elo: number
    wins?: number
    losses?: number
    pokerId: string
    isKingOfTheBlock?: boolean
    kingOfTheBlockSince?: string
    kingCount?: number
    avatarUrl?: string
    isCheckedIn?: boolean
    lastCheckInTimestamp?: string
}
interface Match { matchId: string; date: string; playerIdA: string; playerIdB: string; winnerId: string; amount: number; startingBB: number }
interface RatingRow { playerId: string; name: string; nickname: string; rating: number }
interface LeaderboardRow { playerId: string; name: string; wins: number; losses: number; diff: number; rating: number }
interface MatrixPair { a: string; b: string; winsA: number; winsB: number }
interface King { playerId: string; name: string; rating: number; since: string }

export type { Blockhead, Match, RatingRow, LeaderboardRow, MatrixPair, King };