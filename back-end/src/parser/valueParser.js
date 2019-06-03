module.exports = function(groupName){
    let parser = require('./parser');
    let container = parser(groupName);
    
    return(container);
}
