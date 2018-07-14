export const generateNewId = (arr) => {
  const idsArr = arr.map( item => item.id );
  const sortedArr = idsArr.sort((a,b) => a-b)
  if ( sortedArr[0] !== 0 ) {
      return 0;
  }
  else {
      for (let i = 0; i < sortedArr.length; i++) {
          if (sortedArr[i+1] - sortedArr[i] > 1) {
              return sortedArr[i]+1;
          }
      }
      return sortedArr[sortedArr.length-1]+1;
  }
}
