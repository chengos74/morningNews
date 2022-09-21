export default function token(token = ' ', action) {

  if(action.type === 'addToken') {
    
      return action.myToken

  } else {
    
      return token;
  }
}
