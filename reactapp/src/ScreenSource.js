import React, { useState, useEffect } from 'react';
import './App.css';
import { List, Avatar } from 'antd';
import Nav from './Nav'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


function ScreenSource(props) { 

  const [sourceList, setSourceList] = useState([])
  
  //// Load main articles from API ////
  useEffect(() => {

    async function loadAPISources() {

      const request = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=783cf7d53ed046e5a2135bfcc21408d6&country='+ props.selectCountry) 
                                           
      const articles = await request.json()
     
      setSourceList(articles.sources)
      // console.log(articles.sources)
    }
    loadAPISources()
    
  }, [props.selectCountry])

  return (
    <div>
      <Nav />
      <div className="Banner" style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Avatar src={"./images/gb.png"} alt="british flag" 
                  style={{marginRight: 10}}
                  onClick={() => props.changeToEnglish()}/>

          <Avatar src={"./images/fr_rounded.png"} alt="french flag" 
                  onClick={() => props.changeToFrench()}/>                              
      </div>

      <div className="HomeThemes">
       
        <List itemLayout="horizontal" 
              dataSource={sourceList}
              renderItem={source => (
                <List.Item>
                  <List.Item.Meta
                    avatar={ <Avatar src={"/images/"+source.category+".png"}/> }
                    title={ <Link to={"/screenarticlesbysource/"+source.id}>{source.name}</Link> }
                    description={source.description}
                  />
                </List.Item>
              )}
        />

      </div>
    </div>
  );
}


function mapStateToProps(state) { 
  return { selectCountry : state.country, myToken : state.token }
}

function mapDispatchToProps(dispatch) { 
  return {
    changeToEnglish: function() { // changeToEnglish = props = propriété = key
      dispatch({ type : 'changeToEnglish', countryChange : 'gb' }) // dispatch = action = value
    },
    changeToFrench: function() {
      dispatch({ type : 'changeToFrench', countryChange : 'fr' })
    }
  }
}


export default connect( // pour connecter les fonctions redux et le composant ScreenSource
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)

