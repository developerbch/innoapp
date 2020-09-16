export const getPhoto = (req, res) => {
  const filepath = "C:\\react-native-app\\innoapp\\uploads\\"; //사진 저장되는 디렉토리
  res.sendFile(filepath + req.params.id); //req.params.id : 게시글 등록 시 받아오는 파일이름
};
