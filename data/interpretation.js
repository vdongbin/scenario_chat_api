const interpretation = [];
for (let i = 1; i <= 78; i++) {
  interpretation.push({
    contents: `${i}번 카드 해설`,
    card_id: i,
    skill_id: 1
  });
}
module.exports = interpretation;
