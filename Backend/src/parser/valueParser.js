module.exports = function(){
    return new Promise((resolve,reject)=>{
        let parser = require('./parser');
        parser()
        .then(result=>{
            resolve("END ADD");
        })
        .catch(err=>{
            reject(err);
        });
    })
    
}
