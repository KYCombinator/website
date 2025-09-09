// === Types (mirror your API responses) ===
interface Player { 
    name: string, 
    nickname: string
    elo: number
    wins?: number
    losses?: number
    pokerId: string
}
interface MatchRow { matchId: string; date: string; playerIdA: string; playerIdB: string; winnerId: string; amount: number; startingBB: number }
interface RatingRow { playerId: string; name: string; rating: number }
interface LeaderboardRow { playerId: string; name: string; wins: number; losses: number; diff: number; rating: number }
interface MatrixPair { a: string; b: string; winsA: number; winsB: number }
interface King { playerId: string; name: string; rating: number; since: string }

export type { Player, MatchRow, RatingRow, LeaderboardRow, MatrixPair, King };