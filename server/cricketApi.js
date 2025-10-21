const CRICKET_API_KEY = process.env.CRICKET_API_KEY;
const BASE_URL = "https://api.cricapi.com/v1";

async function fetchFromCricketApi(endpoint) {
  if (!CRICKET_API_KEY) {
    throw new Error("CRICKET_API_KEY is not configured");
  }

  const url = `${BASE_URL}/${endpoint}${endpoint.includes('?') ? '&' : '?'}apikey=${CRICKET_API_KEY}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Cricket API error: ${response.statusText}`);
  }

  const result = await response.json();
  
  if (result.status !== "success") {
    throw new Error("Cricket API returned unsuccessful status");
  }

  return result.data;
}

export async function getCurrentMatches() {
  try {
    const data = await fetchFromCricketApi("currentMatches");
    return data || [];
  } catch (error) {
    console.error("Error fetching current matches:", error);
    return [];
  }
}

export async function getMatchInfo(matchId) {
  try {
    const data = await fetchFromCricketApi(`match_info?id=${matchId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching match info for ${matchId}:`, error);
    return null;
  }
}

export async function getMatchScore(matchId) {
  try {
    const data = await fetchFromCricketApi(`match_scorecard?id=${matchId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching match score for ${matchId}:`, error);
    return null;
  }
}

export function transformMatchData(apiMatch) {
  const isLive = apiMatch.matchStarted && !apiMatch.matchEnded;
  const isRecent = apiMatch.matchEnded;
  const isUpcoming = !apiMatch.matchStarted;

  let status = 'upcoming';
  if (isLive) status = 'live';
  else if (isRecent) status = 'recent';

  const team1 = apiMatch.teams?.[0] || apiMatch.teamInfo?.[0]?.name || 'Team 1';
  const team2 = apiMatch.teams?.[1] || apiMatch.teamInfo?.[1]?.name || 'Team 2';

  const team1Score = apiMatch.score?.find((s) => s.inning.includes('1'));
  const team2Score = apiMatch.score?.find((s) => s.inning.includes('2'));

  const result: any = {
    id: apiMatch.id,
    team1,
    team2,
    status,
    matchInfo: `${apiMatch.matchType} • ${apiMatch.venue}`,
  };

  if (team1Score) {
    result.team1Score = `${team1Score.r}/${team1Score.w}`;
    result.team1Overs = team1Score.o.toString();
  }

  if (team2Score) {
    result.team2Score = `${team2Score.r}/${team2Score.w}`;
    result.team2Overs = team2Score.o.toString();
  }

  if (isUpcoming) {
    result.venue = apiMatch.venue;
    result.dateTime = new Date(apiMatch.dateTimeGMT).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  if (apiMatch.status && apiMatch.status !== 'Match not started') {
    result.result = apiMatch.status;
  }

  return result;
}
