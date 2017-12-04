function $_(id){
  return document.getElementById(id);
}
var kalendar={
  aroundYear:10,//前后
  dataTime:0,
  year:0,//当前年
  month:0,//当前月
  day:0,//当前日
  selectYear:0,//选择的年
  selectMonth:0,//选择的月
  selectDay:0,//选择的日
  labelH:0,//当月第一天的星期
  is_leap:function(year){return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));//判断当前年份是否闰年
  },
  build:function(inputid){
    var date=new Date();//当前Date资讯
    kalendar.year=date.getFullYear();//年份
    kalendar.month=date.getMonth();//月份 月份需要+1 起点是0
    kalendar.day=date.getDate();//今日日期
    var date1=new Date(kalendar.year,kalendar.month,1);//当月第一天Date资讯
    kalendar.firstDay=date1.getDay();//当月第一天星期几
    kalendar.m_days=new Array(31,28+kalendar.is_leap(kalendar.year),31,30,31,30,31,31,30,31,30,31);//各月份的总天数
    var yearHtml="";/*年标签*/
    var mouthHtml="";/*月标签*/
    var dayHtml="";/*日标签*/
    var boxF=document.createElement("div");
    boxF.className="kMask";
    boxF.id=inputid+"_kalendarBoxF";
    var boxSaveId=inputid+"_kSave";
    var boxCloseId=inputid+"_kClose";
    var yearId=inputid+"_kalendarYear";
    var mouthId=inputid+"_kalendarMouth";
    var dayId=inputid+"_kalendarDay";

    for(var i=0;i<=kalendar.aroundYear*2;i++){
      var tYear=kalendar.year-kalendar.aroundYear+i;
      yearHtml+="<li>"+tYear+"</li>"
      
    }
    for(var i=1;i<=12;i++){
      mouthHtml+="<li>"+i+"</li>"
    }
    
    var dayLen=kalendar.m_days[kalendar.month]
    for(var i=1;i<=dayLen;i++){
      dayHtml+="<li>"+i+"</li>"
    }
boxF.innerHTML='<div class="kalendarBox"><div class="kBtnGroud clear"><span class="left kClose" id="'+boxCloseId+'">取消</span><span class="right kSave" id="'+boxSaveId+'">确定</span></div><div class="kWord f_flex"><span class="z_flex">年</span><span class="z_flex">月</span><span class="z_flex">日</span></div><div class="f_flex kalendarMain box_sizing"><div class="selectBox f_flex"><div class="z_flex"><span></span></div><div class="z_flex"><span></span></div><div class="z_flex"><span></span></div></div><ul id="'+yearId+'" data-time="year" class="z_flex">'+yearHtml+'</ul><ul id="'+mouthId+'" data-time="mouth" class="z_flex">'+mouthHtml+'</ul><ul id="'+dayId+'" data-time="day" class="z_flex">'+dayHtml+'</ul></div></div>';
document.getElementsByTagName("body")[0].appendChild(boxF)
    $_(boxCloseId).onclick=function(){/*取消按钮*/
      $_(boxF.id).style.display="none";
    }
    $_(inputid).onclick=function(){/*选择日期按钮*/
      $_(boxF.id).style.display="block";
      kalendar.labelH=$_(yearId).getElementsByTagName("li")[0].offsetHeight;
      var deteTimes=$_(inputid).getAttribute("date-time");
      var yearSub=parseInt(deteTimes.substring(0,4))
      var mouthSub=parseInt(deteTimes.substring(5,7))
      var daySub=parseInt(deteTimes.substring(8,10))
      /*赋值*/
      var yTop,mTop,dTop;

      if(deteTimes==""){
        kalendar.selectYear=kalendar.year;
        kalendar.selectMonth=kalendar.month+1;
        kalendar.selectDay=kalendar.day;
        yTop="-"+kalendar.labelH*kalendar.aroundYear+"px";
        mTop="-"+kalendar.labelH*kalendar.month+"px";
        dTop="-"+kalendar.labelH*(kalendar.day-1)+"px";
      }else{
        var ayear=kalendar.aroundYear-(kalendar.year-yearSub)
        kalendar.selectYear=yearSub;
        kalendar.selectMonth=mouthSub;
        kalendar.selectDay=daySub;
        yTop="-"+kalendar.labelH*ayear+"px";
        mTop="-"+kalendar.labelH*(mouthSub-1)+"px";
        dTop="-"+kalendar.labelH*(daySub-1)+"px";
      }
      $_(yearId).style.top=yTop;
      $_(mouthId).style.top=mTop;
      $_(dayId).style.top=dTop;
      /*赋值end*/
    }
    $_(boxF.id).addEventListener("touchmove", function(evt){
            evt.stopPropagation();
      }, false);
    $_(boxSaveId).onclick=function(){
      var date=kalendar.selectYear+"/"+(kalendar.selectMonth<10 ? "0"+kalendar.selectMonth : kalendar.selectMonth)+"/"+(kalendar.selectDay<10 ? "0"+kalendar.selectDay : kalendar.selectDay);
      $_(inputid).innerText=date;
      $_(inputid).setAttribute("date-time",date);
      $_(boxF.id).style.display="none";
    }
    kalendar.touch($_(yearId),yearId)
    kalendar.touch($_(mouthId),mouthId)
    kalendar.touch($_(dayId),dayId)
  },
  touch:function(id,idName,callback){
        var ongoingTouches = new Array;
        
        function ongoingTouchIndexById(idToFind) {
          for (var i=0; i<ongoingTouches.length; i++) {
            var id = ongoingTouches[i].identifier;
            if (id == idToFind) {
              return i;
            }
          }
          return -1;    // not found
        }
        
        var downOptionTop,
          initialY,
          changeY,
          downOptionmaxY,
          downOptionLen,
          thisSubscript;
        
          id.addEventListener("touchstart", function(evt){
            evt.preventDefault();
            evt.stopPropagation();
            kalendar.dataTime=id.getAttribute("data-time");
            
            id.className="z_flex";
            
            var touches = evt.changedTouches;
            downOptionTop = Number(id.style.top.replace("px", ""));
            thisSubscript=downOptionTop/-kalendar.labelH;
            downOptionLen = id.getElementsByTagName("li").length;
            downOptionmaxY = downOptionLen*kalendar.labelH;
            
            for (var i = 0; i < touches.length; i++) {
              ongoingTouches.push(touches[i]);
              initialY = ongoingTouches[i].pageY;
            }
          }, false);
          
      id.addEventListener("touchmove", function(evt){
        evt.preventDefault();
        evt.stopPropagation();
          var touches = evt.changedTouches;
          for (var i = 0; i < touches.length; i++) {
            var delta=touches[i].pageY - initialY + downOptionTop;
            if(delta >= -downOptionmaxY && delta <= kalendar.labelH){
              var idx = ongoingTouchIndexById(touches[i].identifier);
              id.style.top = delta + "px";
              ongoingTouches.splice(idx, 1, touches[i]);
              changeY=delta;
            }
          }
      }, false);
      
      id.addEventListener("touchend", function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        id.className="z_flex animateC";

        var touches = evt.changedTouches;
        for(var i = 0; i < touches.length; i++){
          ongoingTouches.splice(i, 1);
        }
        if(changeY>=0){
          id.style.top=0;
          thisSubscript=0;
        }
        else if(changeY<=-downOptionmaxY+kalendar.labelH){
          var dy=-downOptionmaxY+kalendar.labelH;
          id.style.top=dy+"px";
          thisSubscript=downOptionLen-1;
        }
        else if(changeY<0){
          var residue_=changeY%kalendar.labelH;
          if(residue_<-kalendar.labelH/2){
            var residue_=changeY%kalendar.labelH;
            var currentTop=changeY-residue_-kalendar.labelH;
            id.style.top=currentTop+"px";
            thisSubscript=currentTop/-kalendar.labelH;
          }else if(residue_>=-kalendar.labelH/2){
            var residue_=changeY%kalendar.labelH;
            var currentTop=changeY-residue_;
            id.style.top=currentTop+"px";
            thisSubscript=currentTop/-kalendar.labelH;
          }
        }
        if(kalendar.dataTime=="year"){
          var name=idName.substring(0,idName.length-12);
          kalendar.selectYear=id.getElementsByTagName("li")[thisSubscript].innerText;
          if(kalendar.selectMonth==2){
            var m_days=new Array(31,28+kalendar.is_leap(kalendar.selectYear),31,30,31,30,31,31,30,31,30,31);//各月份的总天数
            var dayLen=m_days[1];
            if(dayLen==$_(name+"kalendarDay").getElementsByTagName("li").length){
              return;
            }else{
              var dayHtml="";
              for(var i=1;i<=dayLen;i++){
                dayHtml+="<li>"+i+"</li>";
              }
              var formerTop=Number($_(name+"kalendarDay").style.top.replace("px", ""));
              var nowTop=-((dayLen-1)*kalendar.labelH);

              if(nowTop>formerTop){
                $_(name+"kalendarDay").style.top=nowTop+"px"
              }
              $_(name+"kalendarDay").innerHTML=dayHtml;
            }
          }
        }else if(kalendar.dataTime=="mouth"){
          var name=idName.substring(0,idName.length-13);
          var m_days=new Array(31,28+kalendar.is_leap(kalendar.selectYear),31,30,31,30,31,31,30,31,30,31);//各月份的总天数
          kalendar.selectMonth=id.getElementsByTagName("li")[thisSubscript].innerText;
          
          var dayLen=m_days[kalendar.selectMonth-1];
          var dayHtml="";
          for(var i=1;i<=dayLen;i++){
            dayHtml+="<li>"+i+"</li>";
          }
          var formerTop=Number($_(name+"kalendarDay").style.top.replace("px", ""));
          var nowTop=-((dayLen-1)*kalendar.labelH);

          if(nowTop>formerTop){
            $_(name+"kalendarDay").style.top=nowTop+"px"
          }
          $_(name+"kalendarDay").innerHTML=dayHtml;
        }else if(kalendar.dataTime=="day"){
          kalendar.selectDay=id.getElementsByTagName("li")[thisSubscript].innerText;
        }
        if (callback && typeof(callback) === "function") {
          callback();
        }
      }, false);
    }
}

