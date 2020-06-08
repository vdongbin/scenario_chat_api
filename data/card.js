const card = [];
for (let i = 1; i <= 78; i++) {
  card.push({
    name: `${i}번 카드 이름`,
    image: `${i}번 IMAGE URL`
  });
}

module.exports = card;
