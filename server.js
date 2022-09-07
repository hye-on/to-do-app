
const express =require('express');//아까 설치한 라이브러리를 참고해주세요
const app =express();

app.listen(8383,function(){
    console.log('listening on 8383')
    
});//서버를 연다


//누군가가 /pet 으로 방문을 하면 pet 관련된 안내문을 띄워주자

app.get('/beauty',function(요청,응답){
    응답.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});
app.get('/',function(요청,응답){
    응답.sendFile(__dirname+'/index.html')
});//ddd


