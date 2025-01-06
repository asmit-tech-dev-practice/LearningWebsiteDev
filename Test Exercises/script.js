let myPromise = new Promise((resolve, reject) => {
    let success = true;
  
    setTimeout(() => {
      if (success) {
        resolve("The operation was successful!");
      } else {
        reject("The operation failed.");
      }
    }, 2000); 
  });
  
  myPromise
    .then(result => {
      console.log(result); 
    })
    .catch(error => {
      console.error(error);
    });
  