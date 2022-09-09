
const express =require('express');//아까 설치한 라이브러리를 참고해주세요
const app =express();
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));

const MongoClient =require('mongodb').MongoClient;
app.set('view engine','ejs');
app.use('/public', express.static('public'))
var db;
MongoClient.connect('mongodb+srv://ain0103:HGu5b3r1aIz0hQqs@cluster0.8s3c6l1.mongodb.net/?retryWrites=true&w=majority',function(에러,client){

    db=client.db('todoapp');
    // db.collection('post').insertOne({이름:'john',나이 : 20,_id :100},function(에러,결과){
    //     console.log('저장완료');
    // });

    if(에러){return console.log(에러)}
    app.listen(8383,function(){
        console.log('listening on 8383')
        
    });//서버를 연다

})






// app.get('/beauty',function(요청,응답){
//     응답.send('뷰티용품 쇼핑할 수 있는 페이지입니다.');
// });
app.get('/',(요청,응답)=>{//함수 안에 함수 = 콜백함수 -> 순사적으로 실행하고 싶을 때 쓴다.
    응답.render('index.ejs');
});

app.get('/write',function(요청,응답){
    응답.render('write.ejs')
    
});

app.post('/add',function(요청,응답){
    응답.send('전송완료')
    db.collection('counter').findOne({name : '게시물갯수'},function(에러,결과){
        var count =결과.totalPost;
        db.collection('post').insertOne({_id : count+1,날짜:요청.body.date,제목 : 요청.body.title},function(에러,결과){
            console.log('저장완료');
            db.collection('counter').updateOne({name:'게시물갯수'},{$inc:{totalPost:1}},function(에러,결과){
                if(에러)return console.log(에러);
            })
        });

        
   
    });
   
   
});

//  /list로 GET요청으로 접속하면 
//실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML을 보여줌

app.get('/list',function(요청,응답){
    //db에 저장된 post 라는 컬렉션 안의 모든 데이터 꺼내기
    db.collection('post').find().toArray(function(에러,결과){
       // console.log(결과);
        응답.render('list.ejs',{posts: 결과});

    });
});

app.delete('/delete',function(요청, 응답){
    
    console.log(요청.body)
    요청.body._id = parseInt(요청.body._id);
    //요청.body에 담겨온 게시물번호를 가진 글을 db에서 찾아서 삭제해주세요
    db.collection('post').deleteOne(요청.body,function(에러,결과){
        console.log('삭제완료');
        응답.status(200).send({message : '성공했습니다.'});
    })
    
});

app.get('/detail/:id', function(요청, 응답){
    db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
      응답.render('detail.ejs', {data : 결과} );
    })
  });

  app.get('/edit/:id',function(요청,응답){
    
    db.collection('post').findOne({ _id : parseInt(요청.params.id) }, function(에러, 결과){
        응답.render('edit.ejs', { post : 결과 })
      })
});
