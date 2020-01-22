# Yapp 메일 전송

## 개요
    Yapp 16기에 지원한 인원이 자그마치 200명쯤 되서,
    서류 지원자들에게 어떤 방식으로 메일을 보낼까를 고민하다, 
    템플릿을 작성해놓고 일괄적으로 보내는 것이 효율적이라고 생각했습니다.

## 목표기능
1. 200명에게 메일을 보낼 수 있어야 한다.
2. 200명에게 보내면서 합격자를 뽑아 낼 수 있어야한다.
3. 합격자들에게는 날짜와 시간을 함께 첨부해서 전송해야한다.
4. 메일 헤더에 특정 이미지가 들어가야하고, 합격자들 한해서는 약도가 표기되어야한다.
5. 그리고 메일이 전송되는 중, 에러가 나서 전송되지않은 메일주소와 전송이 잘된 주소를 나누어서 볼 수 있어야한다.

## 기능의 구현방식
1. 200명에게 메일을 보낼 수 있어야 한다.  
    처음에는 메일건으로 구상을 했었지만, 현재 yapp 계정의 도메인 주소를 알 수가 없어서 사용을 하지 못했다.  
    결국에는 nodemailer로 gmail 로 이용해서 보내는 방식을 채택했었다.  
    support 계정으로 보내는 것을 준비했으나 gmail에서 smtp의 제한이 100통이어서 결국에 계정을 두개 만들어 보냈다.  

2. 200명에게 보내면서 합격자를 뽑아 낼 수 있어야한다.  
    합격자의 리스트와 시간을 csv로 정리가 되있어서 파일을 읽어오고 싶은 마음이 있었으나,   
    공부를 하면서 하기에는 시간이 너무 촉박했었다.  
    결국엔 모든 데이터를 txt파일로 때려박았고, 그 txt파일을 보던 중  
    전체 이메일이 고유값이라는 점을 이용해서 전체 이메일과 합격자 이메일 부분을 나누었다.  
    그리고 전체이메일을 돌리면서 합격자 이메일에 findIndex를 걸어서 -1 값이 나올경우 불합격 메일을 보냈다.  

3. 합격자들에게는 날짜와 시간을 함께 첨부해서 전송해야한다.  
    이 방식을 아직도 되게 아쉬웠고, 많이 하드코딩을 친 부분이다.  
    위와 연결이 되는데, 합격자들의 이메일과 이름 그리고 시간을 전부 동일한 순서로 txt파일로 작성을 했다.  
    그래서 위의 findIndex에서 -1이 나오지 않을 경우,   
    같은 줄에있는 이름과 시간 을 실어서 email 주소로 합격 메일을 보내는 방식을 채택했다.  

4. 메일 헤더에 특정 이미지가 들어가야하고, 합격자들 한해서는 약도가 표기되어야한다.  
    우선 불합격자 메일과 합격자 메일의 양식을 html방식으로 구성을 했었고,  
    그 html에 <img/>태그를 이용을 했었다.  
    
5. 그리고 메일이 전송되는 중, 에러가 나서 전송되지않은 메일주소와 전송이 잘된 주소를 나누어서 볼 수 있어야한다.  
    이 문제는 /index.js 에 배열을 두개 만들었다.  
    그리고 두 배열에 각각 성공 실패한 유저들의 리스트를 push 했었다.  
    그리고 /view/index.ejs에서 /view/check.ejs를 새창에서 띄우는 버튼을 만들었다.  
    /index.js에서는 check.ejs 를 렌더로 화면에 띄워줄때,  
    위에 선언한 두 배열을 같이 보내는 방식으로 사용했다.  