
function formDate(value){
    let data=new Date(value);
    let year=data.getFullYear();
    let mounth=data.getMonth()+1;
    let day=data.getDate();
    let hour=data.getHours();
    let minute=data.getMinutes();
    let sec=data.getSeconds();
    if(mounth<10){
        mounth='0'+mounth;
    }
    if(day<10){
        day='0'+day;
    }
    if(hour<10){
        hour='0'+hour;
    }
    if(minute<10){
        minute='0'+minute;
    }
    if(sec<10){
        sec='0'+sec;
    }
    let formedTime=year+'-'+mounth+'-'+day+' '+hour+':'+minute+':'+sec;
    return formedTime;
}

export {formDate}