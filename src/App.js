import React from 'react';
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import './App.css';

function App() {
  const [home, setHomePage] = React.useState(null);
  const [automobiles, seAutomobiles] = React.useState("");
  
  React.useEffect(() => {
    const apiEndpoint = 'https://the-demo-repository.cdn.prismic.io/api/v2'
    const Client = Prismic.client(apiEndpoint)
    const fetchData = async () => {
      const response = await Client.query(
        Prismic.Predicates.any('document.type', ['home_page', 'automobile'])
      )
      if (response) {
        const homdData = response.results.filter(object => object.type === "home_page")[0]
        setHomePage(homdData)
        
        const carList = response.results.filter(object => object.type === "automobile")
        console.log(carList)
        const carListItems = carList.map((car) => {
          return (
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div className="card automobileCard">
                <img className="card-img-top carIMG" src={car.data.picture.url} alt="Car"></img>
                <div className="card-body">
                  <h1>{RichText.asText(car.data.title)}</h1>
                  <RichText render={car.data.body} />
                </div>
              </div>
            </div>
          )
        })
        seAutomobiles(carListItems)

      }
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <p>GitHub Link: <a target="_blank" rel='noreferrer' href="https://github.com/vmcgargill/prismic-demo-app">https://github.com/vmcgargill/prismic-demo-app</a></p><br/>
      {
        home ? (
          <div>
            <h1>{RichText.asText(home.data.home_page)}</h1>
            <RichText render={home.data.description} />
          </div>
        ) : <div>No content</div>
      }
      <div className="container">
        <div className="row">
          {automobiles}
        </div>
      </div>
    </React.Fragment>
  )
}

export default App;
