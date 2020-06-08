const someActionHandler = (req, res, next) => {
  const { action } = req.body;
  if (action === 'welcome') {
    // 해당 액션과 관련된 로직을 수행한다.
    // welcome 관련 스크립트, 다음 액션에 관한 정보
  } else if (action === 'choice') {
    // choice 관련 스트립트, 다음 액션에 관한 정보
  } else if (action === 'name') {
    // name 관련 스크립트, 다음 액션에 관한 정보
  } else if (action === 'cards') {
    // cards 관련 스크립트, 다음 액션에 관한 정보
  } else if (action === 'interpretation') {
    // interpretation 관련 스크립트, 다음 액션에 관한 정보
  } else if (action === 'review') {
    // review 관련 스크립트, 다음 액션에 관한 정보
  } else {
    // 예외사항에 관한 처리
  }
};
