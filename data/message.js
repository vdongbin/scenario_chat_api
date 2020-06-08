module.exports = [
  {
    type: 'text',
    contents:
      '내꺼인 듯 내꺼 아닌 그 분;과연 사귀게 될 건지;사귀면 언제 사귈건지;타로로 점 쳐볼까?',
    stage_id: 1
  },
  {
    type: 'image',
    contents: 'IMAGE URL',
    stage_id: 1
  },
  {
    type: 'intent',
    contents: '응 볼래;아니 나중에',
    stage_id: 1
  },
  {
    type: 'text',
    contents:
      '좋아. 우선...;하트코행성 여행자 너랑 썸인지 뭔지를 타고 있는 그 분을 내가 뭐라고 부를까?',
    stage_id: 2
  },
  {
    type: 'input',
    contents: '그 사람을;라고 불러줘',
    stage_id: 2
  },
  {
    type: 'text',
    contents:
      '$구나 알겠어;이제 마음을 차분하게 하고;$를 떠올리면서 카드를 한 장 뽑아보자',
    stage_id: 3
  },
  {
    type: 'image',
    contents: 'IMAGE URL',
    stage_id: 3
  },
  {
    type: 'choice',
    contents: 'TAROTCARD IMAGE URL',
    stage_id: 3
  },
  {
    type: 'text',
    contents: '하트코행성 여행자의 애정운 풀이는 여기까지야;어떤 것 같아?',
    stage_id: 4
  },
  {
    type: 'text',
    contents: '답변해줘서 고마워. 하트코행성 여행자 너의 연애가 잘되길 바랄게.',
    stage_id: 5
  }
];
