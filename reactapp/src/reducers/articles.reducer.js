export default function wishList(wishList = [], action) {

  if(action.type === 'addArticle') {
    
      let wishListCopy = [ ...wishList ]

      // Condition pour eviter les doublons :
      let findArticle = false 
      for(var i=0; i<wishListCopy.length; i++) {
        if(wishListCopy[i].title === action.articleLiked.title) {
          findArticle = true
        }
      }
      
      if(!findArticle) {
        wishListCopy.push(action.articleLiked) 
      }

      return wishListCopy;

  } else if(action.type === 'deleteArticle') {

      let wishListCopy = [ ...wishList ]

      wishListCopy = wishListCopy.filter(element => element.title !== action.title)

      // Chercher la position & delete avec une boucle for :
      // var position = null;
      // for(var i=0; i<wishListCopy.length; i++) {
      //   if(wishListCopy[i].title === action.title) {
      //     position = i
      //   }
      // }
      // if(position != null) {
      //   wishListCopy.splice(position, 1) 
      // }

      return wishListCopy

  } else if(action.type === 'importArticles') {

      return action.articles

  } else {
    
      return wishList;
  }
}
