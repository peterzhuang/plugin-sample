async function myFunctionAsync() {
        // invalid
        if (something > 3) console.log("something is greater than 3");
  
        if (thing) {
            console.log('here');
        } else console.log('there');
        
        // valid
        if (something < 3) {
            console.log('something is less than 3');
        } 

        console.warn();
        console.info();
        console.bazzz();
}