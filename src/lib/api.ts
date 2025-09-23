import { Blockhead } from "@/types/poker";

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

export async function getAllPlayers(): Promise<Blockhead[]> {
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

export async function getPlayer(playerId: string): Promise<Blockhead> {
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
    
    const url = `${baseurl}/match${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
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

export async function getMatchMatrix(playerIds?: string[]): Promise<{
  ok: boolean;
  matrix: Record<string, Record<string, {
    netWins: number;
    games: number;
    eloGained: number;
    moneyWon: number;
    totalAmount: number;
  }>>;
}> {
  try {
    const searchParams = new URLSearchParams();
    if (playerIds && playerIds.length > 0) {
      searchParams.append('players', playerIds.join(','));
    }
    
    const url = `${baseurl}/match/matrix${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch match matrix');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching match matrix:', error);
    throw error;
  }
}

interface Checkin {
  userId: string;
  timestamp: string;
  duration: number;
  checkInDate: string;
  checkInTimestamp: string;
  checkoutTimestamp: string;
}

export async function getCheckins(): Promise<{
  ok: boolean;
  checkins: Checkin[];
}> {
  try {
    const response = await fetch(`${baseurl}/cinderblock`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch checkins');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching checkins:', error);
    throw error;
  }
}

export async function postCheckin(checkinData: {
  userId: string;
  timestamp: string;
}): Promise<{
  ok: boolean;
  checkin: Checkin;
}> {
  try {
    const response = await fetch(`${baseurl}/cinderblock/checkin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkinData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to post checkin');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error posting checkin:', error);
    throw error;
  }
}
interface Checkout {
  userId: string;
  timestamp: string;
  duration: number;
  checkOutDate: string;
  checkOutTimestamp: string;
}


export async function postCheckout(checkoutData: {
  userId: string;
  timestamp: string;
}): Promise<{
  ok: boolean;
  checkout: Checkout;
}> {
  try {
    const response = await fetch(`${baseurl}/cinderblock/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to post checkout');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error posting checkout:', error);
    throw error;
  }
}