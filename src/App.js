import React,{ useState,useEffect, useCallback } from "react";
import { getMap, saveMap } from"./localStorage";
import './App.css';

function App() {


  let [ImageUrl, setImageUrl] = useState("");
  let [ImageTitle, setImageTitle] = useState("");

  let [ThisImageDetails, setThisImageDetails] = useState({});
  let [NextImageDetails, setNextImageDetails] = useState({});
  let [PrevImageDetails, setPrevImageDetails] = useState({});
  let [Animate, setAnimate] = useState(false);

  useEffect(AddToTable,[ThisImageDetails]);
  useEffect(DisplayImage,[]);


const foo = (getMap()==null? new Map() : new Map(JSON.parse(getMap())));
let [Dict, setDict] = useState(foo);


return (

  <div className="App">
    <header className="App-header">
    <h1 className="headerC">{ImageTitle}</h1>
    <div className='ButtonDiv' >
    <button color="inherit" className='balbutton' onClick={getPrev}> Previous  </button>
    <button color="inherit" className='balbutton' onClick={getNext}> Next  </button>  
    </div>
    <div>
    {(Animate===false) ? (null) : (
      <div class="loader"></div>
    )}
    <img
      style={(Animate===false) ? (null) : { display: 'none' }}
      src={ImageUrl}
      className='Mimg'
      onLoad={() => setAnimate(false)}
    />
  </div>
    {DisplayTable()}
    </header>
  </div>
  
);


function DisplayTable()
{
return (
  <div className="table-wrapper">

<table className="fl-table">
    <thead>
    <tr>
        <th>Title</th>
        <th>Time Seen</th>
        <th>View</th>
    </tr>
    </thead>
    <tbody>     
    {Array.from( Dict ).map(([key, value]) =>{ return showtable(key,value)})}          
    </tbody>
    </table>
</div>
)
}

function showtable(key, value)
{
  return (
        
      <tr>  
    <td><h4> {key} </h4></td>
    <td><h4> {value[0]} </h4></td>

    <td> <button className="tbutton"  onClick={() => ViewImage(value[1],key)}>View</button> </td>
    </tr>
    )

}


function ViewImage(url,title)
{
  setImageUrl(url);
  setImageTitle(title);
}

function AddToTable()
{
  
  var title= "";
  var url="";
  setImageTitle(ThisImageDetails.title);

  if (ThisImageDetails.title!=undefined){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;  
    title=ThisImageDetails.title;
    url=ThisImageDetails.img;
    setDict(Dict.set(title,[dateTime,url]));
    saveMap(Dict);
}
}

 function FetchFirstImage(index) {
  
  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');   
  headers.append('Access-Control-Allow-Credentials', 'true');
  fetch("https://xkcd.vercel.app/?comic="+index.toString(),{
  method: 'get',
  dataType: 'json',
  headers: headers,
})
  .then(response => response.json())
  .then(response => {
    var index=response.num;
      setImageUrl(response.img);
      setThisImageDetails(response);
       FetchNextImage(index+1);
       FetchPrevImage(index-1);
})
.catch((error) => {
  console.log('error: ' + error);
});
}


    
 function FetchNextImage(index) {
  
  if (index>2605)
   {
     index-=2605;
   }
  let headers = new Headers();

  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');   
  headers.append('Access-Control-Allow-Credentials', 'true');
  fetch("https://xkcd.vercel.app/?comic="+index.toString(),{
  method: 'get',
  dataType: 'json',
  headers: headers,
})
  .then(response => response.json())
  .then(response => {
      setNextImageDetails(response);      
})
.catch((error) => {
  console.log('error: ' + error);
});
}


function FetchPrevImage(index) {

  if (index<=0)
   {
     index+=2605;
   }
  let headers = new Headers();

  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');   
  headers.append('Access-Control-Allow-Credentials', 'true');
  fetch("https://xkcd.vercel.app/?comic="+index.toString(),{
  method: 'get',
  dataType: 'json',
  headers: headers,
})
  .then(response => response.json())
  .then(response => {
      setPrevImageDetails(response);
       
})
.catch((error) => {
  console.log('error: ' + error);
});
}



  function DisplayImage() {
    var rand=getRandomInt(2605);
    FetchFirstImage(rand);
  }

  /**
   * 
   * @param {*} max 
   * @returns a number between 1 and max, max being the number of pics they have in their repository being 2605, tested with postman
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * max + 1);
  }
  


  function getNext()
  {

    setAnimate(true);
    var a =new Map(JSON.parse(getMap()));
    setImageUrl(NextImageDetails.img);
    setPrevImageDetails(ThisImageDetails);
    setThisImageDetails(NextImageDetails);
    FetchNextImage(NextImageDetails.num+1);
  }

  function getPrev()
  {
    setAnimate(true);
    setImageUrl(PrevImageDetails.img);
    setNextImageDetails(ThisImageDetails);
    setThisImageDetails(PrevImageDetails);
    FetchPrevImage(PrevImageDetails.num-1);
  }


  }

export default App;
