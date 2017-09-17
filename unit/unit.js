function change(stars){
  var a=stars.substring(0,1)
  var b=[];

  for(var i=0;i<5;i++){
    if(i<a){
      b.push(1)
    }
    else{
      b.push(0)
    }
  }
  return b;
}
function a(casts) {
  var c=[]
  for (var i in casts) {

    c[i] = casts[i].name

  }
  var d = c.join('/')
  return d;


}
function b(casts){
  var c=[];
  for(var i in casts){
    c[i] = {
      images:casts[i].avatars.large, 
      name:casts[i].name
      }
     
   
  }

  return c;
  

}


module.exports = {
  change: change,
  a:a,
  b:b,
}