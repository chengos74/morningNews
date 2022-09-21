export default function country(country = '', action) {

  if(action.type === 'changeToEnglish') { // ça c'est l'action qui vient du dispatch
    
      let newCountry = action.countryChange // on réecrit la valeur de country
      return newCountry // on écrase la valeur (state) de country avec newCountry

  } else if(action.type === 'changeToFrench'){
      
    let newCountry = action.countryChange
      return newCountry

  } else {
    return country
  }
}
