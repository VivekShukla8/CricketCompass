import MatchCard from '../MatchCard';

export default function MatchCardExample() {
  return (
    <div className="grid gap-4 max-w-sm">
      <MatchCard
        id="1"
        team1="India"
        team2="Australia"
        team1Score="287/6"
        team2Score="145/3"
        team1Overs="50.0"
        team2Overs="28.4"
        status="live"
        matchInfo="3rd ODI • Melbourne"
        result="Australia need 143 runs in 128 balls"
      />
      <MatchCard
        id="2"
        team1="England"
        team2="Pakistan"
        team1Score="178"
        team2Score="182/4"
        team1Overs="20.0"
        team2Overs="18.2"
        status="recent"
        matchInfo="2nd T20I • Karachi"
        result="Pakistan won by 6 wickets"
      />
      <MatchCard
        id="3"
        team1="South Africa"
        team2="New Zealand"
        status="upcoming"
        matchInfo="1st Test"
        venue="Newlands, Cape Town"
        dateTime="Tomorrow, 10:00 AM"
      />
    </div>
  );
}
