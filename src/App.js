import React from 'react';
import Prismic from '@prismicio/client'
import { Date, Link, RichText } from 'prismic-reactjs'
import './App.css';

function App() {
  const [home, setHomePage] = React.useState(null);
  const [automobiles, seAutomobiles] = React.useState([]);
  
  React.useEffect(() => {
    const apiEndpoint = 'https://the-demo-repository.cdn.prismic.io/api/v2'
    const Client = Prismic.client(apiEndpoint)
    const fetchData = async () => {
      const response = await Client.query(
        Prismic.Predicates.at('document.type', 'home_page')
      )
      if (response) {
        console.log(response)
        setHomePage(response.results[0])
      }
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
      {
        home ? (
          <div>
            <h1>{RichText.asText(home.data.home_page)}</h1>
            <RichText render={home.data.description} />
            <img alt='cover' src={home.data.picture.url} class="coverIMG" />
          </div>
        ) : <div>No content</div>
      }
    </React.Fragment>
  )
}

export default App;
