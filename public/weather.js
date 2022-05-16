$('#place').keyup(function (event) {
    if (event.keyCode === 13) {
        $('#search').click();
    }
})
const showdata =()=>{
    $('#data-displayer').show();
}
const hidedata=()=>{
    $('#data-displayer').hide();
}
hidedata();
//utility function
function convert(temp){
    return parseFloat(temp-273.15).toFixed(2);
}

function geticon(id)
{
    return "/images/"+id+".png";
}

function Get_date_time(dt,timezone_offset){
    const D=new Date(dt*1000+timezone_offset);
    return D;
}

function gethour(dt,timezone_offset){
    const D=new Date(dt*1000+timezone_offset);
    let hour=D.getHours();
    if(hour>12)
    {
        hour=hour-12+" pm";
        return hour;
    }
    else{
        return hour+" am";
    }
}

function addcurrentdata(data)
{
    $('#date').text(Get_date_time(data.current.dt,data.timezone_offset));
    $('#wind span').text(`${data.current.clouds}`);
    $('#humidity span').text(`${data.current.humidity}`);
    $('#visibility span').text(`${data.current.visibility}`);
    $('#UV-index span').text(`${data.current.uvi}`);
    $('#latitude span').text(`${data.lat}`);
    $('#longitude span').text(`${data.lon}`);
    $('#feelslike span').text(convert(data.current.feels_like));
    $('#dewpoint span').text(`${data.current.dew_point}`);
    console.log(geticon(data.current.weather[0].icon));
    document.getElementById('icon').innerHTML=`<img src="${geticon(data.current.weather[0].icon)}" style="width:64px;height:64px">`;
    $('#sunrise span').text(gethour(data.current.sunrise,data.timezone_offset));
    $('#sunset span').text(gethour(data.current.sunset,data.timezone_offset));
    $('#pressure span').text(`${data.current.pressure}`);
}

function addHourlyHtml(data){
    const Data=data.hourly;
    const timeoffset=data.timezone_offset;
     const Html=
    `<div class="template">
        <p class="hr">
        </p>
        <div class="bore">
            <span class="icn">
                
            </span>
            <p class="content">
            </p>
        </div>
        <p class="status"></p>
    </div>`
    for(let i=1;i<=7;i++){
        $('#hourlydata').append(Html);
        document.getElementsByClassName('hr')[i-1].innerHTML=`${gethour(Data[i].dt,timeoffset)}`;
        document.getElementsByClassName('icn')[i-1].innerHTML=`<img src="${geticon(Data[i].weather[0].icon)}" style="width:45px;height:45px">`;
        document.getElementsByClassName('content')[i-1].innerHTML=`${Data[i].weather[0].description}`;
        // $('.hr').text(`${gethour(Data[i].dt,timeoffset)}`);
        // $('.icn').text(`${geticon(Data[i].weather[0].icon)}`);
        // $('.content').text(`${Data[i].weather[0].description}`);
    }
}

function addforcastHtml(data){
    const Data=data.daily;
    const timeoffset=data.timezone_offset;
    const Html=
   `<div class="forecast_template">
        <p class="forecast_date"></p>
        <div class="forcast_description">
            <span class="forecast_icon">
            </span>
            <p class="forecast_status">
            </p>
        </div>
        <p class="futurestatus"></p>
    </div>`
    for(let i=0;i<=7;i++){
        $('#forcastdata').append(Html);
        document.getElementsByClassName('forecast_date')[i].innerHTML=Get_date_time(Data[i].dt,timeoffset).toDateString();

        document.getElementsByClassName('forecast_icon')[i].innerHTML=`<img src="${geticon(Data[i].weather[0].icon)}" style="width:45px;height:45px">`;

        document.getElementsByClassName('forecast_status')[i].innerHTML=`${convert(Data[i].temp.max)}/${convert(Data[i].temp.min)}`;

        document.getElementsByClassName('futurestatus')[i].innerHTML=Data[i].weather[0].description;
        // `${Get_date_time(Data[i].dt,timeoffset).toDateString()}`;
    }
}
const url="https://api.openweathermap.org/data/2.5/onecall?lat=19.0144&lon=72.8479&appid=b116413767d2d2024cd0e18fac37c1eb";

// entry point 
function getdata() {
    let loct,latitude,longitude,low,high;
    $('#hourlydata').html('');
    $('#forcastdata').html('');
    const location = $('#place').val();
    const baseURL="https://api.openweathermap.org/data/2.5/onecall?"
    // const key = "b116413767d2d2024cd0e18fac37c1eb";
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}
    &appid=${cred.KEY}`)
    .then(response=>response.json())
    .then((data)=>{
        console.log(data);
        // boring data
        latitude=data.coord.lat;
        longitude=data.coord.lon;
        $('#low span').text(convert(data.main.temp_min));
        $('#high span').text(convert(data.main.temp_max));
        loct=data.name;
        console.log(latitude);
        console.log(longitude);
        $('#loader').toggleClass('spinner');
        $('#data-displayer').addClass('show');
        const query=baseURL+"lat="+latitude+"&lon="+longitude+"&appid="+cred.KEY;
        fetch(query)
        .then(response=>response.json())
        .then((data)=>{
            console.log(data);
            addcurrentdata(data);
            $('#location').text(loct)
            addHourlyHtml(data);
            addforcastHtml(data);
            })
            showdata();
    })
    $('#loader').toggleClass('spinner');
}

