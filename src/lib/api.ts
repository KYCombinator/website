import { Player } from "@/types/poker";

interface Match {
  PK: string;
  SK: string;
  GSI1PK: string;
  GSI1SK: string;
  matchId: string;
  date: string;
  amount: number;
  blinds: number;
  player1Id: string;
  player2Id: string;
  winnerId: string;
  createdAt: string;
  type: string;
}

const baseurl = "https://api.kycombinator.com/poker";

export async function getAllPlayers(): Promise<Player[]> {
  try {
    const response = await fetch(`${baseurl}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch players');
    }
    
    const data = await response.json();
    return data.players;
  } catch (error) {
    console.error('Error fetching meeting types:', error);
    throw error;
  }
} 

export async function getPlayer(playerId: string): Promise<Player> {
  try {
    const response = await fetch(`${baseurl}/${playerId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch player');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching player:', error);
    throw error;
  }
}

export async function createMatch(matchData: {
  date: string;
  amount: number;
  blinds: number;
  player1Id: string;
  player2Id: string;
  winnerId: string;
}): Promise<{ ok: boolean; matchId: string; message: string }> {
  try {
    const response = await fetch(`${baseurl}/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(matchData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create match');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error creating match:', error);
    throw error;
  }
}

export async function getMatches(params?: {
  limit?: number;
  startDate?: string;
  endDate?: string;
}): Promise<{
  ok: boolean;
  matches: Match[];
  count: number;
  hasMore: boolean;
  lastEvaluatedKey?: Record<string, unknown>;
}> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.startDate) searchParams.append('startDate', params.startDate);
    if (params?.endDate) searchParams.append('endDate', params.endDate);
    
    const url = `${baseurl}/matches${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch matches');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
}
