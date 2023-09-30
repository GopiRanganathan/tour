import React from 'react';
import './App.css';

const url = 'https://course-api.com/react-tours-project';

const Loading =  () =>{
  return <div className="loading">
    <h1>loading...</h1>
  </div>
}

const Tours = ({tours,removeTour}) =>{
  return <div className="tours">
    <div className="title">
      <h2>Our Tours</h2>
       <div className="underline"></div>
    </div>
    <div>
      {tours.map((tour) =>{

        return <Tour key={tour.id} {...tour} removeTour={removeTour}></Tour>
      })}
    </div>
  </div>;
}
const Tour = ({id,image,info,price,name, removeTour}) =>{
  const [readMore,setReadMore] = React.useState(false);

  return <article className="single-tour">
    <img src={image} alt={name} />
    <footer>
      <div className="tour-info">
        <h4>{name}</h4>
        <h4 className="tour-price">${price}</h4>
      </div>
      <p>{readMore? info: `${info.substring(0,200) + "... "}`}
        <button onClick = {()=> setReadMore(!readMore)}>
          {readMore? 'show less':'read more'}
        </button>
      </p>
      <button className="delete-btn" onClick={()=> removeTour(id)}>Not Interested</button>
    </footer>
  </article>

}

function App() {

  const [loading,setLoading] = React.useState(true);
  const [tours,setTours] = React.useState([]);



  const fetchTours = async () =>{

  setLoading(true);
  try{
    const response = await fetch(url);
    const tours = await response.json();
    setLoading(false);
    setTours(tours);
  }
  catch (error) {
    setLoading(false);
    console.log(error);
  }


  }

  React.useEffect(()=>{
  fetchTours();
  },[]);

  const removeTour = (id) => {
    const newtours = tours.filter((tour) => tour.id !== id);
    setTours(newtours);

  }

  

  if(loading){
    return <div className="App">
      <Loading />
    </div>
  }
  if(tours.length === 0){
    return <div className="App">
      <h2 className="title">No Tour Left </h2>
      <button className="btn" onClick={()=> fetchTours()}>Refresh</button>
    </div>
  }

  return (
    <div className="App">
     <Tours tours={tours} removeTour={removeTour} />
    </div>
  );
}

export default App;
