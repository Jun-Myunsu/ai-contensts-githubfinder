async function getUserEvents(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/events/public`
  );
  const events = await response.json();

  return events.map(({ type, repo, created_at }) => ({
    type,
    repoName: repo.name,
    timestamp: new Date(created_at).toLocaleString("ko-KR"),
  }));
}

// getUserEvents("ruby").then(console.log);

async function generateHeatmap(username) {
  const events = await getUserEvents(username);

  console.log(events);

  const activityMap = {};
  events.forEach((event) => {
    const date = event.timestamp.split(" ")[0]; // 날짜만 추출
    activityMap[date] = (activityMap[date] || 0) + 1; // 날짜별 활동 횟수 카운트
  });

  console.log(activityMap); // ✅ 날짜별 활동량 데이터 출력 (그래프에 활용 가능)
}

generateHeatmap("ruby");
