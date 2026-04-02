const promise1=new Promise(function(resolve,reject){
    //do and async tasks
    //db calls, networking calls
    setTimeout(() => {
        console.log("Async task is complete");
        reject("Something went wrong ❌");
    }, 2000);
});
promise1.then(function(){
    console.log("Promise accepted");
}).catch(reason=>(
    console.log(reason)
))